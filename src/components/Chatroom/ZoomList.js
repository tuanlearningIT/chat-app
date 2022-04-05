import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Collapse, Typography } from "antd";
import { useContext, useMemo } from "react";
import styledComponents from 'styled-components';
import { AppContext } from "../../context/AppProvider";
import { AuthContext } from "../../context/AuthProvider";
import UseFirestores from "../../hooks/UseFirestores";
import AddRoomModal from "../Modals/AddRoomModal";
const { Panel } = Collapse

const PanelStyled = styledComponents(Panel)`
&&& {
    .ant-collapse-header, p {
        color: white;
    }
    .ant-collapse-content-box {
        padding: 0 40px;
    }
    .add-room {
        color: white;
        padding: 0;
    }
}
`;
const LinkStyled = styledComponents(Typography.Link)`
display: block;
margin-bottom: 5px;
color: white !important;
`;
const ZoomList = () => {
    const { rooms, setIsAddRoomVisible, selectedRoomId, setSelectedRoomId } = useContext(AppContext)
    /**
     * {
     * name: 'room name'
     * description: 'mo ta'
     * member: [uid1, uid2, ...]
     * }
     */

    console.log({ rooms })
    return (
        <>
            <Collapse ghost defaultActiveKey={'1'}>
                <PanelStyled header="Danh sách các phòng" key='1'>
                    {
                        rooms.map((room) => (<LinkStyled key={room.id} onClick={() => setSelectedRoomId(room.id)}>{room.name}</LinkStyled>))
                    }
                    <Button type="text" icon={<PlusSquareOutlined />} className='add-room' onClick={setIsAddRoomVisible.bind(this, true)}>Thêm phòng </Button>

                </PanelStyled>
            </Collapse>
            <AddRoomModal />
        </>

    )
}

export default ZoomList;