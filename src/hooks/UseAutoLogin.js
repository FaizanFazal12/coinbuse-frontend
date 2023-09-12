import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice"

export default function UseAutoLogin() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  useEffect(() => {
    //IIFF

    (async function autoLogin() {
      const response = await axios.get(`${process.env.REACT_APP_INTERNAL_SERVER}/refresh`,{
        withCredentials:true
      });
      try {
        if (response.status === 200) {
          // 1. setUser
          const user = {
            _id: response.data.user._id,
            email: response.data.user.email,
            username: response.data.user.username,
            auth: response.data.auth,
          };

          dispatch(setUser(user));

        }
      } catch (error) {

      }
      finally {
        setLoading(false)
      }
    })();
  }, [])

  return loading
}
