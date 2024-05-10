import axios from "axios";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
/// todo column
const demoTodo = [
  {
    id: 0,
    title: "Todo",
    tasks: [],
  },
  {
    id: 1,
    title: "In Progress",
    tasks: [],
  },
];
const ManageTodo = () => {
  const [dragTodo, setDragTodo] = useState([]);
  /// dnd
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId !== destination.droppableId) {
      const newData = [...JSON.parse(JSON.stringify(dragTodo))];
      const oldDroppableIndex = newData.findIndex(
        (x) => x.id == source.droppableId
      );
      const newDroppableIndex = newData.findIndex(
        (x) => x.id == destination.droppableId
      );
      const [item] = newData[oldDroppableIndex].tasks.splice(source.index, 1);
      newData[newDroppableIndex].tasks.splice(destination.index, 0, item);

      setDragTodo([...newData]);
      //local storage saving
      localStorage.setItem("dragData", JSON.stringify([...newData]));
    } else {
      const newData = [...JSON.parse(JSON.stringify(dragTodo))]; //shallow copy concept
      const droppableIndex = newData.findIndex(
        (x) => x.id == source.droppableId
      );
      const [item] = newData[droppableIndex].tasks.splice(source.index, 1);
      newData[droppableIndex].tasks.splice(destination.index, 0, item);
      setDragTodo([...newData]);
      //local storage saving
      localStorage.setItem("dragData", JSON.stringify([...newData]));
    }
  };
  //   useEffect(() => {
  //   const upTodo = [...demoTodo];
  //   upTodo[0].tasks = unFinishedTodos;
  //   setDragTodo(upTodo);
  //   }, [unFinishedTodos]);

  // get todo

  useEffect(() => {
    async function getTodos() {
      const items = await axios.get("http://localhost:8000/api/v1/todo");
      const upTodo = [...demoTodo];
      upTodo[0].tasks = items?.data?.todos;
      setDragTodo(upTodo);
    }
    getTodos();
  }, []);
  return (
    <div className="container mx-auto">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="show-all-todo mt-16"></div>
        <div className="w-[900px] mt-16 flex gap-4 my-20 flex-col lg:flex-row">
          {dragTodo?.map((val, index) => {
            return (
              <Droppable key={index} droppableId={`${val.id}`}>
                {(provided) => (
                  <div
                    className="p-5 lg:w-1/3 w-full bg-white  border-gray-400 border border-dashed"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <h2 className="text-center font-bold mb-6 text-black">
                      {val.title}
                    </h2>
                    {val?.tasks?.map((component, index) => (
                      <Draggable
                        key={component._id}
                        draggableId={`${val.id}-${component._id}`}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="bg-gray-200 mx-1 px-4 py-3 my-3"
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            <div className="item-checkbox" key={component._id}>
                              <div className="flex gap-4 items-center justify-between">
                                <div className="flex gap-4">
                                  <div>
                                    <h2 className="font-bold text-[15px]">
                                      {component.itemName}
                                    </h2>
                                    <p>{component.itemDetails}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default ManageTodo;
