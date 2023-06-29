import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, List, Badge } from 'antd';

const Category: React.FC = () => {
  const navigate = useNavigate()
   
  type Product = {
    id: number
    category_id: number;
    name: string;
    description: string;
    price: number;
    discount: number;
    img: string
  };

  const [categoryProduct, setcategoryProduct]=useState<Product[]>([]);

  const { category } = useParams<{ category: string }>();
  
  useEffect(()=>{
    fetch(`http://localhost:3001/categories/${category}`)
    .then(res=> res.json())
    .then(data=>{
      setcategoryProduct(data)
    });
  },[category]);

  return (
    <List
      className='Category-container'
      grid={{ gutter: 20, column: 4 }}
      dataSource={categoryProduct}
      renderItem={(item) => ( 
        item.discount === 0 ? (
          <List.Item className='Category-list' key={item.id}>
            <Card className='Card'
              onClick={()=>{navigate(`/products/${item.id}`)}}
              hoverable
              cover={<img className='Product-img' alt="example" src={`http://localhost:3001/images/${item.img}`} />}
            >
              <h4>{item.name}</h4>
              <span>{item.price} AMD</span>
            </Card>
          </List.Item>
        ) : (
          <List.Item key={item.id}>
            <Badge.Ribbon text={`Sale ${item.discount}%`} color="pink">
            <Card className='Card'
              onClick={()=>{navigate(`/products/${item.id}`)}}
              hoverable
              cover={<img className='Product-img' alt="example" src={`http://localhost:3001/images/${item.img}`} />}
            >
              <h4>{item.name}</h4>
              <div className='del-price'>
                <del>{item.price} AMD</del>
                <span className='price'>{item.price*(1-item.discount/100)} AMD</span>
              </div>
            </Card>
            </Badge.Ribbon>
          </List.Item>
        )
      )}
    >
    </List>
  )
};

export default Category;