import React, {useState} from 'react';
import { Button, Form, Input, message } from 'antd';


const Register: React.FC = () => {
    const [err, setErr] = useState();
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values: any) => {
        try {
            const response = await fetch('http://localhost:3001/register', {
              method: 'POST',
              body: JSON.stringify({
                name: values.name,
                surname: values.surname,
                email: values.email,
                password: values.password,
              }),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            });
            const data = await response.json();
            if (data.registered === "ok") {
                messageApi.open({
                  type: 'loading',
                  content: 'Action in progress...',
                  duration: 1.5,
                }).then(() => message.success(data.message, 7))
            } else {
              setErr(data);
            }
          } catch (err) {
            console.log(err);
          }
        };

    return (
    <div className='Login-container'>
        <span style={{textAlign:"center", fontFamily:"sans-serif"}}>
            <img className='Login-logo' src={`http://localhost:3001/images/logo.png`} alt='logo2'/>
            <h3>BECOME A MT MEMBER</h3>
        </span>
    <Form className='Login-form'
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
    >
        
        <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input your name!' }]}
        >
        <Input />
        </Form.Item>

        <Form.Item
        label="Surname"
        name="surname"
        rules={[{ required: true, message: 'Please input your surname!' }]}
        >
        <Input />
        </Form.Item>

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
        <Button type="default" htmlType="submit" style={{width:"360px"}}>
            Submit
        </Button>
        </Form.Item>
        <p style={{color:"red"}}>{err}{contextHolder}</p>
        <span style={{ fontSize:"13px", color:"black", display:"flex", justifyContent:"flex-end"}}>
            Already a Member?
            <a href='/login'> login</a>
        </span>
    </Form>
   
    </div>
)};


export default Register;