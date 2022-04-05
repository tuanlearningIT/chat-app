import { Avatar, Form, Input, Modal, Select, Spin } from "antd";
import { useContext, useMemo, useState, } from "react";
import { AppContext } from "../../context/AppProvider";
import { AuthContext } from "../../context/AuthProvider";
import AddDocument from "../../firebase/Services";
import { debounce } from 'lodash'
import { db } from "../../firebase/config";
const DebounceSelect = ({ fetchOptions, debounceTimeout = 300, ...props }) => {

    const [fetching, setFetching] = useState(false)
    const [option, setOption] = useState([])

    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            setOption([])
            setFetching(true)

            fetchOptions(value, props.currentMemers).then(newOption => {
                setOption(newOption)
                setFetching(false)
            })
        }
        return debounce(loadOptions, debounceTimeout)
    }, [debounceTimeout, fetchOptions])
    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
        >
            {
                //[{lable: value, photoURL}]
                option.map(opt => (
                    <Select.Option key={opt.value} value={opt.value} title={opt.label}>
                        <Avatar size='small' src={opt.photoURL}>
                            {opt.photoURL ? '' : opt.lable?.charAt(0)?.toUpperCase()}
                        </Avatar>
                        {`${opt.label}`}
                    </Select.Option>
                ))
            }
        </Select>
    )
}
const fetchUserList = async (search, currentMemers) => {
    return await db.collection('users').where('keywords', 'array-contains', search).orderBy('displayName').limit(20).get().then(snapshot => {
        return snapshot.docs.map(doc => ({
            label: doc.data().displayName,
            value: doc.data().uid,
            photoURL: doc.data().photoURL
        })).filter(opt => currentMemers.includes(opt.value))
    })
}
const InviteMembersModal = () => {
    const { isViviteMembeVisible, setIsViviteMembeVisible, selectedRoomId, selectedRoom, } = useContext(AppContext)
    const { user: { uid } } = useContext(AuthContext)
    const [value, setValue] = useState([])
    const [form] = Form.useForm()
    const handleOk = () => {
        //handle logic 
        //add new member to firebase
        const roomRef = db.collection('rooms').doc(selectedRoomId)
        roomRef.update({
            members: [...selectedRoom.members, ...value.map((val) => val.value)]
        })
        form.resetFields();
        setIsViviteMembeVisible(false)
    }

    const handleCancel = () => {
        form.resetFields();
        setIsViviteMembeVisible(false)
    }
    console.log({ value })
    return (
        <div>
            <Modal
                title='Mời thêm thành viên'
                visible={isViviteMembeVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout='vertical'>
                    <DebounceSelect
                        mode="multiple"
                        label="Tên các thành viên"
                        value={value}
                        placeholder="Nhập tên các thành viên"
                        fetchOptions={fetchUserList}
                        onChange={newValue => setValue(newValue)}
                        style={{ 'width': '100%' }}
                        currentMemers={selectedRoom.members}
                    />
                </Form>
            </Modal>
        </div>
    )
}

export default InviteMembersModal;

