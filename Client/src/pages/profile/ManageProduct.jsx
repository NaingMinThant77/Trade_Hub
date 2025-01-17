import { Tabs } from "antd"
import ProductForm from "../../components/ProductForm"
import Upload from './../../components/Upload';

const ManageProduct = ({ setActiceTabKey, getProducts, editMode, editProductId, manageTabKey, setManageTabKey }) => {

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

    return (
        <Tabs activeKey={manageTabKey} onChange={(key) => setManageTabKey(key)} items={items} />

    )
}

export default ManageProduct

