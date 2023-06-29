import { Menu } from 'antd';
import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';

const User: React.FC = () =>{
  const navigate = useNavigate()

    const items1: MenuProps['items'] = [
        {
          key: "log out",
          icon: <UserOutlined style={{fontSize:"20px"}} />,
          children: [
            {
              label: "Log out",
              key: "log out",
            }
          ]
        },
      ];

      const handle = () =>{
        localStorage.clear()
        navigate("/")
        window.location.reload()
        
      }
    return(
        <>
            <Menu onClick={handle} triggerSubMenuAction="click" selectable={false} inlineCollapsed style={{width:"62px", margin:"-5px 0px"}} items={items1}  />
        </>
    )
}

export default User;