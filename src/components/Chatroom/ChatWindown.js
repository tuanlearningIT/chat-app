import { UserAddOutlined } from "@ant-design/icons";
import { Alert, Avatar, Button, Form, Input, Tooltip } from "antd";
import { useContext, useMemo, useState, useRef } from "react";
import styledComponents from "styled-components";
import { AppContext } from "../../context/AppProvider";
import { AuthContext } from "../../context/AuthProvider";
import AddDocument from "../../firebase/Services";
import UseFirestores from "../../hooks/UseFirestores";
import InviteMembersModal from "../Modals/InviteMembersModal";
import Message from "./Message";

const HeaderStyled = styledComponents.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230,230,230);
  .header {
    &__info {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    &__title {
        margin: 0;
        font-weight: bold;
    }
    &__description {
         font-size: 12px
     }
  }
    .invite{
        background-color: #eee;
        margin-right: 5px;
        border-radius: 2px;
    }

`;
const ButtonStyled = styledComponents.div`
  display: flex;
  align-items: center;
`;
const MessageListStyled = styledComponents.div`
  max-height; 100%;
  overflow-y: auto;
`;
const WrapperStyled = styledComponents.div`
  height: 100vh
`
const ContentStyled = styledComponents.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;

`;
const FormStyled = styledComponents(Form)`
   display: flex;
   justify-content: space-between;

   padding: 2px 2px 2px 0;
   border: 1px solid rgb(230, 230, 230);
   border-radius: 2px;

   .ant-form-item {
      flex: 1;
      margin-bottom: 0;
   }
`
/**
 * db: collection "user"
 * {
 * displayName: "Tuan"
 * keywords: ["T", "u", ...]
 * ....
 * } 
 * displayName: "DUnxg"
 * ....
 * } 
 */
const ChatWindown = () => {
    const { selectedRoom, members, isViviteMembeVisible, setIsViviteMembeVisible } = useContext(AppContext)
    const { user: { uid, photoURL, displayName } } = useContext(AuthContext)
    const [inputValue, setInputValue] = useState('')
    const inputRef = useRef(null);
    const [form] = Form.useForm()
    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleOnSubmit = () => {
        AddDocument('messages', {
            text: inputValue,
            uid,
            photoURL,
            roomId: selectedRoom.id,
            displayName
        })
        form.resetFields(['message'])
        // focus to input again after submit
        if (inputRef?.current) {
            setTimeout(() => {
                inputRef.current.focus();
            });
        }
    }
    const condittion = useMemo(() => ({
        fieldName: 'roomId',
        operator: '==',
        compareValue: selectedRoom.id,
    }), [selectedRoom.id])
    const messages = UseFirestores('messages', condittion)
    return (
        <WrapperStyled>
            {
                selectedRoom.id ?
                    (<>
                        <HeaderStyled>
                            <div className="header__info">
                                <p className="header__title">{selectedRoom.name}</p>
                                <span className="header__description">
                                    {selectedRoom.description}
                                </span>
                            </div>
                            <ButtonStyled>
                                <Button className="invite" type="text" icon={<UserAddOutlined />} onClick={setIsViviteMembeVisible.bind(this, true)}>Mời</Button>
                                <Avatar.Group maxCount={2} >
                                    {
                                        members.map((member) =>
                                        (<Tooltip title={member.displayName} key={member.id}>
                                            <Avatar size='large' src={member.photoURL}>{member.photoURL ? "" : member.displayName?.charAt(0)?.toUpperCase()}</Avatar>
                                        </Tooltip>))
                                    }

                                </Avatar.Group>
                                <InviteMembersModal />
                            </ButtonStyled>

                        </HeaderStyled>
                        <ContentStyled>
                            <MessageListStyled>
                                {
                                    messages.map((mes) =>
                                        (<Message key={mes.id} text={mes.text} displayName={mes.displayName} createdAt={mes.createdAt} photoURL={mes.photoURL} />))
                                }
                            </MessageListStyled>
                            <FormStyled form={form}>
                                <Form.Item name='message'>
                                    <Input
                                        ref={inputRef}
                                        onChange={handleInputChange}
                                        onPressEnter={handleOnSubmit}
                                        placeholder="Nhập tin nhắn..."
                                        bordered={false}
                                        autoComplete='off'
                                    />
                                </Form.Item>
                                <Button type="primary" onClick={handleOnSubmit}>
                                    Gửi
                                </Button>
                            </FormStyled>
                        </ContentStyled>
                    </>) : <Alert message="Hãy chọn phòng" type="info" showIcon style={{ 'margin': 5 }} />

            }

        </WrapperStyled>
    )
}

export default ChatWindown;