import React, {useState} from 'react';
import {
  Button,
  Form,
  Input,
} from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';

const NavbarAdd: React.FC = () => {
    const [message, setMessage] = useState();


    const onFinish = async (values: any) => {
    try {
        const token = localStorage.getItem("token");
        const user_id = localStorage.getItem("user_id");

        const response = await fetch('http://localhost:3001/addnavbar', {
            method: 'POST',
            body: JSON.stringify({
            user_id,
            name: values.name,
            }),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            "Authorization": token ? token : '',
            },
        });

        const data = await response.json();
        setMessage(data.status)
    } catch (err) {
        console.log(err);
    }
  };
 
    return (
    <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
    >
        <Form.Item 
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input navbar name!' }]}
        >
        <Input />
        </Form.Item>
        <Form.Item>
        <Button htmlType="submit">Add Navbar</Button>
        {message==="navbar added"
          ? 
          <p style={{color:"green", fontFamily:"sans-serif"}}>{message ? <><CheckCircleOutlined /> {message}</> : ""}</p>
          :
          <p style={{color:"red", fontFamily:"sans-serif"}}>{message ? <><CloseCircleOutlined /> {message}</> : ""}</p>
        }
        </Form.Item>
    </Form>
    );
};
export default NavbarAdd;