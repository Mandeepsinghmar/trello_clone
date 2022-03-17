import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Button, TextField } from "@mui/material";

import { addList, addTask } from "../store/actions/listsActions";

const Create = (props) => {
    const { list, listID } = props;
    const [text, setText] = useState('');
    const [formOpen, setFormOpen] = useState(false);

    const dispatch = useDispatch()

    const openForm = () => {
        setFormOpen(true)
    };

    const closeForm = () => {
        setFormOpen(false)
    };

    const handleInputChange = e => {
        setText(e.target.value)
    };

    const handleAddList = () => {
        if (text) {
            setText('')
            dispatch(addList(text));
        }
    };

    const handleAddTask = () => {

        if (text) {
            setText('')
            dispatch(addTask(listID, text));
        }
    };

    const placeholder = list
        ? "Add list title"
        : "Add task text";

    return formOpen ? (
        <Box
            text={text}
            onChange={handleInputChange}
            closeForm={closeForm}
            sx={{ mt: 2, width: '300px' }}
        >
            <TextField
                sx={{ width: '300px', borderColor: 'transparent' }}
                placeholder={placeholder}
                autoFocus
                value={text}
                onChange={e => handleInputChange(e)}
                onBlur={closeForm}
            />
            <Box sx={{ display: 'flex', mt: 2, gap: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Button sx={{ width: '70%', color: '#2961e4', backgroundColor: '#e4ecf7', padding: ' 12px', lineHeight: '1.4' }} onMouseDown={list ? handleAddList : handleAddTask}>
                    {list ? "Add List" : "Add Task"}
                </Button>
                <Button>
                    <CancelIcon onMouseDown={closeForm} />
                </Button>
            </Box>
        </Box>
    ) : (
        <Box>
            <Button sx={{ mt: 2, width: '300px', color: '#2961e4', backgroundColor: '#e4ecf7', padding: '2px 12px', lineHeight: '1.4' }} onClick={openForm}>
                <p style={{ flexShrink: 0 }}>{list ? "Add another list" : "Add another task"}</p>
            </Button>
        </Box>

    );
}


export default Create;