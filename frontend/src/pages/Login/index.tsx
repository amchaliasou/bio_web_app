import { Button, Form, Input, Modal, message } from "antd";
import React, { useState } from "react";
import "./index.css";
import authService from "services/authService";
import { useStores } from "stores/rootStore";

interface LoginProps {
  isModalOpen: boolean;
  handleCancel: () => void;
}
const Login: React.FC<LoginProps> = ({
  isModalOpen,
  handleCancel,
}: LoginProps) => {
  const { authenticationStore } = useStores();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [messageApi, contextHolder] = message.useMessage();
  const warning = () => {
    messageApi.open({
      type: "error",
      content: "Failed to Login, please check your credentials",
    });
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Succefull login",
    });
  };
  const onFinish = (values: any) => {
    authService
      .login(values.username, values.password)
      .then((res) => {
        authenticationStore.setUsername(res.username);
        authenticationStore.setIsAuthenticate(true);
        success();
        setTimeout(() => handleCancel(), 2000);
      })
      .catch((err) => {
        console.log(err);
        warning();
      });
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    console.log("Form Data Submitted:", formData);
  };

  return (
    <Modal open={isModalOpen} footer={null} onCancel={handleCancel}>
      {contextHolder}
      <div className="login-wrapper">
        <div className="login-form">
          <h1>Login</h1>
          <Form onFinish={onFinish}>
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
              <Input name="username" onChange={handleChange} />
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
              <Input.Password name="password" onChange={handleChange} />
            </Form.Item>
            <Form.Item>
              <div className="center-container">
                <Button type="primary" htmlType="submit" style={{ backgroundColor: "#72a5b4", border: "1px solid white" }}>
                  Submit
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default Login;
