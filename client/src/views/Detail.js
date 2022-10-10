import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import Button from '~/components/Button';
import Alert from '~/components/Alert';
import { ProductContext } from '~/contexts/ProductContext';
import { AuthContext } from '~/contexts/AuthContext';
import { BillContext } from '~/contexts/BillContext';
import Sidebar from '~/components/layout/Sidebar';
import LayoutDefault from '~/components/layout/LayoutDefault/LayoutDefault.module.scss';
import GlobalStyles from '~/components/GlobalStyles/GlobalStyles.module.scss';
import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faMinus, faSpinner } from '@fortawesome/free-solid-svg-icons';

const gls = classNames.bind(GlobalStyles);
const cx = classNames.bind(LayoutDefault);

function Detail() {
  // context
  const { addBillUser } = useContext(BillContext);

  const {
    authState: { user, authLoading, isAuthenticated },
  } = useContext(AuthContext);

  const { id } = useParams();
  const [inforDetailProduct, setInforDetailProduct] = useState({});
  const [count, setCount] = useState(1);

  const {
    productState: { products, productsLoading },
    getProducts,
  } = useContext(ProductContext);
  //
  const [alert, setAlert] = useState(null);

  let newBill = {
    id: '',
    phoneUser: '',
    nameProduct: '',
    amount: '',
    priceBuy: '',
    totalPrice: '',
    addressShip: '',
    stateBill: 'CART',
  };

  useEffect(() => {
    getProducts();
    products.forEach((product) => {
      if (product._id === id) {
        setInforDetailProduct(product);
      }
    });
  }, [authLoading]);

  const handleBought = async (e) => {
    e.preventDefault();
    newBill = {
      id: Math.floor(Math.random() * 100),
      phoneUser: user.phoneNumber,
      nameProduct: inforDetailProduct.name,
      amount: count,
      priceBuy: inforDetailProduct.price,
      totalPrice: count * inforDetailProduct.price,
      addressShip: user.address,
      stateBill: 'CART',
    };

    const { success, message } = await addBillUser(newBill);

    setAlert({
      type: success === true ? 'success' : 'error',
      message: success === true ? 'Đặt thành công' : message,
    });
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };

  return (
    <>
      {alert != null && <Alert info={alert} />}
      {/* <HeadPage>HOME</HeadPage> */}
      <div className={cx('sideBar_content')}>
        <Sidebar />
        <div className={cx('content_body')}>
          <div className={cx('detailInforLayout')}>
            <h2>Chi tiết sản phẩm</h2>
            {productsLoading && (
              <div>
                <FontAwesomeIcon className={gls('spinner--Load')} icon={faSpinner} />
              </div>
            )}
            <div className={cx('detailLayout')}>
              <div className={cx('detailImage')}>
                <img src={inforDetailProduct.image} alt={inforDetailProduct.name} />
              </div>
              <div className={cx('detailInfor')}>
                <h2 className={cx('nameProduct')}>{inforDetailProduct.name}</h2>
                <p className={cx('price')}>
                  <span>{inforDetailProduct.priceOld}$</span> <span>{inforDetailProduct.price}$</span>
                </p>

                <div className={cx('count')}>
                  <div className={cx('count-product')}>
                    <FontAwesomeIcon
                      icon={faMinus}
                      className={cx('add-outline')}
                      onClick={() => {
                        if (count > 1) setCount(count - 1);
                      }}
                    />
                    <p className={cx('count-product--number')}>{count}</p>
                    <FontAwesomeIcon
                      icon={faAdd}
                      className={cx('remove-outline')}
                      onClick={() => {
                        setCount(count + 1);
                      }}
                    />
                  </div>
                </div>
                <Button
                  to="/cart"
                  large
                  className={cx('btnBought')}
                  onClick={(e) => {
                    handleBought(e);
                  }}
                >
                  MUA NGAY
                </Button>
              </div>
            </div>
            <div>
              <h2>Mô tả chi tiết</h2>
              {inforDetailProduct.description}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Detail;
