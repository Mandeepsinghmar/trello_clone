
import { v4 as uuidv4 } from 'uuid';

const initialState = [
    {
        title: "Backlog",
        id: 1,
        tasks: [
            {
                id: 5,
                text: "Hero section to be improved based on the new feedback"
            },
            {
                id: 6,
                text: "Add one more type of chart to the left hand"
            }
        ]
    },
    {
        title: "Work in progress",
        id: 2,
        tasks: [
            {
                id: 6,
                text: "Copywriting review for all copies inside app"
            },
            {
                id: 7,
                text: "Improve colors to have a better contrast"
            },
        ]
    },
    {
        title: "In Review",
        id: 3,
        tasks: [
            {
                id: 8,
                text: "Update the newest ios build"
            },

        ]
    },
    {
        title: "Finished",
        id: 4,
        tasks: [
            {
                id: 9,
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

        default:
            return state;
    }
};

export default listsReducer;