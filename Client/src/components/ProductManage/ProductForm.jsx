import { Checkbox, Col, Form, Input, message, Row, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { SquaresPlusIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/solid"

import { getOldProduct, sellProduct, updateProduct } from "../../apicalls/product"
import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from "react-redux"
import { setLoader } from '../../store/slices/loaderSlice'

const ProductForm = ({ setActiceTabKey, getProducts, editMode, editProductId }) => {
    const [form] = Form.useForm();
    const [sellerId, setSellerId] = useState(null)

    const isProcessing = useSelector(state => state.reducer.loader.isProcessing)
    const dispatch = useDispatch()

    const options = [
        { value: 'electronics_and_gadgets', label: 'Electronics and Gadgets', },
        { value: 'clothing_and_fashion', label: 'Clothing and Fashion', },
        { value: 'home_and_furniture', label: 'Home and Furniture', },
        { value: 'books_and_media', label: 'Books and Media', },
        { value: 'beauty_and_personal_care', label: 'Beauty and PersonalCare', },
        { value: 'furnsports_and_fitnessiture', label: 'Sports and Fitness', },
        { value: 'toys_and_games', label: 'Toys and Games', },
    ];

    const checkBoxOptions = [
        { label: 'Accessories', value: 'Accessories', },
        { label: 'Wrranty', value: 'Wrranty', },
        { label: 'Vocher', value: 'Vocher', },
    ];

    const onFinishHandler = async (values) => {
        dispatch(setLoader(true))
        const payload = {
            ...values,
            product_details: values.product_details || []
        };

        try {
            let response;
            if (editMode) {
                values.seller_id = sellerId
                values.product_id = editProductId
                response = await updateProduct(values)
            } else {
                response = await sellProduct(payload)
            }
            if (response.isSuccess) {
                form.resetFields()
                message.success(response.message)
                getProducts()
                setActiceTabKey("1")
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            message.error(error.message)
        }
        dispatch(setLoader(false))
    }

    const getOldProductData = async () => {
        try {
            const response = await getOldProduct(editProductId);
            if (response.isSuccess) {
                message.success("Edit mode on!!")
                const { name, description, price, usedFor, category, details, seller } = response.productDoc;
                setSellerId(seller);
                const modifiedProduct = {
                    product_name: name,
                    product_description: description,
                    product_price: price,
                    product_category: category,
                    product_used_for: usedFor,
                    product_details: details
                }
                form.setFieldsValue(modifiedProduct)
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            message.error(error.message)
        }
    }

    useEffect((_) => {
        if (editMode) {
            getOldProductData()
        } else {
            form.resetFields()
        }
    }, [editMode])

    return (
        <section>
            <h1 className='text-2xl font-bold my-2'>{editMode ? "Update your Product Here." : "What you want to sell ?"}</h1>
            <Form layout='vertical' onFinish={onFinishHandler} form={form} >
                <Form.Item name="product_name" label="Product Name :" rules={[
                    { required: true, message: "Product name must contain" }
                ]} hasFeedback>
                    <Input placeholder='product name ...' />
                </Form.Item>
                <Form.Item name="product_description" label="Product Description :" rules={[
                    { required: true, message: "Product desctiption must contain" }
                ]} hasFeedback>
                    <TextArea rows={4} />
                </Form.Item>
                {/* Grid => 1 row - 24 span */}
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item name="product_price" label="Product Price :" rules={[
                            { required: true, message: "Product price must contain" }
                        ]} hasFeedback>
                            <Input type='number' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="product_category" label="Choose a category :" rules={[
                            { required: true, message: "Product category must choose" }
                        ]} hasFeedback>
                            <Select defaultValue={""} options={options} />

                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="product_used_for" label="Use for :" rules={[
                            { required: true, message: "Product's used time must write" }
                        ]} hasFeedback>
                            <Input placeholder='eg, 3 months ago ...' />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item name="product_details" label="Check if you  have :">
                    <Checkbox.Group options={checkBoxOptions} defaultValue={[]} />
                </Form.Item>
                <button className='font-medium text-lg text-center my-4 rounded-md bg-blue-500 text-white flex items-center gap-2 justify-center w-full' disabled={isProcessing}>
                    {isProcessing ? <>isSubmitting<EllipsisHorizontalIcon width={40} /> </> : editMode ? <><SquaresPlusIcon width={40} /> Update Products</> : <><SquaresPlusIcon width={40} /> Sell Products</>}
                </button>
            </Form>
        </section>
    )
}

export default ProductForm

