import { Col, Row } from "antd";

import ChatWindown from "./ChatWindown";
import SideBar from "./SideBar";

const ChatRoom = () => {

    return (
        <Row>
            <Col span={6}><SideBar /></Col>
            <Col span={18}><ChatWindown /></Col>
        </Row>
    )
}

export default ChatRoom;