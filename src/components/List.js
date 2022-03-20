import React, { useState } from "react";
import BackspaceIcon from '@mui/icons-material/Backspace';
import { Box, Button, TextField, Typography } from "@mui/material";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';

import Create from "./Create";
import Task from './Task'
import { deleteList, editTitle } from "../store/actions/listsActions";

const List = ({ title, tasks, listID, index }) => {
    const [editingList, setEditingList] = useState(false);
    const [listTitle, setListTitle] = useState(title)
    const dispatch = useDispatch()

    const handleDeleteList = () => {
        dispatch(deleteList(listID));
    };

    const handleChange = e => {
        e.preventDefault();
        setListTitle(e.target.value);
    };

    const handleFinishEditing = () => {
        setEditingList(false);
        dispatch(editTitle(listID, listTitle));
    };
    return (
        <Draggable draggableId={String(listID)} index={index}>
            {provided => (
                <Box
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    sx={{ backgroundColor: '#fff', padding: '10px', height: '100%' }}
                >
                    {
                        editingList ? (
                            <form onSubmit={handleFinishEditing}>
                                <TextField
                                    sx={{ width: '300px', borderColor: 'transparent' }}
                                    type="text"
                                    value={listTitle}
                                    onChange={handleChange}
                                    autoFocus
                                    onBlur={handleFinishEditing}
                                />
                            </form>
                        ) : (
                            <Box onClick={() => setEditingList(true)} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant='h6' sx={{ mb: 2 }}>{listTitle}</Typography>
                                <Box>
                                    <Button onClick={handleDeleteList}>
                                        <BackspaceIcon />
                                    </Button>
                                    <Button onClick={() => setEditingList(true)}>
                                        <EditIcon />
                                    </Button>
                                </Box>
                            </Box>
                        )
                    }

                    <Droppable droppableId={String(listID)} type="task">
                        {provided => (
                            <Box sx={{ backgroundColor: '#f3f4f9', p: 2, borderRadius: '10px' }} {...provided.droppableProps} ref={provided.innerRef}>
                                {tasks.map((task, index) => (
                                    <Task
                                        key={task.id}
                                        text={task.text}
                                        id={task.id}
                                        index={index}
                                        listID={listID}
                                    />
                                ))}
                                {provided.placeholder}
                                <Create listID={listID} />
                            </Box>
                        )}
                    </Droppable>
                </Box>
            )}
        </Draggable>
    );
};
export default List;