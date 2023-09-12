import React from 'react'
import styles from "./Navbar.module.css"
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signout } from '../../api/internal'
import { resetUser } from '../../store/userSlice'

export default function Navbar() {
  const dispatch = useDispatch();
  const isAutenticated = useSelector((state) => state.user.auth)
const handlelogout=async()=>{
  await signout()
  dispatch(resetUser())
}
  return (
    <>
      <nav className={`${styles.navbar}`}>
        <NavLink
          to="/"
          className={`${styles.logo} ${styles.inActiveStyle}`}>CoinBounce</NavLink>
        <NavLink to="/" className={({ isActive }) => isActive ? styles.activeStyle : styles.inActiveStyle}>Home</NavLink>
        <NavLink to="/crypto" className={({ isActive }) => isActive ? styles.activeStyle : styles.inActiveStyle}>Cryptocurrencies</NavLink>
        <NavLink to="/blogs" className={({ isActive }) => isActive ? styles.activeStyle : styles.inActiveStyle}>Blogs</NavLink>
        <NavLink to="/submit" className={({ isActive }) => isActive ? styles.activeStyle : styles.inActiveStyle}>Submit a blog</NavLink>

        {!isAutenticated ? <>

          <NavLink to="/signup" className={({ isActive }) => isActive ? styles.activeStyle : styles.inActiveStyle}>
            <button className={styles.signUpButton}>Sign up</button>
          </NavLink>
          <NavLink to="/login" className={({ isActive }) => isActive ? styles.activeStyle : styles.inActiveStyle}>
            <button className={styles.logInButton}>Log in</button>
          </NavLink>
        </> : <button className={styles.signOutButton} onClick={handlelogout}> Logout</button>}


      </nav>
    </>
  )
}
  