import React, { useEffect, useState } from "react";
import styles from "./CreateComment.module.sass";
import projectLogo from "../../assets/project-logo.svg";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
//  import { randomUUID } from "crypto";
import { v4 as uuidv4 } from 'uuid';

const userAPI = `${import.meta.env.VITE_SERVER_URL}/api/users/profile/`;

const CreateComment = () => {
  const location = useLocation();
  const postsAPI = `${import.meta.env.VITE_SERVER_URL}/api/posts/`
  const postID = location.pathname.split("/")[2]
  const postUpdate = `${import.meta.env.VITE_SERVER_URL}/api/posts/${postID}/update/`;
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [userID, setUserID] = useState(0);
  const [post, setPost] = useState({});

  const userToken = JSON.parse(localStorage.getItem("userInfo")).token;
  const config = { headers: { Authorization: `Bearer ${userToken}` } };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(userAPI, config);
        setUserID(response.data.user_id);
      } catch (error) { 
        console.log("Failed fetching", error);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const getPost= async () => {
      try {
        const response = await axios.get(postsAPI + postID);
        setPost(response.data)
      } catch (error) { 
        console.log("Failed fetching", error);
      }
    };
    getPost();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    navigate(`/post/${postID}/comments`);
    const updatedPost = {...post, comments: [...post.comments, {
        comment_id: uuidv4(),
        author_id: userID,
        message: message
    }]}
    console.log(updatedPost)
    axios
      .put(postUpdate,updatedPost)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
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
          <h2 className={styles.header__title}>Создание комментария</h2>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <textarea
            className={styles.textarea}
            placeholder="Описание комментария"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <button className={styles.form__button} type="submit">
            Добавить
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateComment;