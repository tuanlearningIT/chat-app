import { Col, Row } from "antd"
import styled from 'styled-components';
import UserInfo from "./UserInfo";
import ZoomList from "./ZoomList";

const SidebarSlyted = styled.div`
background: #3f0e40;
color: white;
height: 100vh
`;
const SideBar = () => {

    return (
        <SidebarSlyted>
            <Row>
                <Col span={24}>
                    <UserInfo />
                </Col>
                <Col span={24}>
                    <ZoomList />
                </Col>
            </Row>
        </SidebarSlyted>

    )
}

export default SideBar;