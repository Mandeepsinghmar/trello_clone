import React from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import List from "./components/List";
import Create from "./components/Create";

const App = () => {
  const lists = useSelector((state) => state.listsReducer);

  const onDragEnd = result => {
    const { destination } = result;

    if (!destination) {
      return;
    }
  }


  return (
    <Box sx={{ backgroundColor: '#f9ffff', minHeight: '90vh', }}>
      <Typography variant='h4' sx={{ textAlign: 'center', p: 4, }}>Trello</Typography>
      <Box sx={{ overflow: 'scroll' }}>
        <DragDropContext onDragEnd={onDragEnd} >
          <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {provided => (
              <Box
                sx={{ display: 'flex', gap: 3, m: 5 }}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {lists?.map((list, index) => (
                  <List
                    listID={list.id}
                    key={list.id}
                    title={list.title}
                    tasks={list.tasks}
                    index={index}
                  />
                ))}
                {provided.placeholder}
                <Create list />
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </Box>

    </Box>

  );

}

export default App;
