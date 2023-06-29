import React, {useState} from 'react';
import type { RootState } from '../../../store/store';
import { useSelector, useDispatch } from 'react-redux';
import { setUpdateShCartTable } from '../../../counter/counterSlice';
import { Button } from 'antd';
import {
    CloseCircleOutlined,
  } from '@ant-design/icons';


type ShCartDeleteProps = {
    id: number;
  };

const ShCartDelete: React.FC<ShCartDeleteProps> = ({id}) => {
    const {updateShCartTable} = useSelector((state: RootState) => state.counter);
    const dispatch = useDispatch()
    const [message, setMessage] = useState();

    async function deleteProduct(id:number){
        const token = localStorage.getItem("token");
        const user_id = localStorage.getItem("user_id");

        try {
        const response = await fetch("http://localhost:3001/deletebuy", {
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
        dispatch(setUpdateShCartTable(!updateShCartTable))
    };

  return (
    <Button style={{color:"red"}} type='link' onClick={()=>deleteProduct(id)}>
        Delete
        {message==="failed to delete product"
          ? 
            <p style={{color:"red", fontFamily:"sans-serif"}}>{message ? <><CloseCircleOutlined /> {message}: delete categories in this navbar</> : ""}</p>
          :
            ""
        }
    </Button>
  );
};

export default ShCartDelete;