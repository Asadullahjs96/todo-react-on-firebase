import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useRef } from 'react';

// BasicCard component

export default function BasicCard({ title, editTodo, deleteTodo, index }) {
  const [showTodo, setShowTodo] = useState(true);
  const editedValueRef = useRef('');

  const editedTodoFunc = () => {
    editTodo(editedValueRef.current.value);
    setShowTodo(true);
    // Clear the input field after editing
    // editedValueRef.current.value = '';
  };

  return (
    <Card sx={{ minWidth: 275 }} className='mt-2'>
      {showTodo ? (
        <div>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {title}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={deleteTodo}>
              Delete
            </Button>
            <Button size="small" onClick={() => setShowTodo(false)}>
              Edit
            </Button>
          </CardActions>
        </div>
      ) : (
        <div>
          <input type="text" placeholder='edited value' ref={editedValueRef} />
          <button onClick={editedTodoFunc}>Save</button>
        </div>
      )}
    </Card>
  );
}
