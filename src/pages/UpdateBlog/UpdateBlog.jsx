import { useEffect, useState } from "react";
import { updateBlog,getBlogbyId } from "../../api/internal";
import { useSelector } from "react-redux";
import styles from "./UpdateBlog.module.css";
import TextInput from "../../Component/TextInput/TextInput";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateBlog() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate()
  const params = useParams();
  const blogId = params.id;
  const author = useSelector((state) => state.user._id);
  const getPhoto = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
  };
  const UpdateHandler = async () => {
    let data;
    if (photo.includes("http")) {
      data = {
        author,
        title,
        content,
        blogId,
      };
    } else {
      data = {
        author,
        title,
        content,
        photo,
        blogId,
      };
    }

    const response = await updateBlog(data);

    if (response.status === 200) {
      navigate("/");
    }
  };
  useEffect(() => {
    async function getBlogDetails() {
      const response = await getBlogbyId(blogId);
      if (response.status === 200) {
        setTitle(response.data.blog.title);
        setContent(response.data.blog.content);
        setPhoto(response.data.blog.photo);
      }
    }
    getBlogDetails();
  }, []);


  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Update a blog!</div>
      <TextInput
        type="text"
        name="title"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "60%" }}
      />
      <textarea
        className={styles.content}
        placeholder="your content goes here..."
        maxLength={400}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className={styles.photoPrompt}>
        <p>Choose a photo</p>
        <input
          type="file"
          name="photo"
          id="photo"
          accept="image/jpg, image/jpeg, image/png"
          onChange={getPhoto}
        />
        <img src={photo} width={150} height={150} />

      </div>
      <button
        className={styles.submit}
        onClick={UpdateHandler}

      >
        Edit
      </button>
    </div>
  )
}
