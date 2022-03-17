import React from "react";
import BackspaceIcon from '@mui/icons-material/Backspace';
import { Box, Button, Typography } from "@mui/material";
import { Droppable, Draggable } from "react-beautiful-dnd";

import Create from "./Create";
import Task from './Task'

const List = ({ title, tasks, listID, index }) => {

    return (
        <Draggable draggableId={String(listID)} index={index}>
            {provided => (
                <Box
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    sx={{ backgroundColor: '#fff', padding: '10px', height: '100%' }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant='h6' sx={{ mb: 2 }}>{title}</Typography>
                        <Button>
                            <BackspaceIcon />
                        </Button>
                    </Box>
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