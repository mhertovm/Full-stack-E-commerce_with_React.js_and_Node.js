import React, {useState, useEffect} from 'react';
import type { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { Button, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import CategoryDelete from './CategoryDelete';



const CategoryTable: React.FC = () => {
    const navigate = useNavigate()

    const {updateCategoryTable} = useSelector((state: RootState) => state.counter)

    type Categories = {
        id: number;
        name: string;
        navbar_id: number;
        Navbar: {
            id: number;
            name:string
        }
    };

    const [categories, setCategories]=useState<Categories[]>([]);

    useEffect(()=>{
        fetch("http://localhost:3001/allcategories")
        .then(res=> res.json())
        .then(data=>{
            setCategories(data)});
    }, [updateCategoryTable]);

      const columns: ColumnsType<Categories> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Navbar',
            dataIndex: 'Navbar',
            key: 'Navbar',
            render: (_, record) => (
                <Space key={record.id} size="middle">
                    <p>{record.Navbar.name}</p>
                </Space>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space key={record.id} size="middle">
                    <Button onClick={()=>navigate(`/category-update/${record.id}`)}>Update</Button>
                    <CategoryDelete id={record.id}/>
                </Space>
            ),
        },
      ];
    return(
        <>
            <Table columns={columns} dataSource={categories} />
        </>
    )
};

export default CategoryTable;