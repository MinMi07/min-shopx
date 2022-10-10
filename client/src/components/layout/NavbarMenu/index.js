import { useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '~/contexts/AuthContext';
import Button from '~/components/Button';
import images from '~/asset/images';

import classNames from 'classnames/bind';
import styles from './NavbarMenu.module.scss';
import {
  faArrowRightFromBracket,
  faBars,
  faCartShopping,
  faMagnifyingGlass,
  faUser,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { CategoryContext } from '~/contexts/CategoryContext';

const cx = classNames.bind(styles);

function NavbarMenu() {
  const {
    authState: { user, isAuthenticated },
    logoutUser,
  } = useContext(AuthContext);

  const {
    categoryState: { category, categorys, categorysLoading },
    getCategorys,
  } = useContext(CategoryContext);

  useEffect(() => {
    getCategorys();
  }, []);

  const logout = () => logoutUser();

  let body;

  // useRef

  const navigation_right = useRef();
  const navigation_center = useRef();

  // responsive
  const closeMenu = () => {
    navigation_right.current.style.display = 'flex';
    navigation_center.current.style.display = 'none';
  };

  const openMenu = () => {
    navigation_right.current.style.display = 'none';
    navigation_center.current.style.display = 'block';
  };

  if (isAuthenticated) {
    body = (
      <>
        <div>
          <Link to="/home">
            <header className={cx('header')}>
              <img src={images.logoShopImg} alt="logo" />
              <p>hệ thống cửa hàng shop</p>
            </header>
          </Link>
        </div>
        <div>
          <nav className={cx('navigation')}>
            <div className={cx('navigation_left')}>
              <Link to="/home">
                <img className={cx('logo_Shop')} src={images.avatarShop} alt="logo" />
              </Link>
            </div>
            <div ref={navigation_center} className={cx('navigation_center')}>
              <ul>
                {categorys.map((category) => {
                  return (
                    <li key={category.id}>
                      <Button small bgTransparent to={`/home/${category.title}`}>{`${category.title}`}</Button>
                    </li>
                  );
                })}

                <li>
                  <Button small bgTransparent to={`/blog`}>
                    Bài viết
                  </Button>
                </li>

                <li>
                  <Button className={cx('btnCloseMenu')} text small onClick={closeMenu}>
                    <FontAwesomeIcon icon={faXmark} />
                  </Button>
                </li>
              </ul>
            </div>
            <div ref={navigation_right} className={cx('navigation_right')}>
              <Button
                onClick={(e) => {
                  openMenu();
                }}
                className={cx('icon_menu')}
                text
                small
              >
                <FontAwesomeIcon icon={faBars} />
              </Button>
              <Button className={cx('icon_search')} text small>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </Button>
              <Button
                small
                to="/cart"
                className={cx('navigation_right_icon', 'cart_icon')}
                rightIcon={<FontAwesomeIcon icon={faCartShopping} />}
              >
                <span className={cx('cartNotifi')}>4</span>
              </Button>
              <Button
                to="/login"
                small
                title
                blackText
                onClick={logout}
                className={cx('logout')}
                rightIcon={<FontAwesomeIcon className={cx('btnAuth')} icon={faArrowRightFromBracket} />}
              >
                {user.username}
              </Button>
            </div>
          </nav>
        </div>
      </>
    );
  }

  if (!isAuthenticated) {
    body = (
      <>
        <div>
          <Link to="/home">
            <header className={cx('header')}>
              <img src={images.logoShopImg} alt="logo" />
              <p>hệ thống cửa hàng shop</p>
            </header>
          </Link>
        </div>
        <div>
          <nav className={cx('navigation')}>
            <Link to="/home">
              <div className={cx('navigation_left')}>
                <img className={cx('logo_Shop')} src={images.avatarShop} alt="logo" />
              </div>
            </Link>
            <div ref={navigation_center} className={cx('navigation_center')}>
              <ul>
                {categorys.map((category) => {
                  return (
                    <li key={category.id}>
                      <Button small bgTransparent to={`/home/${category.title}`}>{`${category.title}`}</Button>
                    </li>
                  );
                })}

                <li>
                  <Button small bgTransparent to={`/blog`}>
                    Bài viết
                  </Button>
                </li>
              </ul>
            </div>
            <div ref={navigation_right} className={cx('navigation_right')}>
              <Button
                onClick={(e) => {
                  openMenu();
                }}
                className={cx('icon_menu')}
                text
                small
              >
                <FontAwesomeIcon icon={faBars} />
              </Button>
              <Button className={cx('icon_search')} text small>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </Button>
              <Button
                small
                to="/cart"
                className={cx('navigation_right_icon', 'cart_icon')}
                rightIcon={<FontAwesomeIcon icon={faCartShopping} />}
              >
                <span className={cx('cartNotifi')}>4</span>
              </Button>
              <Button small to="/login" className={cx('btnAuth')} rightIcon={<FontAwesomeIcon icon={faUser} />} />
            </div>
          </nav>
        </div>
      </>
    );
  }

  return body;
}

export default NavbarMenu;
