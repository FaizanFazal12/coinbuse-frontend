import React from 'react'
import { Navigate } from 'react-router-dom'

export default function Protected({ isAuth, children }) {
    return (

        <div >
 
 {isAuth ? children : <Navigate to="/login"/>}
        </div>

    )
}
