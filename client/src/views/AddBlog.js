import { apiUrl } from '~/contexts/constaints';

import { BlogContext } from '~/contexts/BlogContext';
import { useContext, useState } from 'react';
import Alert from '~/components/Alert';
import Admin from '../views/Admin';
import classNames from 'classnames/bind';
import styles from '~/components/FormInputAdmin/FormInputAdmin.module.scss';

const cx = classNames.bind(styles);
function AddBlog() {
  // Contexts
  const { addBlog } = useContext(BlogContext);

  // State
  const [newBlog, setNewBlog] = useState({
    id: '',
    title: '',
    image: '',
    description: '',
  });

  const [alert, setAlert] = useState(null);
  const { id, title, image, description } = newBlog;

  const onChangeNewBlogForm = (event, type) => {
    if (type == 'image') setNewBlog({ ...newBlog, [event.target.name]: event.target.files[0] });
    else setNewBlog({ ...newBlog, [event.target.name]: event.target.value });
  };

  const resetAddBlogData = () => {
    setNewBlog({ id: '', title: '', image: '', description: '' });
    setAlert(null);
  };

  const handleSubmit = async () => {
    try {
      let formData = new FormData();
      formData.append('id', newBlog.id);
      formData.append('title', newBlog.title);
      formData.append('image', newBlog.image);
      formData.append('description', newBlog.description);

      const res = await fetch(`${apiUrl}/admin/blog/add`, {
        method: 'POST',
        body: formData,
      });

      setTimeout(() => {
        resetAddBlogData();
      }, 4000);

      setAlert({
        type: res.ok === true ? 'success' : 'error',
        message: res.ok === true ? 'Thêm thành công' : 'Thêm không thành công',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const body = (
    <>
      {alert != null && <Alert info={alert} />}
      {/* <form className={cx('wrapper')} onSubmit={onSubmit} encType="multipart/form-data"> */}
      <div className={cx('wrapper')} encType="multipart/form-data">
        <label htmlFor="title">
          <p>Mã blog</p>
          <input
            className={cx('input')}
            type="text"
            id="id"
            placeholder="Type blog id"
            name="id"
            value={id}
            onChange={(e) => {
              onChangeNewBlogForm(e, 'text');
            }}
          />
        </label>
        <label htmlFor="title">
          <p>Tiêu đề blog</p>
          <input
            className={cx('input')}
            type="text"
            id="title"
            placeholder="Type blog title"
            name="title"
            value={title}
            onChange={(e) => {
              onChangeNewBlogForm(e, 'text');
            }}
          />
        </label>
        <label htmlFor="image">
          <p>Ảnh blog</p>
          <input
            className={cx('input')}
            type="file"
            placeholder="Choose blog'image"
            name="image"
            accept="image/*"
            onChange={(e) => {
              onChangeNewBlogForm(e, 'image');
            }}
          />
        </label>
        <label htmlFor="description">
          <p>Mô tả blog</p>
          <textarea
            className={cx('input', 'description')}
            id="description"
            placeholder="Type blog'description"
            name="description"
            value={description}
            onChange={(e) => {
              onChangeNewBlogForm(e, 'text');
            }}
          ></textarea>
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

export default AddBlog;
