import { UserContext } from '~/contexts/UserContext';
import { useContext, useState } from 'react';
import Alert from '~/components/Alert';
import Admin from '../views/Admin';
import classNames from 'classnames/bind';
import styles from '~/components/FormInputAdmin/FormInputAdmin.module.scss';

const cx = classNames.bind(styles);
function AddAccount() {
  // Contexts
  const { addUser } = useContext(UserContext);

  // State
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    level: '',
    fullName: '',
    phoneNumber: '',
    addressShip: '',
    address: '',
  });

  const [alert, setAlert] = useState(null);
  const { username, password, confirmPassword, level, fullName, phoneNumber, address } = newUser;

  const onChangeNewUserForm = (event) => setNewUser({ ...newUser, [event.target.name]: event.target.value });

  const resetAddUserData = () => {
    setNewUser({
      username: '',
      password: '',
      confirmPassword: '',
      level: '',
      fullName: '',
      phoneNumber: '',
      addressShip: '',
      address: '',
    });
    setAlert(null);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setAlert({ type: 'error', message: 'Confirm password isnot correct' });
      setTimeout(() => {
        setAlert(null);
      }, 4000);
      return;
    }

    try {
      const { success, message } = await addUser(newUser);

      setAlert({ type: success === true ? 'success' : 'error', message: message });

      setTimeout(() => {
        setAlert(null);
        resetAddUserData();
      }, 4000);
    } catch (error) {
      console.log(error);
    }
  };

  const body = (
    <>
      {alert != null && <Alert info={alert} />}
      <form className={cx('wrapper')} onSubmit={onSubmit}>
        <label htmlFor="form_login_email">
          <p>Tài khoản</p>
          <input
            className={cx('input')}
            type="text"
            id="form_login_email"
            placeholder="Type account"
            name="username"
            value={username}
            onChange={(e) => {
              onChangeNewUserForm(e);
            }}
          />
        </label>
        <label htmlFor="nameProduct">
          <p>Mật khẩu</p>
          <input
            className={cx('input')}
            type="password"
            id="form_login_password"
            name="password"
            placeholder="Type password"
            value={password}
            onChange={(e) => {
              onChangeNewUserForm(e);
            }}
          />
        </label>
        <label htmlFor="form_login_confirmPassword">
          <p>Xác nhận mật khẩu</p>
          <input
            className={cx('input')}
            type="password"
            id="form_login_confirmPassword"
            name="confirmPassword"
            placeholder="Type confirm password"
            value={confirmPassword}
            onChange={(e) => {
              onChangeNewUserForm(e);
            }}
          />
        </label>

        <label htmlFor="level">
          <input
            className={cx('input')}
            type="text"
            id="level"
            placeholder="Type level"
            name="level"
            value={level}
            onChange={(e) => {
              onChangeNewUserForm(e);
            }}
          />
        </label>
        <label htmlFor="fullName">
          <input
            className={cx('input')}
            type="text"
            id="fullName"
            placeholder="Type fullName"
            name="fullName"
            value={fullName}
            onChange={(e) => {
              onChangeNewUserForm(e);
            }}
          />
        </label>
        <label htmlFor="phoneNumber">
          <p>Số điện thoại</p>
          <input
            className={cx('input')}
            type="tel"
            id="phoneNumber"
            placeholder="Type phonenumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => {
              onChangeNewUserForm(e);
            }}
          />
        </label>

        <label htmlFor="address">
          <p>Địa chỉ</p>
          <textarea
            className={cx('input', 'addressShip')}
            id="address"
            placeholder="Type address"
            name="address"
            value={address}
            onChange={(e) => {
              onChangeNewUserForm(e);
            }}
          ></textarea>
        </label>

        <div className={cx('btnSubmit')}>
          <button type="submit">THÊM</button>
        </div>
      </form>
    </>
  );

  return (
    <>
      <Admin>{body}</Admin>
    </>
  );
}

export default AddAccount;
