import React, { useEffect, useState } from "react";
import styles from "./EditPost.module.sass";
import projectLogo from "../../assets/project-logo.svg";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const postsAPI = "http://127.0.0.1:8000/api/posts/";

const EditPost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const postID = location.pathname.split("/").pop();
  const src = `http://127.0.0.1:8000/api/posts/${postID}/update/`;
  const [authorName, setAuthorName] = useState();
  const [authorID, setAuthorID] = useState();

  const [content, setContent] = useState("");

  useEffect(() => {
    axios
      .get(postsAPI + postID)
      .then((data) => {
        setContent(data.data.content);
        setAuthorName(data.data.author_name);
        setAuthorID(data.data.author_id);
      })
      .catch((error) => {
        console.log("Failed fetching", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/profile");
    axios
      .put(src, {
        content: content,
        author_name: authorName,
        author_id: authorID,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <img
            className={styles.header__logo}
            src={projectLogo}
            alt="qosyl.me"
          />
          <h2 className={styles.header__title}>Изменение поста</h2>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <textarea
            className={styles.textarea}
            placeholder="Описание"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
          <button className={styles.form__button} type="submit">
            Изменить
          </button>
        </form>
      </div>
    </>
  );
};

export default EditPost;
