import React, { useEffect, useState } from "react";
import styles from "./EditStudentsClub.module.sass";
import projectLogo from "../../assets/project-logo.svg";
import Input from "../../components/Input/Input";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import animalsImage from "../../assets/animals.png";
import Avatar from "../../components/Avatar/Avatar";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { universitiesOptions } from "../../constants/options";
import selectStyles from "../../constants/selectStyles";

const userAPI = `${import.meta.env.VITE_SERVER_URL}/api/users/profile/`;

const EditStudentsClub = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [userID, setUserID] = useState(0);
  const [imageSrc, setImageSrc] = useState(null);
  const userToken = JSON.parse(localStorage.getItem("userInfo")).token;
  const config = { headers: { Authorization: `Bearer ${userToken}` } };

  const projectID = location.pathname.split("/").pop();
  const src = `${
    import.meta.env.VITE_SERVER_URL
  }/api/students_clubs/${projectID}/update/`;

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

  const [inputErrors, setInputErrors] = useState({
    title: "",
    type: "",
    description: "",
    contact: "",
  });

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_SERVER_URL + "/api/students_clubs/" + projectID)
      .then((response) => {
        setTitle(response.data.title);
        const testArray = [];
        testArray.push({
          value: response.data.related_by_uni,
          label: response.data.related_by_uni,
        });
        setType(testArray);
        setDescription(response.data.description);
        setContact(response.data.contact);
        setImageSrc(response.data.image_src);
      })
      .catch((error) => {
        console.log("Failed fetching", error);
      });
  }, [projectID]);

  const validateForm = () => {
    const errors = {};

    if (!title) {
      errors.title = "Введите название проекта";
    }

    if (!type) {
      errors.type = "Выберите тип проекта";
    }

    if (!description) {
      errors.description = "Введите описание проекта";
    }

    if (!contact) {
      errors.contact = "Введите контактные данные";
    }

    setInputErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("related_by_uni", type.value || type[0].value);
      //formData.append("contact", contact);
      formData.append("author_id", userID);
      formData.append("image_src", imageSrc);
      formData.append("members", "");
      axios
        .put(src, formData)
        .then(function (response) {
          navigate(
            `/students-club/${response.data.students_club_id}`,
            response.data
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.header__title}>Изменить студенческого клуба</h2>
        </div>
        <p className={styles.subheader}>
          Создайте собственный студенческий клуб и найдите единомышленников
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.form__header}>
            <Avatar imageSrc={imageSrc} setImageSrc={setImageSrc} />
            <div className={styles.form__header__inputs}>
              <div className={styles.input__wrapper}>
                <Input
                  placeholder="Название клуба"
                  type="text"
                  name="text"
                  id="clubName"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  maxlength="100"
                  error={inputErrors.title}
                />
              </div>

              <div className={styles.input__wrapper}>
                <Select
                  isSearchable
                  noOptionsMessage={() => "Университет не найден :("}
                  placeholder="Университет"
                  options={universitiesOptions}
                  styles={selectStyles}
                  value={type}
                  onChange={(value) => {
                    setType(value);
                  }}
                />
              </div>
            </div>
          </div>
          <textarea
            className={styles.textarea}
            placeholder="Описание"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            maxLength="800"
          />
          {inputErrors.description && (
            <p className={styles.input__error}>{inputErrors.description}</p>
          )}
          <div className={styles.form__contacts}>
            <p className={styles.contacts__header}>Контакты</p>
            <div className={styles.contacts__info}>
              <img className={styles.contacts__image} src={animalsImage} />
              <div className={styles.contacts__actions}>
                <div className={styles.input__wrapper}>
                  <Input
                    placeholder="Впиши любой контакт"
                    type="text"
                    name="text"
                    id="clubContact"
                    value={contact}
                    onChange={(event) => setContact(event.target.value)}
                    maxlength="100"
                    error={inputErrors.contact}
                  />
                </div>
                <button className={styles.form__button} type="submit">
                  Обновить
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditStudentsClub;
