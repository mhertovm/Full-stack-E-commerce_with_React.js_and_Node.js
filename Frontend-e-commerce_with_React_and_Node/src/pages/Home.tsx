import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, List, Badge } from 'antd';


const Home: React.FC = () => {
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
        setproducts(data)});
  }, []);

  return (
    <div>
      <div style={{backgroundColor:"rgb(222, 222, 222)"}}>
        <img style={{ width: "100%", height: "auto", margin:"10px 0px"}} src={`http://localhost:3001/images/banner.jpg`} alt='banner'/>
      </div>
      <section style={{textAlign:"center", fontFamily:"sans-serif"}}>
        <h1>Featured Products</h1>
        <p style={{color:"gray"}}>New Summer Collection</p>
      <List
      className='Category-container'
      grid={{ gutter: 20, column: 4 }}
      dataSource={products}
      renderItem={(item) => ( 
        item.discount === 0 ? (
          <List.Item className='Category-list' key={item.id}>
            <Card className='Card'
              onClick={()=>{navigate(`products/${item.id}`)}}
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
              onClick={()=>{navigate(`products/${item.id}`)}}
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
    </section>
    </div>
  )
};

export default Home;