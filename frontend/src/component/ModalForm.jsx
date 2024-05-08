import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { BiEdit } from "react-icons/bi";
// import { useRouter } from "next/router";
import axios from "axios";
const AddProjectModal = ({ editId, editItemName, editItemDetails }) => {
  const [open, setOpen] = useState(false);
  const [formChangeVal, setFormChangeVal] = useState();
  const [form] = Form.useForm();
  // console.log(editId);
  const onFormChange = (_, allValues) => {
    setFormChangeVal(allValues);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    const updatedTask = {
      ...formChangeVal,
      editId,
    };
    await axios.patch(
      "http://localhost:8000/api/v1/todo/editTodo",
      updatedTask
    );
    // api.open({
    //   message: "todo updated",
    //   duration: 0,
    // });
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <BiEdit
        className="text-[25px] ml-auto text-[#f07272] cursor-pointer"
        onClick={showModal}
      />
      <Modal
        title="Edit projects"
        open={open}
        onOk={handleOk}
        okText="Submit"
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="basic2"
          onValuesChange={onFormChange}
          autoComplete="off"
          labelCol={{
            span: 15,
          }}
          layout="vertical"
          className="flex gap-5 items-center"
        >
          <Form.Item
            label="Item"
            name="itemName"
            className="mb-0"
            initialValue={editItemName}
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
            initialValue={editItemDetails}
            rules={[
              {
                required: true,
                message: "Description required !",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default AddProjectModal;
