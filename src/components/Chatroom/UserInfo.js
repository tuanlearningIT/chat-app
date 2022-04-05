import { Avatar, Button, Typography } from "antd";
import { eachDayOfInterval } from "date-fns";
import { useContext, useEffect } from "react";
import styled from 'styled-components';
import { AuthContext } from "../../context/AuthProvider";
import { auth, db } from "../../firebase/config";
const WrapperStyled = styled.div`
display: flex;
justify-content: space-between;
padding: 12px 16px;
border-bottom: 1px solid rgba(82, 38, 83);

.username{
color: white;
margin-left: 5px
}
`
const UserInfo = () => {
    const { user: {
        displayName,
        photoURL
    } } = useContext(AuthContext)
    return (
        <WrapperStyled>
            <div>
                <Avatar size='large' src={photoURL}>{photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}</Avatar>
                <Typography.Text className="username">{displayName}</Typography.Text>
            </div>
            <Button ghost onClick={() => auth.signOut()}>Đăng xuất</Button>

        </WrapperStyled>

    )
}

export default UserInfo;