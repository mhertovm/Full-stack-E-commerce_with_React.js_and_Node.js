import React, {useState, useEffect} from 'react';
import type { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { Button, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import NavbarDelete from './NavbarDelete';

const NavbarTable: React.FC = () => {
    const navigate = useNavigate()

    const {updateNavbarTable} = useSelector((state: RootState) => state.counter)

    type Navbar = {
        id: number;
        name: string
    }

    const [navbars, setNavbars]=useState<Navbar[]>([]);

    useEffect(()=>{
        fetch("http://localhost:3001/allnavbars")
        .then(res=> res.json())
        .then(data=>{
            setNavbars(data)});
    }, [updateNavbarTable]);

    const columns: ColumnsType<Navbar> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space key={record.id} size="middle">
                <Button onClick={()=>navigate(`/navbar-update/${record.id}`)}>Update</Button>
                <NavbarDelete id={record.id}/>
            </Space>
        ),
    },
    ];
    return(
        <>
            <Table columns={columns} dataSource={navbars} />
        </>
    )
};

export default NavbarTable;