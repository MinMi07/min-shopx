import HeadPage from '~/components/layout/HeadPage';
import Sidebar from '~/components/layout/Sidebar';
import ProductCard from '~/components/layout/ProductCard';
import SortOption from '~/components/layout/SortOption';

import LayoutDefault from '~/components/layout/LayoutDefault/LayoutDefault.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(LayoutDefault);

function Home() {
  return (
    <>
      <HeadPage>HOME</HeadPage>
      <div className={cx('sideBar_content')}>
        <Sidebar />
        <div className={cx('content_body')}>
          <SortOption />
          <div className={cx('product_list')}>
            <ProductCard />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
