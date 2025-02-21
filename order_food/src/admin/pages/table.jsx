import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { Table, Button, Space, Popconfirm, Modal, Form, Input, InputNumber } from 'antd';
import { getTableApi, editTableApi, deleteTableApi } from '../../util/api'; // Thêm API chỉnh sửa bàn

const TablePage = () => {
    const [tables, setTables] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTable, setEditingTable] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchTables();
    }, []);

    const fetchTables = async () => {
        try {
            const res = await getTableApi();
            if (res) setTables(res);
        } catch (error) {
            console.error("Không thể tải danh sách bàn:", error);
        }
    };

    const handleEdit = (record) => {
        setEditingTable(record);
        form.setFieldsValue(record); // Điền dữ liệu cũ vào form
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteTableApi(id); // Gọi API xóa
            message.success("Xóa bàn thành công!"); // 🔔 Hiển thị thông báo thành công
            fetchTables(); // Làm mới danh sách sau khi xóa
        } catch (error) {
            message.error("❌ Lỗi khi xóa bàn!"); // 🔔 Hiển thị thông báo lỗi
            console.error("Lỗi khi xóa bàn:", error);
        }
    };

    const handleSaveEdit = async () => {
        try {
            const values = await form.validateFields();
            await editTableApi(editingTable._id, values); // Gửi API cập nhật
            message.success("Cập nhật bàn thành công!");
            setIsModalOpen(false);
            fetchTables(); // Làm mới danh sách
        } catch (error) {
            console.error("Lỗi khi cập nhật bàn:", error);
        }
    };

    const columns = [
        { title: 'Tên bàn', dataIndex: 'table_name', key: 'table_name' },
        { title: 'Sức chứa', dataIndex: 'capacity', key: 'capacity' },
        { title: 'Ghi chú', dataIndex: 'notes', key: 'notes' },
        {
            title: 'Hành động',
            key: 'actions',
            render: (text, record) => (
                <Space>
                    <Button type="primary" onClick={() => handleEdit(record)}>Sửa</Button>
                    <Popconfirm title="Bạn có chắc chắn muốn xóa?" onConfirm={() => handleDelete(record._id)} okText="Có" cancelText="Không">
                        <Button type="danger">Xóa</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Danh sách bàn</h2>
            <Table columns={columns} dataSource={tables} rowKey="_id" pagination={{ pageSize: 5 }}/>

            <Modal
                title="Chỉnh sửa bàn"
                open={isModalOpen}
                onOk={handleSaveEdit}
                onCancel={() => setIsModalOpen(false)}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="table_name" label="Tên bàn" rules={[{ required: true, message: "Vui lòng nhập tên bàn!" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="capacity" label="Sức chứa" rules={[{ required: true, message: "Vui lòng nhập sức chứa!" }]}>
                        <InputNumber min={1} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="notes" label="Ghi chú">
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default TablePage;
