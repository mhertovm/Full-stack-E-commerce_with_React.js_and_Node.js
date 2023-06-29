import React, {useState, useEffect} from 'react';
import type { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { Button, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import ProductDelete from './ProductDelete';
import { useNavigate } from 'react-router-dom';



const ProductTable: React.FC = () => {
    const navigate = useNavigate()

    const {updateProductTable} = useSelector((state: RootState) => state.counter)

    type Product = {
        id: number;
        category_id: number;
        name: string;
        description: string;
        price: number;
        discount: number;
        img: string;
        Category: {name:string}
    };

    const [products, setproducts]=useState<Product[]>([]);

    useEffect(()=>{
        fetch("http://localhost:3001/allproducts")
        .then(res=> res.json())
        .then(data=>{
            setproducts(data)});
    }, [updateProductTable]);

      const columns: ColumnsType<Product> = [
        {
            title: 'Img',
            dataIndex: 'img',
            key: 'img',
            render: (_, record) => (
                <Space key={record.id} size="middle">
                    <img style={{height:"40px", width:"auto"}} src={`http://localhost:3001/images/${record.img}`} alt='logo'/>
                </Space>
                ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Category',
            dataIndex: 'Category',
            key: 'Category',
            render: (_, record) => (
                <Space key={record.id} size="middle">
                    <p>{record.Category.name}</p>
                </Space>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
            render: (_, record) => (
                <Space key={record.id} size="middle">
                    <p>{record.discount}%</p>
                </Space>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space key={record.id} size="middle">
                    <Button onClick={()=>navigate(`/product-update/${record.id}`)}>Update</Button>
                    <ProductDelete id={record.id} image_name={record.img}/>
                </Space>
            ),
        },
      ];
    return(
        <>
            <Table columns={columns} dataSource={products} />
        </>
    )
};

export default ProductTable;