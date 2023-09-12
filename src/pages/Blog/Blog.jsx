import React,{useState,useEffect} from 'react'
import { getAllBlog } from '../../api/internal';
import Loader from "../../Component/loader/Loader";
import { useNavigate } from "react-router-dom";
import styles from "./Blog.module.css";
export default function Blog() {
const [blogs, setBlog] = useState([]);
const navigate = useNavigate();
useEffect(() => {
//invoked function
(async function getAllApiBlogs(){
  const response= await getAllBlog();
  console.log(response)
  if (response.status === 200) {
    setBlog(response.data.blogs);
  }
} ())
setBlog([])
}, [])

if(blogs.length===0){
  return <Loader text="Blog" />;
}

  return (
    <div className={styles.blogsWrapper}>
    {blogs.map((blog) => (
      <div
        key={blog._id}
        className={styles.blog}
        onClick={() => navigate(`/blog/${blog._id}`)}
      >
        <h1>{blog.title}</h1>
        <img src={blog.photo} />
        <p>{blog.content}</p>
      </div>
    ))}
  </div>
  )
}
