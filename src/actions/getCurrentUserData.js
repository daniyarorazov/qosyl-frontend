import React, { useEffect, useState } from "react";
import axios from "axios";

export function useCurrentUserData() {
  const [userData, setUserData] = useState({ userID: 0 });

  const userToken = JSON.parse(localStorage.getItem("userInfo")).token;
  const config = { headers: { Authorization: `Bearer ${userToken}` } };
  const src = `${import.meta.env.VITE_SERVER_URL}/api/users/profile/`;

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(src, config);
        setUserData({ userID: response.data.user_id });
      } catch (error) {
        console.log("Failed fetching", error);
      }
    };
    getUser();
  }, []);

  return userData;
}
