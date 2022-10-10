import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '~/contexts/AuthContext';
import Button from '~/components/Button';
import images from '~/asset/images';

import classNames from 'classnames/bind';
import styles from './NavbarMenu.module.scss';
import { faArrowRightFromBracket, faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { CategoryContext } from '~/contexts/CategoryContext';

const cx = classNames.bind(styles);

function NavbarMenu() {
  const {
    authState: {
      user: { username },
    },
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

  return (
    <>
      <div>
        <Link to="/">
          <header className={cx('header')}>
            <img src={images.logoShopImg} alt="logo" />
            <p>hệ thống cửa hàng shop</p>
          </header>
        </Link>
      </div>
      <div>
        <nav className={cx('navigation')}>
          <Link to="/">
            <div className={cx('navigation_left')}>
              <img className={cx('logo_Shop')} src={images.avatarShop} alt="logo" />
            </div>
          </Link>
          <div className={cx('navigation_cennter')}>
            <ul>
              {categorys.map((category) => {
                return (
                  <li key={category.id}>
                    <Button small to={`home/${category.title}`}>{`${category.title}`}</Button>
                  </li>
                );
              })}

              <li>
                <Button small to={`home/blog}`}>
                  Bài viết
                </Button>
              </li>
            </ul>
          </div>
          <div className={cx('navigation_right')}>
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
              small
              onClick={logout}
              className={cx('logout')}
              rightIcon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
            >
              {username}
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
}

export default NavbarMenu;
