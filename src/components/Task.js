import React from "react";
import { Typography, Card, CardContent, Button } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import BackspaceIcon from '@mui/icons-material/Backspace';


const Task = ({ text, id, listID, index }) => {

    return (
        <Draggable draggableId={String(id)} index={index}>
            {provided => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Card sx={{ width: '300px', display: 'flex', justifyContent: 'space-between', mt: 2, borderRadius: '10px', boxShadow: 'none', }}>
                        <CardContent>
                            <Typography variant='h6' sx={{ fontSize: '16px', }}>{text}</Typography>
                        </CardContent>
                        <Button>
                            <BackspaceIcon />
                        </Button>
                    </Card>
                </div>
            )}
        </Draggable>
    )
}

export default Task;