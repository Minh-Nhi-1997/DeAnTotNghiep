import React, { useEffect, useState } from 'react';
import { Button, Card, Row, Col, Modal, List, message } from 'antd';
import { getProductApi, getCategoryApi } from "../../util/api";

const ProductPage = () => {
    
    const selectedTable = localStorage.getItem("selectedTable");
    
        const tableObject =  selectedTable ? JSON.parse(selectedTable) : '';
    
    // console.log(JSON.stringify(selectedTable, null, 2));
    const [cart, setCart] = useState([]); // Giỏ hàng
    const [open, setOpen] = useState(false); // Hiển thị giỏ hàng
    const [isLoading, setIsLoading] = useState(false); // Trạng thái xử lý thanh toán
    const [categorySelected, setCategorySelected] = useState();

    // Dữ liệu sản phẩm
    const [productsData, setProductsData] = useState([]);
    // Dữ liệu category
    const [categoryData, setCategoryData] = useState([]);

    const fetchProduct = async (c_id) => {
        const res = await getProductApi(c_id);
        if (res) setProductsData(res);
    };

    const fetchCategory = async () => {
        const res = await getCategoryApi();
        if (res) {
            setCategoryData(res);
            setCategorySelected(res[0]._id);
        }
    };

    useEffect(() => {
        fetchCategory();
        
        
    }, []);

    useEffect(() => {
        if (categorySelected) {
            fetchProduct(categorySelected);
        }
    }, [categorySelected]);

    // Thêm vào giỏ hàng
    const addToCart = (product) => setCart([...cart, product]);

    // Xóa khỏi giỏ hàng
    const removeFromCart = (id) => {
        const updatedCart = cart.filter((_, index) => index !== id);
        setCart(updatedCart);
    };

    // Thanh toán
    const handleCheckout = async () => {
        if (cart.length === 0) {
            message.warning("Giỏ hàng của bạn đang trống!");
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            message.success("Thanh toán thành công!");
            setCart([]);
            setOpen(false);
        }, 2000);
    };

    const totalPrice = cart.reduce((acc, item) => acc + Number(item.price), 0);
    const formattedPrice = totalPrice.toLocaleString('vi-VN');
    console.log(formattedPrice); // Ví dụ: "1.199.000"

    return (
        <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
            {/* Sidebar Menu */}
            <div style={{ width: '250px' }}>
                <h2 style={{ color: '#FF6600', marginBottom: '10px', textAlign: 'center' }}>Menu</h2>
                <hr />
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {categoryData.map((category) => (
                        <li
                            key={category._id}
                            onClick={() => setCategorySelected(category._id)}
                            style={{
                                padding: '10px 0',
                                fontWeight: categorySelected === category._id ? 'bold' : 'normal',
                                color: categorySelected === category._id ? '#FF6600' : '#000',
                                cursor: 'pointer'
                            }}
                        >
                            {category.name}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Product Grid */}
            <div style={{ flex: 1, marginTop: '50px' }}>
                <Row gutter={[16, 16]}>
                    {productsData.map((product, index) => (
                        <Col key={index} xs={24} sm={12} md={8}>
                            <Card
                                hoverable
                                style={{
                                    textAlign: 'center',
                                    borderRadius: '10px',
                                    overflow: 'hidden'
                                }}
                                cover={
                                    <img
                                        alt={product.name}
                                        src={product.img}
                                        style={{
                                            height: '180px',
                                            objectFit: 'cover'
                                        }}
                                    />
                                }
                            >
                                <h4>{product.name}</h4>
                                <p style={{ color: '#888' }}>{Number(product?.price)?.toLocaleString('vi-VN')} ₫</p>
                                <Button
                                    type="primary"
                                    onClick={() => addToCart(product)}
                                    style={{
                                        backgroundColor: '#FF6600',
                                        borderColor: '#FF6600'
                                    }}
                                >
                                    Thêm vào giỏ
                                </Button>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
                    
            {/* Cart Modal */}
            <Button
                type="default"
                onClick={() => setOpen(true)}
                style={{
                    position: 'fixed',
                    bottom: '20px',  // Đặt ở góc dưới
                    left: '20px',    // Đặt ở bên trái
                    backgroundColor: '#FF6600',
                    color: '#fff'
                }}
            >
                🛒 Giỏ hàng ({cart.length})
            </Button>
            <span
        style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: '#66FF99',
            color: '#440000',
            padding: '5px 10px',
            fontWeight: 'bold'
        }}
    >
        Table: {tableObject?.table_name}
    </span>
            <Modal
                title="Giỏ hàng"
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
            >
                <List
                    dataSource={cart}
                    renderItem={(item, index) => (
                        <List.Item key={index}>
                            <List.Item.Meta
                                title={item?.name}
                                description={`${Number(item?.price)?.toLocaleString('vi-VN')} ₫`}
                            />
                            <Button type="link" danger onClick={() => removeFromCart(index)}>
                                Xóa
                            </Button>
                        </List.Item>
                    )}
                />
                <div style={{ textAlign: 'right', marginTop: '20px' }}>
                    <p>Tổng: <span>{formattedPrice}</span> đ</p> {/* Hiển thị formattedPrice trực tiếp */}
                    <Button
                        type="primary"
                        onClick={handleCheckout}
                        loading={isLoading}
                        style={{
                            marginTop: '10px',
                            width: '100%',
                            backgroundColor: '#FF6600',
                            borderColor: '#FF6600'
                        }}
                    >
                        {isLoading ? 'Đang xử lý...' : 'Thanh toán'}
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default ProductPage;
