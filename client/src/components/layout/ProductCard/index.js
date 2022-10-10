import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '~/contexts/AuthContext';
import { ProductContext } from '~/contexts/ProductContext';
import { BillContext } from '~/contexts/BillContext';
import Alert from '~/components/Alert';

import classNames from 'classnames/bind';
import styles from './ProductCard.module.scss';
import GlobalStyles from '~/components/GlobalStyles/GlobalStyles.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCircleInfo, faSpinner } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
const gls = classNames.bind(GlobalStyles);

function ProductCard({ categoryId }) {
  // context
  const {
    productState: { product, products, productsLoading },
    getProducts,
  } = useContext(ProductContext);

  const {
    authState: { user, authLoading, isAuthenticated },
  } = useContext(AuthContext);

  const { addBillUser } = useContext(BillContext);
  const [alert, setAlert] = useState(null);

  let body;

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

  const handleBought = async (e, product) => {
    e.preventDefault();
    console.log('product', product);
    newBill = {
      id: Math.floor(Math.random() * 100),
      phoneUser: user.phoneNumber,
      nameProduct: product.name,
      amount: 1,
      priceBuy: product.price,
      totalPrice: product.price,
      addressShip: user.address,
      stateBill: 'CART',
    };

    const { success, message } = await addBillUser(newBill);

    setAlert({
      type: success === true ? 'success' : 'error',
      message: success === true ? 'Thêm vào giỏ hàng thành công' : message,
    });
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };

  useEffect(() => {
    getProducts();
  }, [products]);

  if (categoryId) {
    body = products.map((product, index) => {
      let detailLink = '/home/detail/' + `${product._id}`;
      let cartLink = '/cart';
      if (product.category === categoryId)
        return (
          <div key={index} className={cx('infor_Product')}>
            <img src={product.image} alt={product.name} className={cx('Picture_Product')} />
            <Link to={detailLink}>
              <p className={cx('product-name')}>{product.name}</p>
            </Link>
            <div className={cx('wrapperPrice')}>
              <p className={cx('priceOld')}>{product.priceOld}$</p>
              <span className={cx('price')}>{product.price}$</span>
            </div>

            <div className={cx('wrapperOption')}>
              <Link to={detailLink}>
                <FontAwesomeIcon className={cx('iconOption', 'infoIcon')} icon={faCircleInfo}></FontAwesomeIcon>
              </Link>
              <FontAwesomeIcon
                className={cx('iconOption', 'cartIcon')}
                icon={faCartShopping}
                onClick={(e) => {
                  handleBought(e, product);
                }}
              >
                <Link to={cartLink}></Link>
              </FontAwesomeIcon>
            </div>
          </div>
        );
    });
  } else {
    body = products.map((product, index) => {
      let detailLink = '/home/detail/' + `${product._id}`;
      let cartLink = '/cart';
      return (
        <div key={index} className={cx('infor_Product')}>
          <img src={product.image} alt={product.name} className={cx('Picture_Product')} />
          <Link to={detailLink}>
            <p className={cx('product-name')}>{product.name}</p>
          </Link>
          <div className={cx('wrapperPrice')}>
            <p className={cx('priceOld')}>{product.priceOld}$</p>
            <span className={cx('price')}>{product.price}$</span>
          </div>

          <div className={cx('wrapperOption')}>
            <Link to={detailLink}>
              <FontAwesomeIcon className={cx('iconOption', 'infoIcon')} icon={faCircleInfo}></FontAwesomeIcon>
            </Link>
            <FontAwesomeIcon
              className={cx('iconOption', 'cartIcon')}
              icon={faCartShopping}
              onClick={(e, product) => {
                handleBought(e, product);
              }}
            >
              <Link to={cartLink}></Link>
            </FontAwesomeIcon>
          </div>
        </div>
      );
    });
  }

  return (
    <>
      {productsLoading && (
        <div>
          <FontAwesomeIcon className={gls('spinner--Load')} icon={faSpinner} />
        </div>
      )}
      {alert != null && <Alert info={alert} />}
      {body}
    </>
  );
}

export default ProductCard;
