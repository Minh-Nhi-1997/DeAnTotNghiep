import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, notification, Select } from 'antd';
import { createItemApi, editItemApi, getCategoryApi, getOneProductApi } from '../../util/api';
import { useNavigate, useParams } from 'react-router-dom';

const CreateItemPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    // Lây item id ở trên đường link 
    const { i_id } = useParams();
    // Dữ item detail
    const [data, setData] = useState();
    // Dữ liệu category
    const [categoryData, setCategoryData] = useState([]);
    const fetchCategory = async () => {
        const res = await getCategoryApi();
        console.log(res)
        if (res) {
            setCategoryData(res);
        }
    };
    const fetchItem = async (i_id) => {
        const res = await getOneProductApi(i_id);
        console.log(res)
        if (res) {
            setData(res)
        }

    };
    useEffect(() => {
        fetchCategory();
    }, []);


    useEffect(() => {
        if (i_id) {
            fetchItem(i_id);
        } else {
            setData(null)
        }
    }, [i_id]);
    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                name: data.name,
                price: data.price,
                img: data.img,
                c_id: data.c_id,
            });
        } else {
            form.setFieldsValue({
                name: "",
                price: "",
                img: "",
                c_id: null,
            });
        }
    }, [data]);

    const onFinish = async (values) => {
        const { name, price, img, c_id } = values;
        let res = null;
        if(i_id) {
             res = await editItemApi(i_id, name, price, img, c_id);
        } else {
             res = await createItemApi(name, price, img, c_id);
        }
        

        if (res) {
            notification.success({
                message: "Hành động",
                description: "Thành công",
            });
            form.resetFields();
        } else {
            notification.error({
                message: "CREATE ITEM",
                description: "Error occurred!",
            });
        }
        console.log('>>> Success:', res);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                minHeight: "100vh",
                backgroundColor: "#f9f9f9",
                padding: "20px",
            }}
        >
            <div
                style={{
                    background: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    padding: "40px",
                    width: "100%",
                    maxWidth: "600px",
                    marginTop: "20px",
                }}
            >
                <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
                    {/* Nếu code id thì hiển thị chị tiết món ăn và chỉnh sửa */}
                    {i_id ? "Sửa Món Ăn" : "Thêm Món Ăn"}
                </h1>

                <Form
                    form={form}
                    name="EditItem"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    {/* Trường 1: Name */}
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input the name!",
                            },
                        ]}
                    >
                        <Input placeholder="Enter food name" />
                    </Form.Item>

                    {/* Trường 2: Price */}
                    <Form.Item
                        label="Price (VNĐ)"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: "Please input the price!",
                            },
                        ]}
                    >
                        <InputNumber
                            placeholder="Enter price in VNĐ"
                            style={{ width: "100%" }}
                            min={0}
                            parser={(value) => Math.floor(Number(value.replace(/\$\s?|(,*)/g, '')))}
                        />
                    </Form.Item>

                    {/* Trường 3: Image URL */}
                    <Form.Item
                        label="Image URL"
                        name="img"
                        rules={[
                            {
                                required: true,
                                message: "Please input the image URL!",
                            },
                            {
                                type: "url",
                                message: "Please enter a valid URL!",
                            },
                        ]}
                    >
                        <Input placeholder="Enter image URL" />
                    </Form.Item>
                    {/* Trường 3: Category */}
                    <Form.Item
                        label="Category"
                        name="c_id"
                        rules={[
                            {
                                required: true,
                                message: "Please select the category!",
                            }
                        ]}
                    >
                        <Select>
                            {
                                categoryData?.map((catefory, index) => (
                                    <Select.Option key={index} value={catefory._id}>{catefory.name}</Select.Option>
                                ))
                            }

                        </Select>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>


            </div>
        </div>
    );
};

export default CreateItemPage;
