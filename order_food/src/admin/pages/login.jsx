import React, { useContext } from 'react';
import { Button, Col, Form, Input, notification, Row, Typography, Card } from 'antd';
import { loginApi } from '../../util/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/context/auth.context';

const { Title } = Typography;

const LoginPage = () => {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);

    const onFinish = async (values) => {
        const { email, password } = values;

        const res = await loginApi(email, password, 'admin');

        if (res && res.EC === 0) {
            localStorage.setItem("access_token", res.access_token);
            setAuth({
                isAuthenticated: true,
                user: {
                    email: res?.user?.email ?? "",
                    name: res?.user?.name ?? "",
                    role: res?.user?.role ?? "",
                }
            });
            navigate("/admin/");
        } else {
            notification.error({
                message: "Đăng nhập thất bại",
                description: res?.EM ?? "Lỗi không xác định",
            });
        }
    };

    return (
        <Row justify="center" align="middle" style={{ minHeight: "100vh", background: "#f0f2f5" }}>
            <Col xs={24} sm={18} md={12} lg={8}>
                <Card style={{ padding: "20px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
                    <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>Đăng Nhập</Title>
                    <Form
                        name="login-form"
                        onFinish={onFinish}
                        autoComplete="off"
                        layout="vertical"
                    >
                        <Form.Item
                            label="Tài khoản"
                            name="email"
                            rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}
                        >
                            <Input size="large" />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                        >
                            <Input.Password size="large" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block style={{ height: "40px" }}>
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
};

export default LoginPage;
