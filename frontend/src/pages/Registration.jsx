// import React from 'react'
import { Button, Card, Form, Input, notification } from "antd";
import axios from "axios";
import { useState } from "react";
const Registration = () => {
  const [imgDataFile, setImgDataFile] = useState(null);
  const [api, contextHolder] = notification.useNotification();
  const onFinish = async (values) => {
    let modified = {
      ...values,
      myAvatar: imgDataFile,
    };
    let formData = new FormData();
    Object.keys(modified).forEach((key) => {
      formData.append(key, modified[key]);
    });

    await axios.post("http://localhost:8000/api/v1/registration", formData);

    api.open({
      message: "Registration successfull , please verify !",
      duration: 0,
    });
  };

  const handleChange = (e) => {
    setImgDataFile(e.target.files[0]);
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
          <Form.Item label="Upload" name="myAvatar">
            <Input type="file" onChange={(e) => handleChange(e)} />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

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
            label="Confirm Password"
            name="passwordConfirm"
            rules={[
              {
                required: true,
                message: "Please input your confirm password!",
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
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Registration;
