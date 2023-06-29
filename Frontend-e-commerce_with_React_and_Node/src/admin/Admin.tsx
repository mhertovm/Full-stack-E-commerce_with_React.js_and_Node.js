import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreAddOutlined,
  DeleteOutlined,
  RedoOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, Button, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import User from '../user/User';

const { Header, Sider, Content, Footer } = Layout;

const Admin: React.FC = () => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: {colorBgContainer },
  } = theme.useToken();

  const items1: MenuProps['items'] = [{
    key: `add`,
    icon: <AppstoreAddOutlined/>,
    label: `Add`,
    children: [
      {
      key: "product-add",
      label: "Product"
      },
      {
        key:"category-add",
        label:"Category"
      },
      {
        key:"navbar-add",
        label:"NavBar"
      },
    ],
  }];

  const items2: MenuProps['items'] = [{
    key: `delupd`,
    icon: [<RedoOutlined />, <DeleteOutlined />],
    label: `DellUpd`,
    children: [
      {
      key: "product-dellupd",
      label: "Product"
      },
      {
        key:"category-dellupd",
        label:"Category"
      },
      {
        key:"navbar-dellupd",
        label:"NavBar"
      },
    ],
  }];

  const items4: MenuProps['items'] = [{
    key: `dashboard`,
    icon: <HomeOutlined />,
    label: `Dashboard`,
  }]

  return (
    <Layout style={{overflowY: "scroll", height:"100%"}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          selectable={false}
          theme="dark"
          mode="inline"
          onClick={(item)=>{navigate(`/${item.key}`)}}
          items={items4}
        />
        <Menu
          selectable={false}
          theme="dark"
          mode="inline"
          onClick={(item)=>{navigate(`/${item.key}`)}}
          items={items1}
        />
        <Menu 
          selectable={false}
          theme="dark"
          mode="inline"
          onClick={(item)=>{navigate(`/${item.key}`)}}
          items={items2}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: "20px 0px", background: colorBgContainer, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div style={{display:"inline-flex", padding:"0px 5%"}}>
            <User />
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet/>
        </Content>
        <Footer style={{ textAlign: 'center' }}></Footer>
      </Layout>
    </Layout>
  );
};

export default Admin;