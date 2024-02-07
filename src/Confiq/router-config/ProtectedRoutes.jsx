import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './config-firebase/firebaseConfig';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';



const ProtectedRoutes = ({ component }) => {
    //navigate user
    const navigate = useNavigate();
    //state
    const [isUser, setIsUser] = useState(false);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/login')
                return
            }
            setIsUser(true)

        })
    }, [])
    return (
        isUser ?
            component : <Typography variant="h3" color="initial">Loading...</Typography>
    )
}

export default ProtectedRoutes