import { useState, useEffect, useRef, createRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '~/contexts/AuthContext';
import { BillContext } from '~/contexts/BillContext';
import { ProductContext } from '~/contexts/ProductContext';
import { BlogContext } from '~/contexts/BlogContext';
import { CategoryContext } from '~/contexts/CategoryContext';
import images from '~/asset/images';
import classNames from 'classnames/bind';
import styles from './Admin.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFaceSmile,
  faArrowRightFromBracket,
  faRectangleList,
  faList,
  faAngleRight,
  faMoneyBills,
  faShapes,
  faPenNib,
  faListCheck,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Admin({ children }) {
  const { logoutUser } = useContext(AuthContext);

  const {
    billState: { bill, bills, billsLoading },
    getBills,
  } = useContext(BillContext);

  const {
    productState: { product, products, productsLoading },
    getProducts,
  } = useContext(ProductContext);

  const {
    blogState: { blog, blogs, blogsLoading },
    getBlogs,
  } = useContext(BlogContext);

  const {
    categoryState: { category, categorys, categorysLoading },
    getCategorys,
  } = useContext(CategoryContext);

  const DashboardFunctions = [
    {
      path: 'category',
      name: 'Danh mục sản phầm',
    },
    {
      path: 'product',
      name: 'Sản phẩm',
    },
    {
      path: 'blog',
      name: 'Bài viết',
    },
    {
      path: 'bill',
      name: 'Hóa đơn',
    },
    {
      path: 'user',
      name: 'Tài khoản',
    },
  ];

  useEffect(() => {
    getBills();
    getProducts();
    getBlogs();
    getCategorys();
  }, []);

  const handleClick = function (item) {
    let checkClassList = document.querySelectorAll(`.${cx('show_detail_admmin')}`);
    let itemClassList = item.current.children[3].classList;
    let show;
    if (!itemClassList.contains(cx('show_detail_admmin'))) show = true;
    if (checkClassList.length > 0) {
      checkClassList.forEach((element) => {
        element.classList.remove(cx('show_detail_admmin'));
      });
    }
    if (show) itemClassList.add(cx('show_detail_admmin'));
  };

  const lineRefs = useRef([]);
  lineRefs.current = DashboardFunctions.map((_, index) => lineRefs.current[index] ?? createRef());

  const logout = () => {
    logoutUser();
  };

  return (
    <>
      {!children && (
        <div className={cx('wrapper')}>
          <div className={cx('sidebar')}>
            <div className={cx('header_sidebar')}>
              <FontAwesomeIcon className={cx('header_sidebar-icon')} icon={faFaceSmile}></FontAwesomeIcon>
              <span>ADMIN</span>
            </div>
            <div className={cx('topic_dashbroad')}>
              <FontAwesomeIcon className={cx('icon', 'topic_dashbroad-icon')} icon={faList}></FontAwesomeIcon>
              <Link to="/admin">
                <span>Dashboard</span>
              </Link>
            </div>
            <ul className={cx('ul_dashbroad')}>
              {DashboardFunctions.map((item, index) => (
                <li
                  key={item.name}
                  ref={lineRefs.current[index]}
                  onClick={() => {
                    handleClick(lineRefs.current[index]);
                  }}
                >
                  <FontAwesomeIcon className={cx('icon')} icon={faRectangleList}></FontAwesomeIcon>
                  <span className={cx('dashbroad_function')}>{item.name}</span>
                  <FontAwesomeIcon className={cx('icon--right')} icon={faAngleRight}></FontAwesomeIcon>

                  <div className={cx('sbdashbroad_function')}>
                    <Link className={cx('sbdashbroad_function-item')} to={`/admin/${item.path}/add`}>
                      Thêm mới
                    </Link>
                    <Link to={`/admin/${item.path}`}>Chi tiết bảng</Link>
                  </div>
                </li>
              ))}
            </ul>
            <div className={cx('sidebar_logout')} onClick={logout}>
              <FontAwesomeIcon className={cx('icon')} icon={faArrowRightFromBracket}></FontAwesomeIcon>
              <span>Đăng xuất</span>
            </div>
          </div>
          <div className={cx('body')}>
            <div className={cx('header')}>
              <div className={cx('searchInput')}>
                <input type="text" placeholder="Enter the keys"></input>
                <FontAwesomeIcon className={cx('searchInput_icon')} icon={faSearch} />
              </div>
              <div className={cx('infoUser')}>
                <span>admin</span>
                <img src={images.avatarAdmin} alt="admin image" />
              </div>
            </div>
            <div className={cx('container')}>
              <div className={cx('wrapperCardReview')}>
                <div className={cx('cardReview', 'yellowBoder')}>
                  <div>
                    <h3>TỔNG SỐ HÓA ĐƠN</h3>
                    <h1>{bills.length}</h1>
                  </div>
                  <FontAwesomeIcon className={cx('iconReview')} icon={faMoneyBills} />
                </div>
                <div className={cx('cardReview', 'orangeBoder')}>
                  <div>
                    <h3>TỔNG SỐ SẢN PHẨM</h3>
                    <h1>{products.length}</h1>
                  </div>
                  <FontAwesomeIcon className={cx('iconReview')} icon={faShapes} />
                </div>
                <div className={cx('cardReview', 'pinkBoder')}>
                  <div>
                    <h3>TỔNG SỐ BÀI VIẾT</h3>
                    <h1>{blogs.length}</h1>
                  </div>
                  <FontAwesomeIcon className={cx('iconReview')} icon={faPenNib} />
                </div>
                <div className={cx('cardReview', 'greenBoder')}>
                  <div>
                    <h3>TỔNG SỐ DANH MỤC</h3>
                    <h1>{categorys.length}</h1>
                  </div>
                  <FontAwesomeIcon className={cx('iconReview')} icon={faListCheck} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {children && (
        <div className={cx('wrapper')}>
          <div className={cx('sidebar')}>
            <div className={cx('header_sidebar')}>
              <FontAwesomeIcon className={cx('header_sidebar-icon')} icon={faFaceSmile}></FontAwesomeIcon>
              <span>ADMIN</span>
            </div>
            <div className={cx('topic_dashbroad')}>
              <FontAwesomeIcon className={cx('icon', 'topic_dashbroad-icon')} icon={faList}></FontAwesomeIcon>
              <Link to="/admin">
                <span>Dashboard</span>
              </Link>
            </div>
            <ul className={cx('ul_dashbroad')}>
              {DashboardFunctions.map((item, index) => (
                <li
                  key={item.name}
                  ref={lineRefs.current[index]}
                  onClick={() => {
                    handleClick(lineRefs.current[index]);
                  }}
                >
                  <FontAwesomeIcon className={cx('icon')} icon={faRectangleList}></FontAwesomeIcon>
                  <span className={cx('dashbroad_function')}>{item.name}</span>
                  <FontAwesomeIcon className={cx('icon--right')} icon={faAngleRight}></FontAwesomeIcon>

                  <div className={cx('sbdashbroad_function')}>
                    <Link className={cx('sbdashbroad_function-item')} to={`/admin/${item.path}/add`}>
                      Thêm mới
                    </Link>
                    <Link to={`/admin/${item.path}`}>Chi tiết bảng</Link>
                  </div>
                </li>
              ))}
            </ul>
            <div className={cx('sidebar_logout')} onClick={logout}>
              <FontAwesomeIcon className={cx('icon')} icon={faArrowRightFromBracket}></FontAwesomeIcon>
              <span>Đăng xuất</span>
            </div>
          </div>
          <div className={cx('body')}>
            {/* --------------- */}
            <div className={cx('header')}>
              <div className={cx('searchInput')}>
                <input type="text" placeholder="Enter the keys"></input>
                <FontAwesomeIcon className={cx('searchInput_icon')} icon={faSearch} />
              </div>
              <div className={cx('infoUser')}>
                <span>admin</span>
                <img src={images.avatarAdmin} alt="admin image" />
              </div>
            </div>
            <div className={cx('container')}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default Admin;
