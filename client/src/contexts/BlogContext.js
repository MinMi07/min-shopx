import { createContext, useReducer, useState } from 'react';
import { blogReducer } from '../reducers/blogReducer';
import {
  apiUrl,
  BLOGS_LOADED_SUCCESS,
  BLOGS_LOADED_FAIL,
  ADD_BLOG,
  DELETE_BLOG,
  UPDATE_BLOG,
  FIND_BLOG,
} from './constaints';
import axios from 'axios';

export const BlogContext = createContext();

const BlogContextProvider = ({ children }) => {
  // State
  const [blogState, dispatch] = useReducer(blogReducer, {
    blog: null,
    blogs: [],
    blogsLoading: true,
  });

  const [showAddBlogModal, setShowAddBlogModal] = useState(false);
  const [showUpdateBlogModal, setShowUpdateBlogModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: '',
    type: null,
  });

  // Get all Blogs
  const getBlogs = async () => {
    try {
      const response = await axios.get(`${apiUrl}/admin/blog`);
      if (response.data.success) {
        dispatch({ type: BLOGS_LOADED_SUCCESS, payload: response.data.blog });
      }
    } catch (error) {
      dispatch({ type: BLOGS_LOADED_FAIL });
    }
  };

  // Add Blog
  const addBlog = async (newBlog) => {
    console.log(newBlog);
    try {
      const response = await axios.post(`${apiUrl}/admin/blog/add`, newBlog);
      if (response.data.success) {
        dispatch({ type: ADD_BLOG, payload: response.data.blog });
        return response.data;
      }
    } catch (error) {
      return error.response.data ? error.response.data : { success: false, message: 'Server error' };
    }
  };

  // Delete blog
  const deleteBlog = async (blogId) => {
    try {
      const response = await axios.delete(`${apiUrl}/admin/blog/${blogId}`);
      if (response.data.success) {
        dispatch({ type: DELETE_BLOG, payload: blogId });
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Find blog when user is updating blog
  const findBlog = (blogId) => {
    const blog = blogState.blogs.find((blog) => blog._id === blogId);
    dispatch({ type: FIND_BLOG, payload: blog });
  };

  // Update blog
  const updateBlog = async (updatedBlog) => {
    try {
      const response = await axios.put(`${apiUrl}/admin/blog/${updatedBlog._id}`, updatedBlog);
      if (response.data.success) {
        dispatch({ type: UPDATE_BLOG, payload: response.data.blog });
        return response.data;
      }
    } catch (error) {
      return error.response.data ? error.response.data : { success: false, message: 'Server error' };
    }
  };

  // blog context data
  const blogContextData = {
    blogState,
    getBlogs,
    showAddBlogModal,
    setShowAddBlogModal,
    showUpdateBlogModal,
    setShowUpdateBlogModal,
    addBlog,
    showToast,
    setShowToast,
    deleteBlog,
    findBlog,
    updateBlog,
  };

  return <BlogContext.Provider value={blogContextData}>{children}</BlogContext.Provider>;
};

export default BlogContextProvider;
