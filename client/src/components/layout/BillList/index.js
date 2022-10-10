import { useContext, useEffect, useState } from 'react';
import images from '~/asset/images';
import Alert from '~/components/Alert';
import Button from '~/components/Button';

import { AuthContext } from '~/contexts/AuthContext';
import { BillContext } from '~/contexts/BillContext';
import { ProductContext } from '~/contexts/ProductContext';

import classNames from 'classnames/bind';
import styles from './BillList.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faClose, faMinus } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function BillList() {
  let body = null;
  const [total, setTotal] = useState(0);
  const {
    authState: { user },
  } = useContext(AuthContext);

  const {
    billState: { bill, bills, billsLoading },
    getBills,
    deleteBill,
    updateBill,
  } = useContext(BillContext);

  const {
    productState: { product, products, productsLoading },
    getProducts,
  } = useContext(ProductContext);

  const [billsDisplay, setBillsDisplay] = useState([]);

  const [alert, setAlert] = useState(null);

  useEffect(() => {
    getBills();
    getProducts();
    let billsUser = [];
    let total = 0;

    bills.forEach((bill) => {
      if (bill.user === user._id && bill.stateBill === 'CART') {
        total += bill.totalPrice;
        billsUser.push(bill);
      }
    });

    setBillsDisplay(billsUser);
    setTotal(total);
  }, [billsLoading, alert, bills]);

  const handleDelete = (idDelete) => {
    deleteBill(idDelete);
    setAlert({
      type: 'success',
      message: 'Xóa thành công',
    });
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };

  const handlePay = async () => {
    billsDisplay.forEach((item) => {
      updateBill({ ...item, stateBill: 'BOUGHT' });
    });

    setAlert({
      type: 'success',
      message: 'Thanh toán thành công',
    });

    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };

  const handleCountUp = (item) => {
    updateBill({ ...item, amount: item.amount + 1 });
  };

  const handleCountDown = (item) => {
    if (item.amount >= 2) updateBill({ ...item, amount: item.amount - 1 });
  };

  if (billsDisplay.length > 0)
    body = (
      <>
        {alert != null && <Alert info={alert} />}
        <div className={cx('cart-content')}>
          <table className={cx('cart-content--table')}>
            <thead>
              <tr>
                <td>Sản phẩm</td>
                <td>Tên</td>
                <td>Giá</td>
                <td>Số lượng</td>
                <td>Tổng</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {billsDisplay.map((billItem, index) => {
                let link = '';
                products.forEach((product) => {
                  if (product.name == billItem.nameProduct) link = product.image;
                });

                return (
                  <tr key={index}>
                    <td className={cx('table-img')}>
                      <img src={link} alt="" />
                    </td>
                    <td className={cx('table-name--product')}>{billItem.nameProduct}</td>
                    <td className={cx('table-price')}>{billItem.priceBuy}$</td>
                    <td>
                      <div className={cx('count-product')}>
                        <FontAwesomeIcon
                          className={cx('remove-outline')}
                          icon={faMinus}
                          onClick={() => {
                            handleCountDown(billItem);
                          }}
                        ></FontAwesomeIcon>
                        <p className={cx('count-product--number')}>{billItem.amount}</p>
                        <FontAwesomeIcon
                          className={cx('add-outline')}
                          icon={faAdd}
                          onClick={() => {
                            handleCountUp(billItem);
                          }}
                        ></FontAwesomeIcon>
                      </div>
                    </td>
                    <td className={cx('table-sum--price')}>{billItem.totalPrice}$</td>
                    <td>
                      <FontAwesomeIcon
                        className={cx('delete-product')}
                        icon={faClose}
                        onClick={() => {
                          handleDelete(billItem._id);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <form className={cx('form-discount-code')}>
            <div className={cx('discount-code')}>
              <div className={cx('discount-code--content')}>Mã giảm giá</div>
              <div className={cx('discount-code--cart')}>
                <label htmlFor="discountCode">
                  <div className={cx('discount-code--type')}>
                    <input
                      id="discountCode"
                      className={cx('discount-code--input')}
                      type="text"
                      placeholder="Mã ưu đãi"
                    ></input>
                    <button className={cx('discount-code--add')} type="submit">
                      Áp dụng
                    </button>
                  </div>
                </label>
                <button className={cx('btn', 'btn-update')}>Cập nhật giỏ hàng</button>
              </div>
            </div>
          </form>

          <div className={cx('discount-code-sum', 'discount-code')}>
            <div className={cx('sum-code--content', 'discount-code--content')}>Cộng giỏ hàng</div>
            <div className={cx('sum-code--cart', 'discount-code--cart')}>
              <div className={cx('sum-code--type')}>
                <table className={cx('list_imfor-sum-code')}>
                  <tbody>
                    <tr>
                      <td className={cx('list_imfor-item')}>TẠM TÍNH</td>
                      <td>{total}$</td>
                    </tr>
                    <tr>
                      <td className={cx('list_imfor-item')}>PHÍ SHIP</td>
                      <td className={cx('list_imfor-ship')}>GIAO HÀNG MIỄN PHÍ</td>
                    </tr>
                    <tr>
                      <td className={cx('list_imfor-item')}>TỔNG</td>
                      <td>{total}$</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button
                className={cx('btn', 'btn-buy')}
                onClick={() => {
                  handlePay();
                }}
              >
                Tiến hành thanh toán
              </button>
              <Button blackText className={cx('btn', 'btn-add-product')} to="/home">
                Mua thêm sản phẩm khác
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  else body = <h2 className={cx('emptyCart')}> Giỏ hàng trống</h2>;

  return <>{body}</>;
}

export default BillList;
