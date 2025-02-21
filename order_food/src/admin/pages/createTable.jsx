import React from 'react';
import { Button, Form, Input, InputNumber, notification } from 'antd';
import { createTableApi } from '../../util/api';

const CreateTablePage = () => {
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        const { table_name, capacity, notes } = values;
        const res = await createTableApi(table_name, capacity, notes);
        if (res) {
            notification.success({
                message: 'Thành công',
                description: 'Bàn đã được tạo thành công.',
                placement: 'topRight'
            }); // ✅ Hiển thị thông báo thành công
            form.resetFields();
        } else {
            notification.error({
                message: 'Lỗi',
                description: 'Không thể tạo bàn, vui lòng thử lại.',
            });
        }
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Thất bại:', errorInfo);
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '50px',
                backgroundColor: '#f4f4f4',
                padding: '20px',
            }}
        >
            <Form
                form={form}
                name="createTableForm"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    width: '100%',
                    maxWidth: '500px',
                    background: 'white',
                    padding: '40px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                {/* Tiêu đề */}
                <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Thêm Bàn</h2>

                {/* Trường 1: Tên bàn */}
                <Form.Item
                    label="Tên bàn"
                    name="table_name"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên bàn!',
                        },
                    ]}
                >
                    <Input placeholder="Nhập tên bàn" />
                </Form.Item>

                {/* Trường 2: Sức chứa */}
                <Form.Item
                    label="Sức chứa"
                    name="capacity"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập sức chứa!',
                        },
                    ]}
                >
                    <InputNumber
                        placeholder="Nhập sức chứa"
                        style={{ width: '100%' }}
                        min={1}
                    />
                </Form.Item>

                {/* Trường 3: Ghi chú */}
                <Form.Item
                    label="Ghi chú"
                    name="notes"
                    rules={[
                        {
                            required: false,
                        },
                    ]}
                >
                    <Input placeholder="Nhập ghi chú (nếu có)" />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                            width: '100%',
                            backgroundColor: '#1890ff',
                            borderColor: '#1890ff',
                            borderRadius: '4px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                        }}
                    >
                        Thêm bàn
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateTablePage;
