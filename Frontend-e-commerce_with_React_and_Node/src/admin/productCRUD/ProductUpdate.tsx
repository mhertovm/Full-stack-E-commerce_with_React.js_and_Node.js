import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
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



const ProductUpdate: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();

  type Categories = {
      id: number;
      name: string;
  }
  type Navbar = {
      id: number;
      name: string;
      Categories: Categories[];
  };
  type Category = {
    name: string
  }
  type Product = {
    id: number
    category_id: number;
    name: string;
    description: string;
    price: number;
    discount: number;
    img: string;
    Category: Category
  };
  
  const [message, setMessage] = useState();
  const [image, setImage] = useState(null);
  const [navbar, setnavbar]=useState<Navbar[]>([]);
  const [product, setProduct]=useState<Product>()

  useEffect(()=>{
    fetch("http://localhost:3001/navbars")
    .then(res=> res.json())
    .then(data=>{
      setnavbar(data)
    });

    fetch(`http://localhost:3001/product/${productId}`)
    .then(res=> res.json())
    .then(data=>{
      console.log(data)
      setProduct(data)
    });

  },[productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const onFinish = async (values: any) => {
    console.log(values)
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
      const response = await fetch(`http://localhost:3001/updateproduct/${productId}`, {
        method: 'PUT',
        body: JSON.stringify({
          user_id,
          category_id: values.category ? values.category[1] : product.category_id,
          name: values.name ? values.name : product.name,
          description: values.description ? values.description : product.description,
          price: values.price ? values.price : product.price,
          discount: values.discount || values.discount === 0 ? values.discount : product.discount==null ? 0 : product.discount,
          img: dataImg ? dataImg.filename : product.img
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          "Authorization": token ? token : '',
        },
      });

      const data = await response.json();
      console.log(values)
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
      >
        <Input defaultValue={product.name}/>
      </Form.Item>
      <Form.Item 
          label="Category"
          name="category"
      >
        <Cascader
          defaultValue={[product.Category.name]}
          options={item1}
        />
      </Form.Item>
      <Form.Item 
          label="Price (AMD)"
          name="price"
      >
        <InputNumber defaultValue={product.price} min={1} />
      </Form.Item>
      <Form.Item 
          label="Discount (%)"
          name="discount"
      >
        <InputNumber defaultValue={product.discount} min={0} />
      </Form.Item>
      <Form.Item 
          label="Discription"
          name="description"
      >
        <TextArea defaultValue={product.description} rows={4} />
      </Form.Item>
      <Form.Item
        label="Image"
      >
        <input type='file' accept="image/*" onChange={hendelimg}/>

        <img style={{padding:"10px", width:"100px", height:"auto"}} src={`http://localhost:3001/images/${product.img}`} alt='product img'/>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Update Product</Button>
        {message==="product updated"
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
export default ProductUpdate;