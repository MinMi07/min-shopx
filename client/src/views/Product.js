import { ProductContext } from '~/contexts/ProductContext';
import { CategoryContext } from '~/contexts/CategoryContext';
import { AuthContext } from '~/contexts/AuthContext';
import { useContext, useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from '~/components/TableAdmin/TableAdmin.module.scss';
import classNames from 'classnames/bind';

import Button from '~/components/Button';
import Admin from '../views/Admin';
import Alert from '~/components/Alert';
import GlobalStyles from '~/components/GlobalStyles/GlobalStyles.module.scss';

const cx = classNames.bind(styles);
const gls = classNames.bind(GlobalStyles);

function Product() {
  let body = null;
  // Contexts
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  const {
    productState: { product, products, productsLoading },
    getProducts,
    deleteProduct,
    updateProduct,
  } = useContext(ProductContext);

  const {
    categoryState: { category, categorys, categorysLoading },
    getCategorys,
  } = useContext(CategoryContext);

  const [updateProductModal, setUpdateProductModal] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);

  // FORM UPDATE
  // BEGIN
  const [alert, setAlert] = useState(null);
  const [UpdateProduct, setUpdateProduct] = useState({
    _id: '',
    id: '',
    name: '',
    image: '',
    price: '',
    priceOld: '',
    description: '',
  });

  // handleEdit
  const handleEdit = (product) => {
    setUpdateProduct({
      _id: product._id,
      id: product.id,
      name: product.name,
      image: product.image,
      priceOld: product.priceOld,
      price: product.price,
      description: product.description,
    });
    setUpdateProductModal(true);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updateProduct(UpdateProduct);
    setAlert({
      type: success === true ? 'success' : 'error',
      message: message,
    });
    if (success) setUpdateProductModal(false);

    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };

  const onChangeNewProductForm = (event, type) => {
    if (type == 'image') setUpdateProduct({ ...UpdateProduct, [event.target.name]: event.target.files[0] });
    else setUpdateProduct({ ...UpdateProduct, [event.target.name]: event.target.value });
  };
  // END

  // delete Product
  const [deleteProductID, setDeleteProductID] = useState({ _id: '', id: '', title: '' });

  const handleDelete = (product) => {
    setDeleteProductID({ _id: product._id, id: product.id, title: product.title });
    setDeleteConfirmModal(true);
  };

  const onDelete = async (e) => {
    e.preventDefault();
    const { success, message } = deleteProduct(deleteProductID._id);
    setTimeout(setDeleteConfirmModal(false), 4000);

    setAlert({
      type: 'success' || success,
      message: 'Xóa thành công' || message,
    });
  };

  // Start: Get all posts
  useEffect(() => {
    getProducts();
    getCategorys();
  }, []);

  if (productsLoading) {
    body = (
      <div>
        <FontAwesomeIcon className={gls('spinner--Load')} icon={faSpinner} />
      </div>
    );
  } else if (products.length === 0) {
    body = <h2>DANH SÁCH TRỐNG</h2>;
  } else {
    body = (
      <>
        {deleteConfirmModal && (
          <div className={cx('update_card')}>
            <form id="form_update" className={cx('wrapperFormUpdate')} onSubmit={onDelete}>
              <h2> Xác nhận xóa mã sản phẩm: {deleteProductID.id} </h2>
              <div className={cx('btnLayout')}>
                <Button>XÁC NHẬN</Button>
                <Button
                  error
                  onClick={() => {
                    setDeleteConfirmModal(false);
                  }}
                >
                  HỦY
                </Button>
              </div>
            </form>
          </div>
        )}

        {updateProductModal && (
          <div className={cx('update_card')}>
            <form
              id="form_update"
              className={cx('wrapperFormUpdate')}
              encType="multipart/form-data"
              onSubmit={onSubmit}
            >
              <label htmlFor="blogID">
                <p>Mã sản phẩm</p>
                <input
                  className={cx('input')}
                  type="text"
                  id="id"
                  placeholder="Type product id"
                  name="id"
                  value={UpdateProduct.id}
                  onChange={(e) => {
                    onChangeNewProductForm(e, 'text');
                  }}
                />
              </label>
              <label htmlFor="ProductName">
                <p>Tên sản phẩm</p>
                <input
                  className={cx('input')}
                  type="text"
                  id="ProductName"
                  placeholder="Type Product name"
                  name="name"
                  value={UpdateProduct.name}
                  onChange={(e) => {
                    onChangeNewProductForm(e, 'text');
                  }}
                />
              </label>
              <label htmlFor="image">
                <p>Ảnh</p>
                <input
                  className={cx('input', 'inputFile')}
                  type="file"
                  id="image"
                  name="image"
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
                  value={UpdateProduct.priceOld}
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
                  value={UpdateProduct.price}
                  onChange={(e) => {
                    onChangeNewProductForm(e, 'text');
                  }}
                />
              </label>
              <label htmlFor="description">
                <p>Mô tả</p>
                <textarea
                  className={cx('input', 'description')}
                  id="description"
                  placeholder="Type Product description"
                  name="description"
                  value={UpdateProduct.description}
                  onChange={(e) => {
                    onChangeNewProductForm(e, 'text');
                  }}
                ></textarea>
              </label>
              <div className={cx('btnSubmit')}>
                <button type="submit">CẬP NHẬT</button>
                <Button
                  onClick={() => {
                    setUpdateProductModal(false);
                  }}
                  error
                >
                  HỦY
                </Button>
              </div>
            </form>
          </div>
        )}

        {alert != null && <Alert info={alert} />}
        <div className={cx('wrapper')}>
          <h2 className={cx('content')}>Danh mục sản phẩm</h2>
          <table className={cx('table')}>
            <thead>
              <tr>
                <td>STT</td>
                <td>Mã id</td>
                <td>Tên sản phẩm</td>
                <td>Ảnh</td>
                <td>Mô tả</td>
                <td>Giá cũ</td>
                <td>Giá hiện tại</td>
                <td></td>
              </tr>
            </thead>
            {products.map((product, index) => (
              <tbody key={product._id}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>
                    <img src={product.image} alt="ảnh mô tả" />
                  </td>
                  <td className={cx('tdDescription')}>{product.description}</td>
                  <td>{product.priceOld}</td>
                  <td>{product.price}</td>
                  <td>
                    <Button
                      primary
                      onClick={() => {
                        handleEdit(product);
                      }}
                    >
                      Sửa
                    </Button>
                    <Button
                      error
                      onClick={() => {
                        handleDelete(product);
                      }}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </>
    );
  }

  return (
    <>
      <Admin>{body}</Admin>
    </>
  );
}

export default Product;
