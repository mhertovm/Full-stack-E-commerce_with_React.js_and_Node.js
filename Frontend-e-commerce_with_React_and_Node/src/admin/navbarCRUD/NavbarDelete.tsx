import React, {useState} from 'react';
import type { RootState } from '../../store/store';
import { useSelector, useDispatch } from 'react-redux';
import { setUpdateNavbarTable } from '../../counter/counterSlice';
import { Button } from 'antd';
import {
    CloseCircleOutlined,
  } from '@ant-design/icons';


type NavbarDeleteProps = {
    id: number;
  };

const NavbarDelete: React.FC<NavbarDeleteProps> = ({id}) => {
    const {updateNavbarTable} = useSelector((state: RootState) => state.counter);
    const dispatch = useDispatch()
    const [message, setMessage] = useState();

    async function deleteProduct(id:number){
        const token = localStorage.getItem("token");
        const user_id = localStorage.getItem("user_id");

        try {
        const response = await fetch("http://localhost:3001/deletenavbar", {
            method: "DELETE",
            body: JSON.stringify({
            user_id,
            id
            }),
            headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": token ? token : '',
            },
        });
        const data = await response.json();
        setMessage(data.status)
        } catch (err) {
            console.log(err);
        }
        dispatch(setUpdateNavbarTable(!updateNavbarTable))
    };

  return (
    <Button onClick={()=>deleteProduct(id)}>
        Delete
        {message==="failed to delete navbar"
          ? 
            <p style={{color:"red", fontFamily:"sans-serif"}}>{message ? <><CloseCircleOutlined /> {message}: delete categories in this navbar</> : ""}</p>
          :
            ""
        }
    </Button>
  );
};

export default NavbarDelete;