import React from 'react'
import { useAuth } from '../Context/AuthContext'
import { Navigate } from 'react-router-dom';

export default function Protected({children}) {
    const {user}=useAuth();
    if(!user)
        return <Navigate to="/internship"/>
  return children
}
