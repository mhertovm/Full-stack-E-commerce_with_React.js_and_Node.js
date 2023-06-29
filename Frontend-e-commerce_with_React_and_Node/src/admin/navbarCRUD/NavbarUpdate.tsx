import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {
  Button,
  Form,
  Input,
} from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';

const NavbarUpdate: React.FC = () => {

    type Navbar = {
        id: number;
        name: string;
    }
    const { navbarId } = useParams<{ navbarId: string }>();
    const [navbar, setNavbar] =useState<Navbar>()
    const [message, setMessage] = useState();

    useEffect(()=>{
        fetch(`http://localhost:3001/navbarId/${navbarId}`)
        .then(res=> res.json())
        .then(data=>{
            setNavbar(data)
        });
    },[navbarId]);

    if (!navbar) {
        return <div>Loading...</div>;
    }

    const onFinish = async (values: any) => {
    try {
        const token = localStorage.getItem("token");
        const user_id = localStorage.getItem("user_id");

        const response = await fetch(`http://localhost:3001/updatenavbar/${navbarId}`, {
            method: 'PUT',
            body: JSON.stringify({
            user_id,
            name: values.name ? values.name : navbar.name,
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
        >
        <Input defaultValue={navbar.name}/>
        </Form.Item>
        <Form.Item>
        <Button htmlType="submit">Update Navbar</Button>
        {message==="navbar updated"
          ? 
          <p style={{color:"green", fontFamily:"sans-serif"}}>{message ? <><CheckCircleOutlined /> {message}</> : ""}</p>
          :
          <p style={{color:"red", fontFamily:"sans-serif"}}>{message ? <><CloseCircleOutlined /> {message}</> : ""}</p>
        }
        </Form.Item>
    </Form>
    );
};
export default NavbarUpdate;