import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import styles from "./Users.module.sass";
import Input from "../../components/Input/Input.jsx";
import searchIcon from "../../assets/search-icon.svg";
import UserCard from "../../components/UserCard/UserCard.jsx";
import axios from "axios";

// const src = "https://raw.githubusercontent.com/daniyarorazov/sampleDataJson/main/sampleUsers.json"
const src = "http://127.0.0.1:8000/api/users/"

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(src)
        setUsers(response.data)
      } catch {
        console.error("Error fetching users:", users)
      }
    }
    getUsers()
  }, [])
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2 className={styles.header__title}>Пользователи</h2>
          <Input
            className={styles.header__input}
            type="text"
            placeholder="Поиск..."
            withIcon={true}
            imageSrc={searchIcon}
          />
        </div>
        {users.map(user => <UserCard key={user.id} userId={user.id} name={user.name} />)}
      </div>
    </div>
  );
};

export default Users;
