export const addList = title => {
    return {
        type: 'ADD_LIST',
        payload: title
    };
};

export const addTask = (listID, text) => {
    return {
        type: 'ADD_TASK',
        payload: { text, listID }
    };
};

export const sort = (
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId,
    type
) => {
    return {
        type: 'DRAG_HAPPENED',
        payload: {
            droppableIdStart,
            droppableIdEnd,
            droppableIndexEnd,
            droppableIndexStart,
            draggableId,
            type
        }
    };
};

export const deleteTask = (id, listID) => {
    return {
        type: 'DELETE_TASK',
        payload: { id, listID }
    };
};

export const deleteList = listID => {
    return {
        type: 'DELETE_LIST',
        payload: {
            listID
        }
    };
};