import { BillContext } from '~/contexts/BillContext';
import { CategoryContext } from '~/contexts/CategoryContext';
import { AuthContext } from '~/contexts/AuthContext';
import { useContext, useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from '~/components/TableAdmin/TableAdmin.module.scss';
import FormInputAdmin from '~/components/FormInputAdmin/FormInputAdmin.module.scss';
import classNames from 'classnames/bind';

import Button from '~/components/Button';
import Admin from '../views/Admin';
import Alert from '~/components/Alert';
import GlobalStyles from '~/components/GlobalStyles/GlobalStyles.module.scss';

const cx = classNames.bind(styles);
const gls = classNames.bind(GlobalStyles);
const forminput = classNames.bind(FormInputAdmin);

function Bill() {
  let body = null;
  // Contexts
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  const {
    billState: { bill, bills, billsLoading },
    getBills,
    deleteBill,
    updateBill,
  } = useContext(BillContext);

  const {
    categoryState: { category, categorys, categorysLoading },
    getCategorys,
  } = useContext(CategoryContext);

  const [updateBillModal, setUpdateBillModal] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);

  // FORM UPDATE
  // BEGIN
  const [alert, setAlert] = useState(null);
  const [UpdateBill, setUpdateBill] = useState({
    _id: '',
    id: '',
    phoneUser: '',
    nameProduct: '',
    amount: '',
    priceBuy: '',
    totalPrice: '',
    addressShip: '',
    stateBill: '',
  });

  // handleEdit
  const handleEdit = (bill) => {
    setUpdateBill({
      _id: bill._id,
      id: bill.id,
      phoneUser: bill.phoneUser,
      nameProduct: bill.nameProduct,
      amount: bill.amount,
      priceBuy: bill.priceBuy,
      totalPrice: bill.totalPrice,
      addressShip: bill.addressShip,
      stateBill: bill.stateBill,
    });
    setUpdateBillModal(true);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updateBill(UpdateBill);
    setAlert({
      type: success === true ? 'success' : 'error',
      message: message,
    });
    if (success) setUpdateBillModal(false);

    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };

  const onChangeNewBillForm = (event, type) => {
    if (type == 'image') setUpdateBill({ ...UpdateBill, [event.target.name]: event.target.files[0] });
    else setUpdateBill({ ...UpdateBill, [event.target.name]: event.target.value });
  };
  // END

  // delete Bill
  const [deleteBillID, setDeleteBillID] = useState({
    _id: '',
    id: '',
    phoneUser: '',
  });

  const handleDelete = (bill) => {
    setDeleteBillID({ _id: bill._id, id: bill.id, title: bill.title });
    setDeleteConfirmModal(true);
  };

  const onDelete = async (e) => {
    e.preventDefault();
    const { success, message } = deleteBill(deleteBillID._id);
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
    getBills();
    getCategorys();
  }, [alert]);

  if (billsLoading) {
    body = (
      <div>
        <FontAwesomeIcon className={gls('spinner--Load')} icon={faSpinner} />
      </div>
    );
  } else if (bills.length === 0) {
    body = <h2>DANH S??CH TR???NG</h2>;
  } else {
    body = (
      <>
        {deleteConfirmModal && (
          <div className={cx('update_card')}>
            <form id="form_update" className={cx('wrapperFormUpdate')} onSubmit={onDelete}>
              <h2> X??c nh???n x??a m?? s???n ph???m: {deleteBillID.id} </h2>
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

        {updateBillModal && (
          <div className={cx('update_card')}>
            <form className={cx('wrapperFormUpdate')} onSubmit={onSubmit}>
              <label htmlFor="title">
                <p>M?? h??a ????n</p>
                <input
                  className={cx('input')}
                  type="text"
                  id="id"
                  placeholder="Type bill id"
                  name="id"
                  value={UpdateBill.id}
                  onChange={(e) => {
                    onChangeNewBillForm(e);
                  }}
                />
              </label>
              <label htmlFor="phoneUser">
                <p>S??? ??i???n tho???i</p>
                <input
                  className={cx('input')}
                  type="tel"
                  id="phoneUser"
                  placeholder="Type phonenumber"
                  name="phoneUser"
                  value={UpdateBill.phoneUser}
                  onChange={(e) => {
                    onChangeNewBillForm(e);
                  }}
                />
              </label>
              <label htmlFor="nameProduct">
                <p>T??n s???n ph???m</p>
                <input
                  className={cx('input')}
                  type="text"
                  id="nameProduct"
                  placeholder="Type name product"
                  name="nameProduct"
                  value={UpdateBill.nameProduct}
                  onChange={(e) => {
                    onChangeNewBillForm(e);
                  }}
                />
              </label>
              <label htmlFor="amount">
                <p>S??? l?????ng</p>
                <input
                  className={cx('input')}
                  type="number"
                  id="amount"
                  placeholder="Type amount"
                  name="amount"
                  value={UpdateBill.amount}
                  onChange={(e) => {
                    onChangeNewBillForm(e);
                  }}
                />
              </label>
              <label htmlFor="priceBuy">
                <p>Gi?? mua</p>
                <input
                  className={cx('input')}
                  type="number"
                  id="priceBuy"
                  placeholder="Type priceBuy"
                  name="priceBuy"
                  value={UpdateBill.priceBuy}
                  onChange={(e) => {
                    onChangeNewBillForm(e);
                  }}
                />
              </label>
              <label htmlFor="totalPrice">
                <p>T???ng thanh to??n</p>
                <input
                  disabled
                  className={cx('input')}
                  type="number"
                  id="totalPrice"
                  placeholder="Type totalPrice"
                  name="totalPrice"
                  value={UpdateBill.priceBuy * UpdateBill.amount}
                  onChange={(e) => {
                    onChangeNewBillForm(e);
                  }}
                />
              </label>
              <label htmlFor="addressShip">
                <p>?????a ch??? giao h??ng</p>
                <textarea
                  className={cx('input', 'addressShip')}
                  id="addressShip"
                  placeholder="Type address"
                  name="addressShip"
                  value={UpdateBill.addressShip}
                  onChange={(e) => {
                    onChangeNewBillForm(e);
                  }}
                ></textarea>
              </label>
              <label htmlFor="stateBill">
                <p>Tr???ng th??i</p>
                <select
                  className={forminput('selection')}
                  name="stateBill"
                  id="stateBill"
                  value={UpdateBill.stateBill}
                  onChange={(e) => {
                    onChangeNewBillForm(e);
                  }}
                >
                  <option value={'CART'}>CART</option>
                  <option value={'BOUGHT'}>BOUGHT</option>
                </select>
              </label>
              <div className={cx('btnSubmit')}>
                <button type="submit">C???P NH???T</button>
                <Button
                  onClick={() => {
                    setUpdateBillModal(false);
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
                <td>M?? h??a ????n</td>
                <td>S??? ??i???n tho???i</td>
                <td>T??n s???n ph???m</td>
                <td>S??? l?????ng</td>
                <td>Gi?? mua</td>
                <td>T???ng gi??</td>
                <td>?????a ch???</td>
                <td>T??nh tr???ng</td>
                <td>Ng??y t???o</td>
                <td>M?? ng?????i ?????t</td>
                <td></td>
              </tr>
            </thead>
            {bills.map((bill, index) => {
              var date = new Date(bill.createdAt);

              // Get year, month, and day part from the date
              var year = date.toLocaleString('default', { year: 'numeric' });
              var month = date.toLocaleString('default', { month: '2-digit' });
              var day = date.toLocaleString('default', { day: '2-digit' });

              // Generate yyyy-mm-dd date string
              var formattedDate = day + '-' + month + '-' + year;

              if (bill.stateBill == 'CART')
                return (
                  <tbody key={bill._id}>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{bill.id}</td>
                      <td>{bill.phoneUser}</td>
                      <td>{bill.nameProduct}</td>
                      <td>{bill.amount}</td>
                      <td>{bill.priceBuy}</td>
                      <td>{bill.totalPrice}</td>
                      <td>{bill.addressShip}</td>
                      <td className={cx('cart')}>{bill.stateBill}</td>
                      <td>{formattedDate}</td>
                      <td>{bill.user}</td>
                      <td>
                        <Button
                          primary
                          onClick={() => {
                            handleEdit(bill);
                          }}
                        >
                          S???a
                        </Button>
                        <Button
                          error
                          onClick={() => {
                            handleDelete(bill);
                          }}
                        >
                          X??a
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                );
              else {
                return (
                  <tbody key={bill._id}>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{bill.id}</td>
                      <td>{bill.phoneUser}</td>
                      <td>{bill.nameProduct}</td>
                      <td>{bill.amount}</td>
                      <td>{bill.priceBuy}</td>
                      <td>{bill.totalPrice}</td>
                      <td>{bill.addressShip}</td>
                      <td className={cx('bought')}>{bill.stateBill}</td>
                      <td>{formattedDate}</td>
                      <td>{bill.user}</td>
                      <td>
                        <Button
                          primary
                          whiteText
                          onClick={() => {
                            handleEdit(bill);
                          }}
                        >
                          S???a
                        </Button>
                        <Button
                          error
                          whiteText
                          onClick={() => {
                            handleDelete(bill);
                          }}
                        >
                          X??a
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                );
              }
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

export default Bill;
