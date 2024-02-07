import React, { useEffect, useRef, useState } from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import BasicCard from "../../Components/Card";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, where, query } from "firebase/firestore";
import { db } from "../../Confiq/router-config/config-firebase/firebaseConfig";
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../Confiq/router-config/config-firebase/firebaseConfig';

const Home = () => {
  const [todo, setTodo] = useState([]);
  const [user, setUser] = useState(null);
  const todoInputRef = useRef();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const getDataFromFirestore = async (uid) => {
          const q = query(collection(db, 'todo'), where('uid', '==', uid));
          const querySnapshot = await getDocs(q);
      
          const newData = querySnapshot.docs.map((doc) => ({
            docId: doc.id,
            ...doc.data(),
          }));
      
          setTodo(newData);
        };
        getDataFromFirestore(user.uid);
      } else {
        setUser(null);
        setTodo([]); // Reset the todo list when the user logs out
      }
    });

    return () => unsubscribe();
  }, []);



  const addTodo = async (e) => {
    e.preventDefault();
    const newTodo = todoInputRef.current.value;
    try {
      const docRef = await addDoc(collection(db, 'todo'), {
        todo: newTodo,
        uid: user.uid, // Include the user's UID
      });
      setTodo([...todo, { todo: newTodo, docId: docRef.id, uid: user.uid }]);
      todoInputRef.current.value = '';
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  async function editTodo(index, editedTodoVal) {
    const updatedTodo = doc(db, "todo", todo[index].docId);
    try {
      await updateDoc(updatedTodo, {
        todo: editedTodoVal
      });
  
      setTodo((prevTodo) => {
        const updatedTodoList = [...prevTodo];
        updatedTodoList[index] = { ...updatedTodoList[index], todo: editedTodoVal };
        return updatedTodoList;
      });
    } catch (err) {
      console.log(err);
    }
  }
  

  const deleteTodo = async (index) => {
    console.log('todo deleted', index);
    await deleteDoc(doc(db, "todo", todo[index].docId));
    setTodo((prevTodo) => {
      const updatedTodoList = [...prevTodo];
      updatedTodoList.splice(index, 1);
      return updatedTodoList;
    });
  };

  return (
    <Box className='d-flex justify-content-center flex-column align-items-center gap-5'>
      <form onSubmit={addTodo} className='d-flex justify-content-center mt-5 flex-column w-25 gap-3'>
        <TextField id="filled-basic" label="Todo" variant="filled" inputRef={todoInputRef} required min={6} />
        <Button variant="contained" type='submit'>Add Todo</Button>
      </form>

      <Box>
        {todo.length > 0 ? (
          todo.map((item, index) => (
            <BasicCard key={index} title={item.todo} editTodo={(editedTodoVal) => editTodo(index, editedTodoVal)} deleteTodo={() => deleteTodo(index)} index={index} />
          ))
        ) : (
          <Typography variant="h5" color="textSecondary">No Todo Here</Typography>
        )}
      </Box>
    </Box>
  );
}

export default Home;