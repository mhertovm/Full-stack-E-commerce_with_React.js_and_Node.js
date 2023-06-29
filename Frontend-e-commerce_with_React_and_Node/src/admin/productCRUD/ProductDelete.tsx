import React from 'react';
import type { RootState } from '../../store/store';
import { useSelector, useDispatch } from 'react-redux';
import { setUpdateProductTable } from '../../counter/counterSlice';
import { Button } from 'antd';


type ProductDeleteProps = {
    id: number;
    image_name: string;
  };

const ProductDelete: React.FC<ProductDeleteProps> = ({id, image_name}) => {
  const {updateProductTable} = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch()

  async function deleteProduct(id:number){

    const token = localStorage.getItem("token")
    const user_id = localStorage.getItem("user_id");
      try {
        await fetch("http://localhost:3001/deleteimage", {
          method: "DELETE",
          body: JSON.stringify({
            user_id,
            image_name: image_name
          }),
          headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": token ? token : '',
          },
        });
      } catch (err){
        console.log(err)
      }
      try {
        await fetch("http://localhost:3001/deleteproduct", {
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
      } catch (err) {
          console.log(err);
      }
      dispatch(setUpdateProductTable(!updateProductTable))
  };

  return (
    <Button onClick={()=>deleteProduct(id)}>Delete</Button>
  );
};

export default ProductDelete;