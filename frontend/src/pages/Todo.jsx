// import React from 'react'
import {
  Button,
  Card,
  Form,
  Input,
  notification,
  Divider,
  Checkbox,
} from "antd";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import Img from "../component/Img";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../component/Header";
import ModalForm from "../component/ModalForm";
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
const Todo = () => {
  const [showtodos, setShowTodos] = useState([]);

  const [dragTodo, setDragTodo] = useState([]);
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const user = useSelector((val) => val.login.value);
  // filtering todos
  const completedTodos = useMemo(
    () => showtodos?.filter((todos) => todos.isChecked === true),
    [showtodos]
  );
  const unFinishedTodos = useMemo(
    () => showtodos?.filter((todos) => todos.isChecked === false),
    [showtodos]
  );

  useEffect(() => {
    const upTodo = [...demoTodo];
    upTodo[0].tasks = unFinishedTodos;
    setDragTodo(upTodo);
  }, [unFinishedTodos]);

  // console.log("drag:", dragTodo);
  // create todo
  const onFinish = async (values) => {
    await axios.post("http://localhost:8000/api/v1/todo", values);
    api.open({
      message: "Item submitted",
      duration: 0,
    });
    form.resetFields();
  };
  // update todo status
  const onChange = async (id, e) => {
    if (e.target.checked) {
      await axios.patch("http://localhost:8000/api/v1/todo", {
        id,
      });
      api.open({
        message: "todo updated",
        duration: 0,
      });
    }
  };
  // get todo
  useEffect(() => {
    async function getTodos() {
      const items = await axios.get("http://localhost:8000/api/v1/todo");
      setShowTodos(items?.data?.todos);
    }
    getTodos();
  }, []);

  // dete todo
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/api/v1/todo/${id}`);

    api.open({
      message: "todo deleted",
      duration: 0,
    });
  };

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
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Card
        style={{
          width: 650,
        }}
      >
        <Img />
        <p className="font-bold text-[#444] text-[20px] text-right">
          {user.userName}
        </p>

        <Header />
        <div>
          <Form
            form={form}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
            labelCol={{
              span: 15,
            }}
            layout="vertical"
            className="flex gap-5 items-center"
          >
            {contextHolder}
            <Form.Item
              label="Item"
              name="itemName"
              className="mb-0"
              rules={[
                {
                  required: true,
                  message: "Item required !",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Description"
              name="itemDetails"
              className="mb-0"
              rules={[
                {
                  required: true,
                  message: "Description required !",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              className="mb-0"
              wrapperCol={{
                offset: 15,
                span: 10,
              }}
            >
              <Button type="primary" htmlType="submit" className="mt-7">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>

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
                              <div
                                className="item-checkbox"
                                key={component._id}
                              >
                                <div className="flex gap-4 items-center justify-between">
                                  <div className="flex gap-4">
                                    <Checkbox
                                      onChange={(e) =>
                                        onChange(component._id, e)
                                      }
                                    ></Checkbox>
                                    <div>
                                      <h2 className="font-bold text-[15px]">
                                        {component.itemName}
                                      </h2>
                                      <p>{component.itemDetails}</p>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <MdDelete
                                      onClick={() =>
                                        handleDelete(component._id)
                                      }
                                      className="text-[25px] ml-auto text-[#f07272] cursor-pointer"
                                    />
                                    <ModalForm
                                      editId={component._id}
                                      editItemName={component.itemName}
                                      editItemDetails={component.itemDetails}
                                    />
                                  </div>
                                </div>
                                <Divider className="my-[10px]" />
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

        <div className="show-completed-todo">
          <h2 className="font-bold text-[29px] text-center mt-10 mb-4">
            Completed Task
          </h2>
          {completedTodos.map((doneTodos) => (
            <div className="item-checkbox" key={doneTodos._id}>
              <div className="flex gap-4 items-center">
                <Checkbox
                  disabled
                  checked={doneTodos.isChecked}
                  // onChange={() => onChange()}
                ></Checkbox>
                <div>
                  <del className="font-bold text-[15px]">
                    {doneTodos.itemName}
                  </del>
                  <br />
                  <del>{doneTodos.itemDetails}</del>
                </div>
                <MdDelete
                  onClick={() => handleDelete(doneTodos._id)}
                  className="text-[25px] ml-auto text-[#f07272] cursor-pointer"
                />
              </div>
              <Divider className="my-[10px]" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Todo;
// {unFinishedTodos?.map((todo) => (
//   <div className="item-checkbox" key={todo._id}>
//     <div className="flex gap-4 items-center justify-between">
//       <div className="flex gap-4">
//         <Checkbox
//           onChange={(e) => onChange(todo._id, e)}
//         ></Checkbox>
//         <div>
//           <h2 className="font-bold text-[15px]">{todo.itemName}</h2>
//           <p>{todo.itemDetails}</p>
//         </div>
//       </div>
//       <div className="flex gap-2">
//         <MdDelete
//           onClick={() => handleDelete(todo._id)}
//           className="text-[25px] ml-auto text-[#f07272] cursor-pointer"
//         />
//         <ModalForm
//           editId={todo._id}
//           editItemName={todo.itemName}
//           editItemDetails={todo.itemDetails}
//         />
//       </div>
//     </div>
//     <Divider className="my-[10px]" />
//   </div>
// ))}
