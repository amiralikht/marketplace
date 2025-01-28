import api from "../configs/api";

const getProfile = () => api.get("/user/whoami").then((res)=> res || false);

const getUserPost = () => api.get("/post/my");

const deleteUserPost = (id) => api.delete(`/post/delete/${id}`);

const getAllPosts = () => api.get("");

const getPost = (id) => api.get(`/post/${id}`);


export {getProfile, getUserPost, deleteUserPost, getAllPosts, getPost}