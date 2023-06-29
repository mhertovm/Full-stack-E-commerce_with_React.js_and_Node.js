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

const CategoryUpdate: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    type Category = {
        id: number;
        name: string;
        navbar_id: number;
        Navbar: {
            name: string
        }
    };

    const [message, setMessage] = useState();
    const [category, setCategory] = useState<Category>();

    useEffect(()=>{
        fetch(`http://localhost:3001/categoryId/${categoryId}`)
        .then(res=> res.json())
        .then(data=>{
            console.log(data)
            setCategory(data)
        });
    },[categoryId]);

    if (!category) {
        return <div>Loading...</div>;
    }

    const onFinish = async (values: any) => {
        try {
            const token = localStorage.getItem("token");
            const user_id = localStorage.getItem("user_id");

            const response = await fetch(`http://localhost:3001/updatecategory/${categoryId}`, {
                method: 'PUT',
                body: JSON.stringify({
                user_id,
                name: values.name ? values.name : category.name,
                navbar_id: category.navbar_id
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
            <Input addonBefore={category.Navbar.name} defaultValue={category.name} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit">Update Category</Button>
            {message==="category updated"
            ? 
            <p style={{color:"green", fontFamily:"sans-serif"}}>{message ? <><CheckCircleOutlined /> {message}</> : ""}</p>
            :
            <p style={{color:"red", fontFamily:"sans-serif"}}>{message ? <><CloseCircleOutlined /> {message}</> : ""}</p>
            }
        </Form.Item>
    </Form>
    );
};
export default CategoryUpdate;