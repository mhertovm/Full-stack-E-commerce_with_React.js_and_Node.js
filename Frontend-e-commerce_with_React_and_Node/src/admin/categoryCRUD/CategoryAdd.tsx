import React, {useState, useEffect} from 'react';
import {
  Button,
  Form,
  Input,
  Cascader
} from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';

const CategoryAdd: React.FC = () => {
  type Navbar = {
    id: number;
    name: string;
  };
  const [message, setMessage] = useState();
  const [navbar, setnavbar]=useState<Navbar[]>([]);
  const [navbarValue, setNavbarValue] = useState("")

  useEffect(()=>{
    fetch("http://localhost:3001/navbars")
    .then(res=> res.json())
    .then(data=>{
      setnavbar(data)
    });
  },[]);

  const onFinish = async (values: any) => {
    try {
      const token = localStorage.getItem("token");
      const user_id = localStorage.getItem("user_id");

      const response = await fetch('http://localhost:3001/addcategory', {
        method: 'POST',
        body: JSON.stringify({
          user_id,
          name: navbarValue+values.name,
          navbar_id: values.navbar[0]
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

  interface Option {
    value: string | number;
    label: string;
  }
  
  const options: Option[] = navbar.map((item)=>{
    return{
        value: item.id,
        label: item.name+"-",
    }
  })

  const onChange = (value: any) => {
    setNavbarValue(navbar[value[0]-1].name+"-")
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
            label="Navbar"
            name="navbar"
            rules={[{ required: true, message: 'Please input category navbar!' }]}>
            <Cascader options={options} onChange={onChange} placeholder="Please select" />
        </Form.Item>
        <Form.Item 
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input category name!' }]}
        >
        <Input addonBefore={navbarValue} />
        </Form.Item>
        <Form.Item>
        <Button htmlType="submit">Add Category</Button>
        {message==="category added"
          ? 
          <p style={{color:"green", fontFamily:"sans-serif"}}>{message ? <><CheckCircleOutlined /> {message}</> : ""}</p>
          :
          <p style={{color:"red", fontFamily:"sans-serif"}}>{message ? <><CloseCircleOutlined /> {message}</> : ""}</p>
        }
        </Form.Item>
    </Form>
    );
};
export default CategoryAdd;