import React, {useState, useEffect} from 'react';
import {
  Button,
  Cascader,
  Form,
  Input,
  InputNumber,
} from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
const { TextArea } = Input;


const ProductAdd: React.FC = () => {
 
  type Categories = {
    id: number;
    name: string;
  }
  type Navbar = {
    id: number;
    name: string;
    Categories: Categories[];
  };
  const [message, setMessage] = useState();
  const [image, setImage] = useState(null);
  const [navbar, setnavbar]=useState<Navbar[]>([]);

  useEffect(()=>{
    fetch("http://localhost:3001/navbars")
    .then(res=> res.json())
    .then(data=>{
      setnavbar(data)});
  },[]);

  const onFinish = async (values: any) => {
    try {
      const token = localStorage.getItem("token");
      const user_id = localStorage.getItem("user_id");

      const formData = new FormData();
      if (image) {
          formData.append('image', image);
      }
      const responsImg = await fetch("http://localhost:3001/upload", {
          method: 'POST',
          body: formData,
      });
      const dataImg = await responsImg.json();
      const response = await fetch('http://localhost:3001/addproduct', {
        method: 'POST',
        body: JSON.stringify({
          user_id,
          category_id: values.category[1],
          name: values.name,
          description: values.description,
          price: values.price,
          discount: values.discount,
          img: dataImg.filename
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
    key: string | number;
    value: number;
    label: string;
    children?: Option[];
  }
 
  const item1: Option[] = navbar.map((item) => {
    return{
      key: item.id,
      value: item.id,
      label: item.name,
      children: item.Categories.map((value)=>{
        return{
          key: value.id,
          value: value.id,
          label: value.name
        }
      }),
    }
  });

  const hendelimg = ( e: any) => {
    setImage(e.target.files[0]) 
  }

  return (
  <>
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
          rules={[{ required: true, message: 'Please input product name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item 
          label="Category"
          name="category"
          rules={[{ required: true, message: 'Please input product category!' }]}>
          <Cascader
            placeholder="Please select"
            options={item1}
          />
      </Form.Item>
      <Form.Item 
          label="Price (AMD)"
          name="price"
          rules={[{ required: true, message: 'Please input product price!' }]}
      >
        <InputNumber min={1} />
      </Form.Item>
      <Form.Item 
          label="Discount (%)"
          name="discount"
      >
        <InputNumber defaultValue={0} min={0} />
      </Form.Item>
      <Form.Item 
          label="Discription"
          name="description"
          rules={[{ required: true, message: 'Please input product description!' }]}
      >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item
        label="Image"
        name='image'
        rules={[{ required: true, message: 'Please input product image!' }]}
      >
        <input type='file' accept="image/*" onChange={hendelimg}/>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Add Product</Button>
        {message==="product added"
          ? 
          <p style={{color:"green", fontFamily:"sans-serif"}}>{message ? <><CheckCircleOutlined /> {message}</> : ""}</p>
          :
          <p style={{color:"red", fontFamily:"sans-serif"}}>{message ? <><CloseCircleOutlined /> {message}</> : ""}</p>
        }
        
      </Form.Item>
      
    </Form>
  </>
  );
};
export default ProductAdd;
