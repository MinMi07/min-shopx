import { apiUrl } from '~/contexts/constaints';

import { BillContext } from '~/contexts/BillContext';
import { CategoryContext } from '~/contexts/CategoryContext';
import { useContext, useState, useEffect } from 'react';
import Alert from '~/components/Alert';
import Admin from '../views/Admin';
import classNames from 'classnames/bind';
import styles from '~/components/FormInputAdmin/FormInputAdmin.module.scss';

const cx = classNames.bind(styles);
function AddBill() {
  // Contexts
  const { addBill } = useContext(BillContext);

  const {
    categoryState: { category, categorys, categorysLoading },
    getCategorys,
  } = useContext(CategoryContext);

  // State
  const [newBill, setNewBill] = useState({
    id: '',
    phoneUser: '',
    nameProduct: '',
    amount: '',
    priceBuy: '',
    totalPrice: '',
    addressShip: '',
    stateBill: 'CART',
  });

  const [alert, setAlert] = useState(null);
  const { id, phoneUser, nameProduct, amount, priceBuy, totalPrice, addressShip, stateBill } = newBill;

  const onChangeNewBillForm = (event) => setNewBill({ ...newBill, [event.target.name]: event.target.value });

  const resetAddBillData = () => {
    setNewBill({
      id: '',
      phoneUser: '',
      nameProduct: '',
      amount: '',
      priceBuy: '',
      totalPrice: '',
      addressShip: '',
      stateBill: 'CART',
    });
    setAlert(null);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addBill(newBill);
    setTimeout(() => {
      resetAddBillData();
    }, 4000);

    setAlert({
      type: success === true ? 'success' : 'error',
      message: message === 'Internal server error' ? 'Mã hóa đơn không thỏa mãn' : message,
    });
  };

  const body = (
    <>
      {alert != null && <Alert info={alert} />}
      <form className={cx('wrapper')} onSubmit={onSubmit}>
        <label htmlFor="title">
          <p>Mã hóa đơn</p>
          <input
            className={cx('input')}
            type="text"
            id="id"
            placeholder="Type bill id"
            name="id"
            value={id}
            onChange={(e) => {
              onChangeNewBillForm(e);
            }}
          />
        </label>
        <label htmlFor="phoneUser">
          <p>Số điện thoại</p>
          <input
            className={cx('input')}
            type="tel"
            id="phoneUser"
            placeholder="Type phonenumber"
            name="phoneUser"
            value={phoneUser}
            onChange={(e) => {
              onChangeNewBillForm(e);
            }}
          />
        </label>
        <label htmlFor="nameProduct">
          <p>Tên sản phẩm</p>
          <input
            className={cx('input')}
            type="text"
            id="nameProduct"
            placeholder="Type name product"
            name="nameProduct"
            value={nameProduct}
            onChange={(e) => {
              onChangeNewBillForm(e);
            }}
          />
        </label>
        <label htmlFor="amount">
          <p>Số lượng</p>
          <input
            className={cx('input')}
            type="number"
            id="amount"
            placeholder="Type amount"
            name="amount"
            value={amount}
            onChange={(e) => {
              onChangeNewBillForm(e);
            }}
          />
        </label>
        <label htmlFor="priceBuy">
          <p>Giá mua</p>
          <input
            className={cx('input')}
            type="number"
            id="priceBuy"
            placeholder="Type priceBuy"
            name="priceBuy"
            value={priceBuy}
            onChange={(e) => {
              onChangeNewBillForm(e);
            }}
          />
        </label>
        <label htmlFor="totalPrice">
          <p>Tổng thanh toán</p>
          <input
            disabled
            className={cx('input')}
            type="number"
            id="totalPrice"
            placeholder="Type totalPrice"
            name="totalPrice"
            value={priceBuy * amount}
            onChange={(e) => {
              onChangeNewBillForm(e);
            }}
          />
        </label>
        <label htmlFor="addressShip">
          <p>Địa chỉ giao hàng</p>
          <textarea
            className={cx('input', 'addressShip')}
            id="addressShip"
            placeholder="Type address"
            name="addressShip"
            value={addressShip}
            onChange={(e) => {
              onChangeNewBillForm(e);
            }}
          ></textarea>
        </label>
        <label htmlFor="stateBill">
          <p>Trạng thái</p>
          <select
            className={cx('selection')}
            name="stateBill"
            id="stateBill"
            onChange={(e) => {
              onChangeNewBillForm(e);
            }}
          >
            <option value={'CART'}>CART</option>
            <option value={'BOUGHT'}>BOUGHT</option>
          </select>
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

export default AddBill;
