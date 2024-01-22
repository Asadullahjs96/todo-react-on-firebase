import React, { useRef, useState } from 'react'
import { TextField, Button, Box, CircularProgress, Typography } from '@mui/material'
import {auth} from '../../Confiq/router-config/config-firebase/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
const Login = () => {

  // use state

  const [loading, setLoading] = useState(false);

  //get form value

  const email = useRef()
  const password = useRef()

    //navigate
    const navigate = useNavigate()

    //use context
    const {setIsUser} = useContext(UserContext);

  //Login function

  const login = (event) => {
    event.preventDefault();
    const registerEmail = email.current.value;
    const registerPassword = password.current.value;
    signInWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then((userCredential) => {
        setIsUser(true);
        navigate('/')

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    setLoading(!loading)

  }
  return (

    <>
      <Box sx={{ height: '80vh' }} className='d-flex justify-content-center aling-item-center' >
        <form onSubmit={login} className='d-flex justify-content-center flex-column w-25 gap-5'>
          <TextField type='email' id="standard-basic" label="Email" variant="standard" inputRef={email} required />
          <TextField type='password' id="standard-basic" label="Password" variant="standard" inputRef={password} required />
          <Button type='submit' variant="contained">{loading ? <CircularProgress sx={{ color: 'white' }} size={20} /> : 'Login'}</Button>
        </form>

      </Box>
    </>


  )
}

export default Login