import React, { useState, useEffect } from 'react';
import { Table, Button, notification, Typography, Card } from 'antd';
import { Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getTableApi } from '../../util/api';

const { Title } = Typography;

const TablePage = () => {
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchTables = async () => {
            try {
                const res = await getTableApi();
                if (res) {
                    setTables(res);
                }
            } catch (error) {
                console.error("Không thể tải danh sách bàn:", error);
            }
        };
        fetchTables();
    }, []);

    const handleRowSelection = (selectedRowKeys, selectedRows) => {
        setSelectedTable(selectedRows[0]);
    };

    const handleSelectButton = () => {
        if (selectedTable) {
            localStorage.setItem("selectedTable", JSON.stringify(selectedTable));
            navigate("/");
            console.log(selectedTable);
        } else {
            notification.error({
                message: 'Chưa chọn bàn',
                description: 'Vui lòng chọn một bàn trước khi tiếp tục.',
            });
        }
    };

    const columns = [
        {
            title: 'Tên Bàn',
            dataIndex: 'table_name',
            key: 'table_name',
        },
        {
            title: 'Sức chứa',
            dataIndex: 'capacity',
            key: 'capacity',
        },
        {
            title: 'Ghi chú',
            dataIndex: 'notes',
            key: 'notes',
        },
    ];

    const rowSelection = {
        type: 'radio',
        onChange: handleRowSelection,
    };

    return (
        <Row justify="center" align="middle" style={{ minHeight: "100vh", background: "#f4f6f8" }}>
            <Col xs={24} sm={18} md={12} lg={10}>
                <Card style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)", borderRadius: "10px", padding: "20px" }}>
                    <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>Vui lòng chọn một bàn!</Title>
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={tables}
                        rowKey="_id"
                        style={{ background: 'white', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                    />
                    <Button
                        type="primary"
                        onClick={handleSelectButton}
                        style={{ marginTop: '20px', display: 'block', width: '100%' }}
                    >
                        Tiếp tục
                    </Button>
                </Card>
            </Col>
        </Row>
    );
};

export default TablePage;