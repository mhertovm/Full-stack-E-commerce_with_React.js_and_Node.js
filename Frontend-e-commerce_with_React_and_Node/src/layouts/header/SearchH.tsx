import React from 'react';
import { useDispatch } from 'react-redux'
import { setSearchInput } from '../../counter/counterSlice'
import { Input, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Search } = Input;


const SearchH: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return(
         <Space direction="vertical">
            <Search placeholder="input search text" onSearch={(value) =>{ dispatch(setSearchInput(value)); navigate("/search")}} style={{ width: 200 }}/>
        </Space> 
    )
}

export default SearchH;