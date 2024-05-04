// import React from 'react'
import { Button, Card, Form, Input, notification } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loggedInUser } from "../slices/userSlice";
const Login = () => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/login",
      values
    );
    //Pa$$w0rd!
    if (data.result) {
      api.open({
        message: "Registration successfull , please verify !",
        duration: 0,
      });
      localStorage.setItem("todoUser", JSON.stringify(data));
      dispatch(loggedInUser(data));
    }
    setTimeout(() => {
      navigate("/todo");
    }, 1000);
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Card
        style={{
          width: 500,
        }}
      >
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
          labelCol={{
            span: 7,
          }}
        >
          {contextHolder}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
