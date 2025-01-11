import { Checkbox, Col, Form, Input, Row, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { SquaresPlusIcon } from "@heroicons/react/24/solid"

const AddProduct = () => {
    const options = [
        {
            value: 'electronics',
            label: 'Electronics',
        },
        {
            value: 'fashion',
            label: 'Fashion',
        },
        {
            value: 'home_appliances',
            label: 'Home Appliances',
        },
        {
            value: 'books',
            label: 'Books',
        },
        {
            value: 'toys',
            label: 'Toys',
        },
        {
            value: 'furniture',
            label: 'Furniture',
        },
    ];

    const checkBoxOptions = [
        {
            label: 'Accessories',
            value: 'Accessories',
        },
        {
            label: 'Wrranty',
            value: 'Wrranty',
        },
        {
            label: 'Vocher',
            value: 'Vocher',
        },
    ];

    return (
        <section>
            <h1 className='text-2xl font-bold my-2'>What you want to sell ?</h1>
            <Form layout='vertical'>
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
                    <Checkbox.Group options={checkBoxOptions} defaultValue={['']} />
                </Form.Item>
                <button className='font-medium text-lg text-center my-4 rounded-md bg-blue-500 text-white flex items-center gap-2 justify-center w-full'>
                    <SquaresPlusIcon width={40} />
                    Sell
                </button>
            </Form>
        </section>
    )
}

export default AddProduct