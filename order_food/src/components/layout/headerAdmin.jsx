import React, { useContext, useState } from 'react';
import { 
    UsergroupAddOutlined, 
    HomeOutlined, 
    SettingOutlined, 
    TableOutlined, 
    ShoppingCartOutlined, 
    PlusOutlined, 
    FormOutlined, 
    LogoutOutlined 
} from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

const HeaderAdmin = () => {
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);

    const items = [
        {
            label: <Link to={"/admin/"}>Trang chủ</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to={"/admin/user"}>Người dùng</Link>,
            key: 'user',
            icon: <UsergroupAddOutlined />,
        },
        {
            label: <Link to={"/admin/post-item"}>Thêm món</Link>,
            key: 'createItem',
            icon: <PlusOutlined />,
        },
        {
            label: <Link to={"/admin/post-table"}>Thêm bàn</Link>,
            key: 'createTable',
            icon: <TableOutlined />,
        },
        {
            label: <Link to={"/admin/table"}>Danh sách bàn</Link>,
            key: 'listTable',
            icon: <FormOutlined />,
        },
        {
            label: <Link to={"/admin/product"}>Sản phẩm</Link>,
            key: 'product',
            icon: <ShoppingCartOutlined />,
        },
        {
            label: <Link to={"/admin/register"}>Đăng ký tài khoản</Link>,
            key: 'register',
            icon: <UsergroupAddOutlined />,
        },
        {
            label: `Xin chào, ${auth?.user?.name ?? ""}`,
            key: 'SubMenu',
            icon: <SettingOutlined />,
            children: [{
                label: (
                    <span onClick={() => {
                        localStorage.clear("access_token");
                        setAuth({
                            isAuthenticated: false,
                            user: null,
                        });
                        navigate('/admin/login');
                    }}>
                        <LogoutOutlined /> Đăng xuất
                    </span>
                ),
                key: 'logout',
            }]
        }
    ];

    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default HeaderAdmin;
