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
