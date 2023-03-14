import context from 'react-bootstrap/esm/AccordionContext';
import { Link } from 'react-router-dom';
import images from '~/asset/images';

import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);

function Footer() {
  return (
    <>
      <div className={cx('hr-footer')}></div>
      <footer className={cx('footer')}>
        <div className={cx('footer_information_shop', 'footer_suport_service')}>
          <ul>
            <img className={cx('footer_logoShop')} src={images.avatarShop} alt="logo_Shop" />
            <li>
              <Link to="/">Hệ thống nước hoa số 1 Hà Nội</Link>
            </li>
            <li>
              <table>
                <tbody>
                  <tr>
                    <td>Hotline</td>
                    <td>
                      <Link to="/">097.567.1080</Link>
                    </td>
                  </tr>
                  <tr>
                    <td>Store 1</td>
                    <td>
                      <Link to="/">Đồng Trúc, Thạch Thất, Hà Nội</Link>
                    </td>
                  </tr>
                  <tr>
                    <td>Store 2</td>
                    <td>
                      <Link to="/">Phố Nhổn, Bắc Từ Liên, Hà Nội</Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </li>
          </ul>
        </div>
        <div className={cx('footer_suport', 'footer_suport_service')}>
          <ul>
            <li>
              <Link to="/">Hỗ trợ</Link>
            </li>
            <li>
              <Link to="/">7 cách bảo quản nước hoa tốt nhất</Link>
            </li>
            <li>
              <Link to="/">Giữ "phong độ" cho Sneaker trắng ra sao</Link>
            </li>
            <li>
              <Link to="/">9 Kỹ thuật sử dụng nước hoa dành cho U30</Link>
            </li>
          </ul>
        </div>
        <div className={cx('footer_service', 'footer_suport_service')}>
          <ul>
            <li>
              <Link to="/">Dịch vụ khác hãng</Link>
            </li>
            <li>
              <Link to="/">Giới thiệu XSHOP</Link>
            </li>
            <li>
              <Link to="/">Hướng dẫn đặt hàng</Link>
            </li>
            <li>
              <Link to="/">Chính sách đổi chả và bảo hành</Link>
            </li>
            <li>
              <Link to="/">Chính sách bảo mật</Link>
            </li>
            <li>
              <Link to="/">Hệ thống cửa hàng</Link>
            </li>
          </ul>
        </div>

        <div className={cx('footer_social', 'footer_suport_service')}>
          <div className={cx('footer_suport_service-frame')}>
            <ul>
              <li>
                <Link to="/">XSHOP trên facebook</Link>
              </li>
              <li className={cx('list-icon-footer')}>
                <FontAwesomeIcon className={cx('oppacityText')} icon={faFacebook} />
                <FontAwesomeIcon className={cx('oppacityText')} icon={faInstagram} />
                <FontAwesomeIcon className={cx('oppacityText')} icon={faGithub} />
                <FontAwesomeIcon className={cx('oppacityText')} icon={faTwitter} />
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
