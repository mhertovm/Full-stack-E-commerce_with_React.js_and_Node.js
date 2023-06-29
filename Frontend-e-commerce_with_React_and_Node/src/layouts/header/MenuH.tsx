import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';


const MenuH: React.FC = () => {
    const navigate = useNavigate()
    const [navbar, setnavbar]=useState<Navbar[]>([]);

    type Categories = {
      id: number;
      name: string;
    }
  
    type Navbar = {
      id: number;
      name: string;
      Categories: Categories[];
    };
  
    useEffect(()=>{
      fetch("http://localhost:3001/navbars")
      .then(res=> res.json())
      .then(data=>{
        setnavbar(data)});
  },[]);
  
  const items1: MenuProps['items'] = navbar.map((item) => {
    return{
      key: item.name,
      label: item.name,
      children: item.Categories.map((value)=>{
        return{
          key: value.name,
          label: value.name
        }
      }),
    }
  });

  const items2: MenuProps['items'] = [{
    key: "Sale",
    label: "Sale"
  }];

  const items3: MenuProps['items'] = [{
    key: "All",
    label: "All"
  }];

  return(
    <>
      <Menu
        selectable={false}
        style={{ fontSize: "15px", fontFamily: "sans-serif"}}
        onClick={()=>{navigate("/allproducts")}}
        mode="horizontal"
        items={items3}
      />
      <Menu
        selectable={false}
        style={{ fontSize: "15px", fontFamily: "sans-serif"}}
        onClick={(item)=>{navigate(`/categories/${item.key}`)}}
        mode="horizontal"
        items={items1}
      />
      <Menu
        selectable={false}
        style={{ fontSize: "16px", color:"rgb(226, 0, 141)",}}
        onClick={()=>{navigate(`/saleproducts`)}}
        mode="horizontal"
        items={items2}
      />
    </>
  )
}

export default MenuH;