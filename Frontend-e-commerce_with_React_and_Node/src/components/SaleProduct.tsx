import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, List, Badge } from 'antd';


const SaleProducts: React.FC = () => {
  const navigate = useNavigate();
  
  type Product = {
    id: number;
    category_id: number;
    name: string;
    description: string;
    price: number;
    discount: number;
    img: string
  };

  const [products, setproducts]=useState<Product[]>([]);

  useEffect(()=>{
        fetch("http://localhost:3001/allproducts")
        .then(res=> res.json())
        .then(data=>{
            const sale = data.filter((value: any)=>{
                return value.discount !== 0
            })
            setproducts(sale)    
        });
  }, []);

    return (
        <List
        className='Category-container'
        grid={{ gutter: 20, column: 4 }}
        dataSource={products}
        renderItem={(item) => {
            if(item.discount !== 0){
                return (
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
            }
        }}
        >
        </List>
    )
};

export default SaleProducts;