import { Row, Col, Button, Typography } from 'antd'
import firebase, { auth, db } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import AddDocument, { generateKeywords } from '../../firebase/Services';
const { Title } = Typography;
const fbProvider = new firebase.auth.FacebookAuthProvider()

const Login = () => {
    const handleLogin = async () => {

        const { additionalUserInfo, user } = await auth.signInWithPopup(fbProvider)

        if (additionalUserInfo?.isNewUser) {
            AddDocument('users', {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: additionalUserInfo.providerId,
                keywords: generateKeywords(user.displayName)
            })
        }
    }
    const history = useNavigate()
    auth.onAuthStateChanged((user) => {
        if (user) {
            history('/')
        }
    })
    return (
        <div>
            <Row justify='center' style={{ "height": "800" }}>
                <Col span={8}>
                    <Title style={{ 'textAlign': 'center' }} >Fun chat</Title>
                    <Button style={{ 'width': '100%', 'marginBottom': '5' }}>
                        Đăng nhập bằng Google
                    </Button>
                    <Button style={{ 'width': '100%' }} onClick={handleLogin}>
                        Đăng nhập bằng Facebook
                    </Button>
                </Col>
            </Row>

        </div>
    )
}

export default Login;