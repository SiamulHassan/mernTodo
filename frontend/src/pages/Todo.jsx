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
import { DragDropContext } from "react-beautiful-dnd";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import Img from "../component/Img";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../component/Header";
import ModalForm from "../component/ModalForm";

const Todo = () => {
  const [showtodos, setShowTodos] = useState([]);
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const user = useSelector((val) => val.login.value);
  // filtering todos
  const completedTodos = showtodos?.filter((todos) => todos.isChecked === true);
  const unFinishedTodos = showtodos?.filter(
    (todos) => todos.isChecked === false
  );
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
      const newData = [...JSON.parse(JSON.stringify(showtodos))];
      const oldDroppableIndex = newData.findIndex(
        (x) => x.id == source.droppableId
      );
      const newDroppableIndex = newData.findIndex(
        (x) => x.id == destination.droppableId
      );
      const [item] = newData[oldDroppableIndex].tasks.splice(source.index, 1);
      newData[newDroppableIndex].tasks.splice(destination.index, 0, item);

      showtodos([...newData]);
      //local storage saving
      localStorage.setItem("dragData", JSON.stringify([...newData]));
    } else {
      const newData = [...JSON.parse(JSON.stringify(showtodos))]; //shallow copy concept
      const droppableIndex = newData.findIndex(
        (x) => x.id == source.droppableId
      );
      const [item] = newData[droppableIndex].tasks.splice(source.index, 1);
      newData[droppableIndex].tasks.splice(destination.index, 0, item);
      showtodos([...newData]);
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
          <div className="show-all-todo mt-16">
            <h2 className="font-bold text-[15px]">In Progress</h2>
          </div>
          <div className="show-all-todo mt-16">
            <h2 className="font-bold text-[15px] mb-5">Todo</h2>
            {unFinishedTodos?.map((todo) => (
              <div className="item-checkbox" key={todo._id}>
                <div className="flex gap-4 items-center justify-between">
                  <div className="flex gap-4">
                    <Checkbox
                      onChange={(e) => onChange(todo._id, e)}
                    ></Checkbox>
                    <div>
                      <h2 className="font-bold text-[15px]">{todo.itemName}</h2>
                      <p>{todo.itemDetails}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <MdDelete
                      onClick={() => handleDelete(todo._id)}
                      className="text-[25px] ml-auto text-[#f07272] cursor-pointer"
                    />
                    <ModalForm
                      editId={todo._id}
                      editItemName={todo.itemName}
                      editItemDetails={todo.itemDetails}
                    />
                  </div>
                </div>
                <Divider className="my-[10px]" />
              </div>
            ))}
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
