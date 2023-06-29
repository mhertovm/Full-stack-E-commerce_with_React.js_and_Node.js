import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, InputNumber, Form, Cascader } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { setUpdateShCartTable } from '../counter/counterSlice';



const Product: React.FC = () => {
  const dispatch = useDispatch()
  const {updateShCartTable} = useSelector((state: RootState) => state.counter);

  const navigate = useNavigate()
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct]=useState<Product>();

  type Product = {
      id: number
      category_id: number;
      name: string;
      description: string;
      price: number;
      discount: number;
      img: string
    };  
  
  useEffect(()=>{
    fetch(`http://localhost:3001/product/${productId}`)
    .then(res=> res.json())
    .then(data=>{
      setProduct(data)
    });
  },[productId]);

  if (!product) {
    return <div>Loading...</div>;
  }



  const onFinish = async (values: any) => {
    
    
    const token = localStorage.getItem("token");
    const cart_id = localStorage.getItem("cart_id");
    const user_id = localStorage.getItem("user_id");
    if(!token){
      navigate("/login")
    }
    try {
      await fetch("http://localhost:3001/addcart", {
        method: "POST",
        body: JSON.stringify({
          user_id,
          cart_id,
          product_id: productId,
          quantity: values.quantity ? values.quantity : "1",
          size: values.size[0],
          color: ""
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": token ? token : ""
        },
      });
    dispatch(setUpdateShCartTable(!updateShCartTable))  
    } catch (err) {
      console.log(err);
    }
    
  }


  const items = [
    {
      value:"S",
      label: "S"
    },
    {
      value:"M",
      label: "M"
    },
    {
      value:"L",
      label: "L"
    },
    {
      value:"XL",
      label: "XL"
    },
    {
      value:"XXL",
      label: "XXL"
    },
  ];

  return(
    <>
    <div className="productId">
      <p><img style={{width: 500, height:"auto"}} src={`http://localhost:3001/images/${product.img}`} alt='product img'/></p>
      <div>
        <h3 style={{fontFamily: "sans-serif"}}>{product.name}</h3>
        <span style={{fontFamily: "sans-serif", fontSize:"25px", padding:"5px"}}>
          {product.discount === 0 ? 
          `${product.price}.00 ֏` : 
          <><del>{`${product.price}.00 ֏`}</del> <span className='price'>{`${product.price*(1-product.discount/100)}.00 ֏`}</span></>}
        </span><br/>
        <Form
          onFinish={onFinish}
        >
          <Form.Item
            label="Size"
            name="size"
            rules={[{ required: true, message: 'Please select size!' }]}
          >
            <Cascader
            style={{ width: "108px" }}
            placeholder="Select Size"
            options={items}
          />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
          >
            <InputNumber min={1} max={10} defaultValue={1} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" style={{margin:"5px 10px", color:"green"}}>Add To Cart</Button>
          </Form.Item>
        </Form>  
        <h2>Product Details</h2>
        <p style={{width:500}}>{product.description}</p>
      </div>
    </div>
    </>
  );
}

export default Product;