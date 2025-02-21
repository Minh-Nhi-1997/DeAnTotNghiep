import React, { useContext, useEffect, useState } from 'react';
import { Button, Table, Tag, message, Popconfirm } from 'antd';
import { getProductApi, getCategoryApi, deleteProductApi } from "../../util/api";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/context/auth.context';
const ProductPage = () => {
const [categorySeleted, setCategorySeleted] = useState();
const {setAppLoading} = useContext(AuthContext);
    const navigate = useNavigate();
    // Dữ liệu sản phẩm
    const [productsData, setDataSource] = useState([]);
    // Dữ liệu category
    const [categoryData, setCategoryData] = useState([]);

    const fetchProduct = async (c_id) => {
        const res = await getProductApi(c_id);
        if (res) {
            setDataSource(res);
        }
    };

    const fetchCategory = async () => {
        const res = await getCategoryApi();
        if (res) {
            setCategoryData(res);
            setCategorySeleted(res[0]._id); // Chọn category đầu tiên mặc định
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    useEffect(() => {
        if (categorySeleted) {
            fetchProduct(categorySeleted);
        }
    }, [categorySeleted]);

    const filter = (id) => {
        setCategorySeleted(id);
    };
    const confirm = (id) => {
        deleteItem(id)
        // console.log(e);
        message.success('Xoá thành công');
      };
     
    const deleteItem = async (itemId) => {
        // setAppLoading(true);
        const res = await deleteProductApi(itemId);
        if (res) {

            fetchProduct(categorySeleted);
            // setAppLoading(false);
        }
    }

    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'img',
            key: 'img',
            render: (img) => (
                <img src={img} alt="product" style={{ height: '50px', objectFit: 'cover' }} />
            ),
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) => <span style={{ color: 'red' }}>{price} VNĐ</span>,
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <div>
                    <Popconfirm
                        title="Delete Item"
                        description={"Bạn có chắc chắn muốn xóa sản phẩm " + record.name + " ?"}
                        onConfirm={()=>confirm(record._id)}
                        onCancel={()=> {}}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" danger>Xóa</Button>
                    </Popconfirm>
                    
                    <Button type="link" onClick={()=> {
                        navigate(`/admin/post-item/${record._id}`)
                    }}>Sửa</Button>
                </div>
            ),
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Danh sách sản phẩm</h1>

            <div className="category">
                {categoryData?.map((category) => (
                    <Tag
                        key={category._id}
                        color={categorySeleted === category._id ? 'blue' : 'default'}
                        onClick={() => filter(category._id)}
                        style={{ cursor: 'pointer', marginBottom: '10px' }}
                    >
                        {category.name}
                    </Tag>
                ))}
            </div>

            {/* Bảng danh sách sản phẩm */}
            <Table
                dataSource={productsData}
                columns={columns}
                rowKey={(record) => record._id}
                pagination={{ pageSize: 5 }}
                style={{ marginTop: '20px' }}
            />
        </div>
    );
};

export default ProductPage;