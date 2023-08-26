import React, {useEffect, useState} from "react";
import styles from "./SignInUp.module.sass";
import {Link, useNavigate} from "react-router-dom";
import projectLogo from "../../assets/project-logo.svg";
import Input from "../../components/Input/Input";
import {useCurrentUserData} from "../../actions/getCurrentUserData.js";

const SignUp = () => {



    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading2, setLoading2] = useState(true);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: username,
        email: email,
        password: password,
    });

    const {userID} = useCurrentUserData();

    useEffect(() => {
        if (userID) {
            navigate("/profile");
            setLoading2(false)
        }
    }, [navigate, userID]);

const handleSubmit = async (e) => {
    e.preventDefault();

    formData.username = formData.username.trim();
    formData.email = formData.username.trim();
    formData.password = formData.username.trim();

    console.log(username)

    const response = await fetch('http://127.0.0.1:8000/auth/users/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username: username,
            email: email,
            password: password,}),
    });

    if (response.ok) {
        alert('Nice')
    } else {
        alert('Bad')
        console.log(JSON.stringify({username: username,
            email: email,
            password: password,}))
    }
};
    loading2 && setTimeout(() => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <img className={styles.header__logo} src={projectLogo} alt="qosyl.me" />
        <h2 className={styles.header__title}>Регистрация</h2>
      </div>

      <form action="#" className={styles.form} onSubmit={handleSubmit}>
        <Input placeholder="Имя" type="text" id="signUpFormFirstName" name="username" value={username} onChange={(e) => setUsername(e.target.value)}  />
        <Input placeholder="Email" type="text" id="signUpFormEmail" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Пароль" type="password" id="signUpFormPassword" name="password" value={password} onChange={(e) => setPassword(e.target.value)}  />
        <Input placeholder="Подтвердить пароль" type="password" id="signUpFormCofirmPassword" name="confirm_password"/>
        <button className={styles.form__button} type="submit">
          Регистрация
        </button>
        <Link className={styles.form__link} to="/">
          Войти в аккаунт
        </Link>
      </form>
    </div>
  );
}, 1000);
};

export default SignUp;
