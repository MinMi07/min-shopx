import { apiUrl } from '~/contexts/constaints';

import { ProductContext } from '~/contexts/ProductContext';
import { CategoryContext } from '~/contexts/CategoryContext';
import { useContext, useState, useEffect } from 'react';
import Alert from '~/components/Alert';
import Admin from '../views/Admin';
import classNames from 'classnames/bind';
import styles from '~/components/FormInputAdmin/FormInputAdmin.module.scss';

const cx = classNames.bind(styles);
function AddProduct() {
  // Contexts
  const { addProduct } = useContext(ProductContext);

  const {
    categoryState: { category, categorys, categorysLoading },
    getCategorys,
  } = useContext(CategoryContext);

  // State
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    image: '',
    priceOld: '',
    price: '',
    description: '',
    categorySelect: '',
  });

  const [alert, setAlert] = useState(null);
  const { id, name, image, priceOld, price, description, categorySelect } = newProduct;

  const onChangeNewProductForm = (event, type) => {
    if (type == 'image') setNewProduct({ ...newProduct, [event.target.name]: event.target.files[0] });
    else setNewProduct({ ...newProduct, [event.target.name]: event.target.value });
  };

  const resetAddProductData = () => {
    setNewProduct({ id: '', name: '', priceOld: '', price: '', description: '' });
    setAlert(null);
  };

  const handleSubmit = async () => {
    try {
      let formData = new FormData();
      formData.append('id', newProduct.id);
      formData.append('name', newProduct.name);
      formData.append('image', newProduct.image);
      formData.append('priceOld', newProduct.priceOld);
      formData.append('price', newProduct.price);
      formData.append('description', newProduct.description);
      formData.append('categorySelect', newProduct.categorySelect);

      const res = await fetch(`${apiUrl}/admin/product/add`, {
        method: 'POST',
        body: formData,
      });

      setTimeout(() => {
        resetAddProductData();
      }, 4000);

      setAlert({
        type: res.ok === true ? 'success' : 'error',
        message: res.ok === true ? 'Thêm thành công' : 'Thêm không thành công',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getCategors = async () => {
    let categors = await fetch(`${apiUrl}/admin/category`, {
      method: 'GET',
    });
  };

  useEffect(() => {
    getCategorys();
  }, []);

  const body = (
    <>
      {alert != null && <Alert info={alert} />}
      {/* <form className={cx('wrapper')} onSubmit={onSubmit} encType="multipart/form-data"> */}
      <div className={cx('wrapper')} encType="multipart/form-data">
        <label htmlFor="title">
          <p>Mã sản phẩm</p>
          <input
            className={cx('input')}
            type="text"
            id="id"
            placeholder="Type Product id"
            name="id"
            value={id}
            onChange={(e) => {
              onChangeNewProductForm(e, 'text');
            }}
          />
        </label>
        <label htmlFor="name">
          <p>Tên sản phẩm</p>
          <input
            className={cx('input')}
            type="text"
            id="name"
            placeholder="Type blog name"
            name="name"
            value={name}
            onChange={(e) => {
              onChangeNewProductForm(e, 'text');
            }}
          />
        </label>
        <label htmlFor="image">
          <p>Ảnh</p>
          <input
            className={cx('input')}
            type="file"
            placeholder="Choose blog'image"
            name="image"
            accept="image/*"
            onChange={(e) => {
              onChangeNewProductForm(e, 'image');
            }}
          />
        </label>
        <label htmlFor="priceOld">
          <p>Giá cũ</p>
          <input
            className={cx('input')}
            type="number"
            id="priceOld"
            placeholder="Type priceOld"
            name="priceOld"
            value={priceOld}
            onChange={(e) => {
              onChangeNewProductForm(e, 'text');
            }}
          />
        </label>
        <label htmlFor="price">
          <p>Giá mới</p>
          <input
            className={cx('input')}
            type="number"
            id="price"
            placeholder="Type price"
            name="price"
            value={price}
            onChange={(e) => {
              onChangeNewProductForm(e, 'text');
            }}
          />
        </label>
        <label htmlFor="description">
          <p>Mô tả sản phẩm</p>

          <textarea
            className={cx('input', 'description')}
            id="description"
            placeholder="Type Blog description"
            name="description"
            value={description}
            onChange={(e) => {
              onChangeNewProductForm(e, 'text');
            }}
          ></textarea>
        </label>
        <label htmlFor="category">
          <p>Mã danh mục</p>
          <select
            className={cx('selection')}
            name="categorySelect"
            id="category"
            onChange={(e) => {
              onChangeNewProductForm(e, 'text');
            }}
          >
            {categorys.map((category, index) => (
              <option key={index} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
        </label>
        <div className={cx('btnSubmit')}>
          <button type="submit" onClick={handleSubmit}>
            THÊM
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Admin>{body}</Admin>
    </>
  );
}

export default AddProduct;
