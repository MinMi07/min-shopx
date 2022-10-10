import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import HeadPage from '~/components/layout/HeadPage';
import Sidebar from '~/components/layout/Sidebar';
import ProductCard from '~/components/layout/ProductCard';
import SortOption from '~/components/layout/SortOption';

import { CategoryContext } from '~/contexts/CategoryContext';

import LayoutDefault from '~/components/layout/LayoutDefault/LayoutDefault.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(LayoutDefault);

function CategoryPage() {
  const { categoryName } = useParams();
  const [categorySelect, setCategorySelect] = useState({});

  const {
    categoryState: { category, categorys, categorysLoading },
    getCategorys,
  } = useContext(CategoryContext);

  useEffect(() => {
    getCategorys();
    categorys.forEach((category) => {
      if (category.title === categoryName) setCategorySelect(category);
    });
  }, [categorys]);

  return (
    <>
      <HeadPage>{categorySelect.title}</HeadPage>
      <div className={cx('sideBar_content')}>
        <Sidebar />
        <div className={cx('content_body')}>
          <SortOption />
          <div className={cx('product_list')}>
            <ProductCard categoryId={categorySelect._id} />
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryPage;
