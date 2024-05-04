// import React from 'react'
import { Button, Card, Form, Input } from "antd";
// import { useState } from "react";
import axios from "axios";
import { useState } from "react";
const Registration = () => {
  const [imgDataFile, setImgDataFile] = useState(null);
  const onFinish = async (values) => {
    let modified = {
      ...values,
      myAvatar: imgDataFile,
    };
    let formData = new FormData();
    Object.keys(modified).forEach((key) => {
      formData.append(key, modified[key]);
    });

    const data2 = await axios.post(
      "http://localhost:8000/api/v1/registration",
      formData
    );
    console.log("data2", data2);
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
            <Input />
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
      {/* <Flex justify="center" align="center" className="bg-blue-100 ">
    
      </Flex> */}
    </div>
  );
};

export default Registration;
