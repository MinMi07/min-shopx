import { UserContext } from '~/contexts/UserContext';
import { AuthContext } from '~/contexts/AuthContext';
import { useContext, useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from '~/components/TableAdmin/TableAdmin.module.scss';
import classNames from 'classnames/bind';

import Button from '~/components/Button';
import Admin from '../views/Admin';
import Alert from '~/components/Alert';
import GlobalStyles from '~/components/GlobalStyles/GlobalStyles.module.scss';

const cx = classNames.bind(styles);
const gls = classNames.bind(GlobalStyles);

function Account() {
  let body = null;
  // Contexts
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  const {
    userState: { user, users, usersLoading },
    getUsers,
    deleteUser,
    updateUser,
  } = useContext(UserContext);

  const [updateUserModal, setUpdateUserModal] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);

  // FORM UPDATE
  // BEGIN
  const [alert, setAlert] = useState(null);
  const [UpdateUser, setUpdateUser] = useState({
    _id: '',
    username: '',
    password: '',
    confirmPassword: '',
    level: '',
    fullName: '',
    phoneNumber: '',
    addressShip: '',
    address: '',
  });

  // handleEdit
  const handleEdit = (user) => {
    setUpdateUser({
      _id: user._id,
      username: user.username,
      password: '',
      confirmPassword: '',
      level: user.level,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      addressShip: user.addressShip,
      address: user.address,
    });
    setUpdateUserModal(true);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (UpdateUser.password !== UpdateUser.confirmPassword) {
      setAlert({ type: 'error', message: 'Confirm password isnot correct' });
      setTimeout(() => {
        setAlert(null);
      }, 4000);
      return;
    } else {
      const { success, message } = await updateUser(UpdateUser);
      setAlert({
        type: success === true ? 'success' : 'error',
        message: message,
      });
      if (success) setUpdateUserModal(false);

      setTimeout(() => {
        setAlert(null);
      }, 4000);
    }
  };

  const onChangeNewUserForm = (event, type) => {
    if (type == 'image') setUpdateUser({ ...UpdateUser, [event.target.name]: event.target.files[0] });
    else setUpdateUser({ ...UpdateUser, [event.target.name]: event.target.value });
  };
  // END

  // delete User
  const [deleteUserID, setDeleteUserID] = useState({
    _id: '',
    username: '',
  });

  const handleDelete = (user) => {
    setDeleteUserID({ _id: user._id, username: user.username });
    setDeleteConfirmModal(true);
  };

  const onDelete = async (e) => {
    e.preventDefault();
    const { success, message } = deleteUser(deleteUserID._id);
    setDeleteConfirmModal(false);

    setTimeout(() => {
      setAlert(false);
    }, 4000);
    setAlert({
      type: 'success' || success,
      message: 'X??a th??nh c??ng' || message,
    });
  };

  // Start: Get all posts
  useEffect(() => {
    getUsers();
  }, [alert]);

  if (usersLoading) {
    body = (
      <div>
        <FontAwesomeIcon className={gls('spinner--Load')} icon={faSpinner} />
      </div>
    );
  } else if (users.length === 0) {
    body = <h2>DANH S??CH TR???NG</h2>;
  } else {
    body = (
      <>
        {deleteConfirmModal && (
          <div className={cx('update_card')}>
            <form id="form_update" className={cx('wrapperFormUpdate')} onSubmit={onDelete}>
              <h2> X??c nh???n x??a t??i kho???n: {deleteUserID.username} </h2>
              <div className={cx('btnLayout')}>
                <Button>X??C NH???N</Button>
                <Button
                  error
                  onClick={() => {
                    setDeleteConfirmModal(false);
                  }}
                >
                  H???Y
                </Button>
              </div>
            </form>
          </div>
        )}

        {updateUserModal && (
          <div className={cx('update_card')}>
            <form className={cx('wrapperFormUpdate')} onSubmit={onSubmit}>
              <label htmlFor="form_login_email">
                <p>T??i kho???n</p>
                <input
                  className={cx('input')}
                  type="text"
                  id="form_login_email"
                  placeholder="Type account"
                  name="username"
                  value={UpdateUser.username}
                  onChange={(e) => {
                    onChangeNewUserForm(e);
                  }}
                />
              </label>
              <label htmlFor="nameProduct">
                <p>M???t kh???u</p>
                <input
                  className={cx('input')}
                  type="password"
                  id="form_login_password"
                  name="password"
                  placeholder="Type password"
                  value={UpdateUser.password}
                  onChange={(e) => {
                    onChangeNewUserForm(e);
                  }}
                />
              </label>
              <label htmlFor="form_login_confirmPassword">
                <p>X??c nh???n m???t kh???u</p>
                <input
                  className={cx('input')}
                  type="password"
                  id="form_login_confirmPassword"
                  name="confirmPassword"
                  placeholder="Type confirm password"
                  value={UpdateUser.confirmPassword}
                  onChange={(e) => {
                    onChangeNewUserForm(e);
                  }}
                />
              </label>

              <label htmlFor="level">
                <p>C???p b???c</p>
                <input
                  className={cx('input')}
                  type="text"
                  id="level"
                  placeholder="Type level"
                  name="level"
                  value={UpdateUser.level}
                  onChange={(e) => {
                    onChangeNewUserForm(e);
                  }}
                />
              </label>
              <label htmlFor="fullName">
                <p>H??? v?? t??n</p>
                <input
                  className={cx('input')}
                  type="text"
                  id="fullName"
                  placeholder="Type fullName"
                  name="fullName"
                  value={UpdateUser.fullName}
                  onChange={(e) => {
                    onChangeNewUserForm(e);
                  }}
                />
              </label>
              <label htmlFor="phoneNumber">
                <p>S??? ??i???n tho???i</p>
                <input
                  className={cx('input')}
                  type="tel"
                  id="phoneNumber"
                  placeholder="Type phonenumber"
                  name="phoneNumber"
                  value={UpdateUser.phoneNumber}
                  onChange={(e) => {
                    onChangeNewUserForm(e);
                  }}
                />
              </label>

              <label htmlFor="address">
                <p>?????a ch???</p>
                <textarea
                  className={cx('input', 'addressShip')}
                  id="address"
                  placeholder="Type address"
                  name="address"
                  value={UpdateUser.address}
                  onChange={(e) => {
                    onChangeNewUserForm(e);
                  }}
                ></textarea>
              </label>
              <div className={cx('btnSubmit')}>
                <button type="submit">C???P NH???T</button>
                <Button
                  onClick={() => {
                    setUpdateUserModal(false);
                  }}
                  error
                >
                  H???Y
                </Button>
              </div>
            </form>
          </div>
        )}

        {alert != null && <Alert info={alert} />}
        <div className={cx('wrapper')}>
          <h2 className={cx('content')}>Danh m???c h??a ????n</h2>
          <table className={cx('table')}>
            <thead>
              <tr>
                <td>STT</td>
                <td>T??i kho???n</td>
                <td>M???t kh???u</td>
                <td>C???p b???c</td>
                <td>H??? v?? t??n</td>
                <td>S??? ??i???n tho???i</td>
                <td>?????a ch???</td>
                <td>Ng??y t???o</td>
                <td></td>
              </tr>
            </thead>
            {users.map((user, index) => {
              var date = new Date(user.createdAt);

              // Get year, month, and day part from the date
              var year = date.toLocaleString('default', { year: 'numeric' });
              var month = date.toLocaleString('default', { month: '2-digit' });
              var day = date.toLocaleString('default', { day: '2-digit' });

              // Generate yyyy-mm-dd date string
              var formattedDate = day + '-' + month + '-' + year;
              return (
                <tbody key={user._id}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.password.slice(90) + '...'}</td>
                    <td>{user.level}</td>
                    <td>{user.fullName}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.address}</td>
                    <td>{formattedDate}</td>
                    <td>
                      <Button
                        primary
                        whiteText
                        onClick={() => {
                          handleEdit(user);
                        }}
                      >
                        S???a
                      </Button>
                      <Button
                        error
                        whiteText
                        onClick={() => {
                          handleDelete(user);
                        }}
                      >
                        X??a
                      </Button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </>
    );
  }

  return (
    <>
      <Admin>{body}</Admin>
    </>
  );
}

export default Account;
