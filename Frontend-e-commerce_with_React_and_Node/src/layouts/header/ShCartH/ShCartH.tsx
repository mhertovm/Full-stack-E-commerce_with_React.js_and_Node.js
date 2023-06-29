import React, { useState, useEffect } from 'react';
import { Badge, Button, Drawer, Table, Space} from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import ShCartDelete from './ShCartDelete';
import type { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ShCartH: React.FC = () => {

  const {updateShCartTable} = useSelector((state: RootState) => state.counter)
  const navigate = useNavigate()

  const token = localStorage.getItem("token");

  type Buys = {
    id: number;
    cart_id: number;
    product_id: number;
    quantity: number;
    size: string;
    Product: {
      id : number;
      name: string;
      img: string;
      price: number;
    }
  }

  const [open, setOpen] = useState(false);
  const [buys, setbuys] = useState<Buys[]>([])


  const cart_id = localStorage.getItem("cart_id");
  useEffect(()=>{
    fetch(`http://localhost:3001/userbuys/${cart_id}`, {
      method: "GET",
      headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": token ? token : '',
      },
    })
    .then(res=> res.json())
    .then(data=>{
      setbuys(data)});
  }, [updateShCartTable, cart_id, token]);

  const showDrawer = () => {
    if(token){
      setOpen(true);
    } else {
      navigate("/login")
    }
  };
  
  const onClose = () => {
    setOpen(false);
  };
  

  const columns: ColumnsType<Buys> = [
    {
      title : "Img",
      key: "img",
        render: (_, record) => (
          <Space key={record.Product.id} size="middle">
              <img style={{width:"40px", height:"auto"}} src={`http://localhost:3001/images/${record.Product.img}`} alt='product img'/>
          </Space>
        ),
    },
    {
      title: 'Name',
      key: 'name',
        render: (_, record) => (
          <Space key={record.Product.id} size="middle">
              <p>{record.Product.name}</p>
          </Space>
        ),
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Price',
      key: 'price',
        render: (_, record) => (
          <Space key={record.Product.id} size="middle">
            <p>{record.quantity*record.Product.price} AMD</p>
          </Space>
        ),
    },
    {
      title: 'Action',
      key: 'action',
        render: (_, record) => (
          <Space key={record.id} size="middle">
            <ShCartDelete id={record.id} />
          </Space>
        ),
    },
    ];

  return (
    <div>
      <Button type="link" onClick={showDrawer}>
      <Badge  count={buys.length} className='ShCartIcon' size='small' offset={[2, 3]}>
          <ShoppingOutlined style={{ fontSize: '26px'}}  className='ShCartLogo'/>
      </Badge>
      </Button>
      <Drawer
      title="Your cart"
          placement="right"
          onClose={onClose}
          open={open}
          contentWrapperStyle={{width:"600px", height:"100%"}}
      >
        <Table pagination={false} columns={columns} dataSource={buys} />
      </Drawer>
    </div>
  );
}
export default ShCartH;