import { Tabs } from "antd"
import ProductForm from "../../components/ProductForm"
import { useState } from "react"
import Upload from './../../components/Upload';

const ManageProduct = ({ setActiceTabKey, getProducts, editMode, editProductId }) => {
    const [productActiveTabKey, setProductActiveTabKey] = useState("1")

    const items = [
        {
            key: '1',
            label: 'Products Details',
            children: <ProductForm setActiceTabKey={setActiceTabKey} getProducts={getProducts} editMode={editMode} editProductId={editProductId}></ProductForm>,
        },
        editMode ? {
            key: '2',
            label: 'Product Images',
            children: <Upload setActiceTabKey={setActiceTabKey} editProductId={editProductId} />,
        } : null
    ]

    const onChangeHandler = (key) => {
        setProductActiveTabKey(key)
    }

    return (
        <Tabs activeKey={productActiveTabKey} onChange={key => { onChangeHandler(key) }} items={items} />
    )
}

export default ManageProduct

