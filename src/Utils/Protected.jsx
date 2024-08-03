import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

export default function Protected({children}) {
    const {user}=useAuth();
    if(!user)
        return <Navigate to="/"/>
  return children
}
