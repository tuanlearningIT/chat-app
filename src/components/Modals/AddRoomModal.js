import { Form, Input, Modal } from "antd";
import { useContext, } from "react";
import { AppContext } from "../../context/AppProvider";
import { AuthContext } from "../../context/AuthProvider";
import AddDocument from "../../firebase/Services";

const AddRoomModal = () => {
    const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext)
    const { user: { uid } } = useContext(AuthContext)
    const [form] = Form.useForm()
    const handleOk = () => {
        //handle logic 
        //add new room to firebase
        AddDocument('rooms', { ...form.getFieldsValue(), members: [uid] })
        form.resetFields();
        setIsAddRoomVisible(false)
    }

    const handleCancel = () => {
        form.resetFields();
        setIsAddRoomVisible(false)
    }
    return (
        <div>
            <Modal
                title='Tạo phòng'
                visible={isAddRoomVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout='vertical'>
                    <Form.Item label='Tên phòng' name='name'>
                        <Input placeholder="Nhập tên phòng" />
                    </Form.Item>
                    <Form.Item label='Mô tả' name='description'>
                        <Input.TextArea placeholder="Nhập mô tả" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default AddRoomModal;

