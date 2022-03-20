
import { v4 as uuidv4 } from 'uuid';

const initialState = [
    {
        title: "Backlog",
        id: '1',
        tasks: [
            {
                id: '5',
                text: "Hero section to be improved based on the new feedback"
            },
            {
                id: '6',
                text: "Add one more type of chart to the left hand"
            }
        ]
    },
    {
        title: "Work in progress",
        id: '2',
        tasks: [
            {
                id: '7',
                text: "Copywriting review for all copies inside app"
            },
            {
                id: '8',
                text: "Improve colors to have a better contrast"
            },
        ]
    },
    {
        title: "In Review",
        id: '3',
        tasks: [
            {
                id: '9',
                text: "Update the newest ios build"
            },

        ]
    },
    {
        title: "Finished",
        id: '4',
        tasks: [
            {
                id: '10',
                text: "Find new ways to make it minimal and look clean"
            },

        ]
    }
];

const listsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_LIST':
            const newList = {
                title: action.payload,
                tasks: [],
                id: uuidv4()
            };

            return [...state, newList];

        case 'ADD_TASK': {
            const newTask = {
                text: action.payload.text,
                id: uuidv4()
            };

            const updatedLists = state.map(list => {
                if (list.id === action.payload.listID) {
                    return {
                        ...list,
                        tasks: [...list.tasks, newTask]
                    };
                } else {
                    return list;
                }
            });

            return updatedLists;
        }

        case 'DRAG_HAPPENED':
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexEnd,
                droppableIndexStart,
                type
            } = action.payload;
            let newState = [...state];

            if (type === "list") {
                const list = newState.splice(droppableIndexStart, 1);
                newState.splice(droppableIndexEnd, 0, ...list);
                return newState;
            }

            if (droppableIdStart === droppableIdEnd) {
                const list = state.find(list => droppableIdStart === list.id);
                const task = list.tasks.splice(droppableIndexStart, 1);
                list.tasks.splice(droppableIndexEnd, 0, ...task);
            }

            if (droppableIdStart !== droppableIdEnd) {
                const listStart = state.find(list => droppableIdStart === list.id);
                const task = listStart.tasks.splice(droppableIndexStart, 1);
                const listEnd = state.find(list => droppableIdEnd === list.id);

                listEnd.tasks.splice(droppableIndexEnd, 0, ...task);
            }

            return newState;

        case 'DELETE_LIST': {
            const { listID } = action.payload;
            return state.filter(list => list.id !== listID);
        }

        case 'DELETE_TASK': {
            const { id, listID } = action.payload;
            return state.map(list => {
                if (list.id === listID) {
                    const newTasks = list.tasks.filter(task => task.id !== id);
                    return { ...list, tasks: newTasks };
                } else {
                    return list;
                }
            });
        }

        case 'EDIT_LIST_TITLE': {
            const { listID, newListTitle } = action.payload;
            return state.map(list => {
                if (list.id === listID) {
                    list.title = newListTitle;
                    return list;
                } else {
                    return list;
                }
            });
        }

        default:
            return state;
    }
};

export default listsReducer;