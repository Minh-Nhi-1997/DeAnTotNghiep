import React, { useContext, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { UsergroupAddOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

const HeaderUser = () => {
    const navigate = useNavigate();
    const {auth, setAuth} = useContext(AuthContext);
    console.log(">>> check auth: ", auth)
    const items = [
        ...(auth.isAuthenticated ? [{
            label: `Welcome ${auth?.user?.name ?? ""}`,
            key: 'SubMenu',
            icon: <UserOutlined />,
            children: [{
                label: <span onClick={()=> {
                    localStorage.clear("access_token");
                    setAuth({
                        isAuthenticated: false,
                        user: null,
                    });
                    navigate('/login');
                }}>Đăng xuất</span> ,
                key: 'logout',
            }]
        }] : []),
    ];

    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default HeaderUser;