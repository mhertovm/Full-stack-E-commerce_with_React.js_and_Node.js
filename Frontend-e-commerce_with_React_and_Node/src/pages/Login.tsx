import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  
  const navigate = useNavigate();
  
  const [err, setErr] = useState();

  const onFinish = async (values: any) => {
    try {
        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            body: JSON.stringify({
            email: values.email,
            password: values.password,
            }),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json();
        

        if (data.role === "verified_user") {
          localStorage.setItem('token', data.jwt);
          localStorage.setItem('user_id', data.user_id);
          localStorage.setItem('cart_id', data.cart_id);
          localStorage.setItem('role', data.role);
          navigate("/")
          window.location.reload();
        } else if ( data.role === "user"){
          navigate('/verify')
        } else if (data.role === "admin") {
          localStorage.setItem('token', data.jwt);
          localStorage.setItem('user_id', data.user_id);
          localStorage.setItem('cart_id', data.cart_id);
          localStorage.setItem('role', data.role);
          navigate('/dashboard');
          window.location.reload()
        } else {
            setErr(data);
        }
    } catch (err) {
        console.log(err);
    }
  };
  return (
    <div className="Login-container">
      <span style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>
        <img
          className="Login-logo"
          src={`http://localhost:3001/images/logo.png`}
          alt="logo2"
        />
        <h2>YOUR ACCOUNT<br /> FOR EVERYTHING</h2>
      </span>
      <Form
        className="Login-form"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 1, span: 16 }}>
          <Button type="default" htmlType="submit" style={{ width: '360px' }}>
            Submit
          </Button>
        </Form.Item>
        <p style={{color:"red"}}>{err}</p>
        <span style={{ fontSize: '13px', color: 'black', display: 'flex', justifyContent: 'flex-end' }}>
          Not a Member?
          <a href="/register"> register</a>
        </span>
      </Form>
    </div>
  );
};

export default Login;