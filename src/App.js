
import './App.css';
import Login from './components/Login/Login';
import ChatRoom from './components/Chatroom/ChatRoom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import AuthProvider from './context/AuthProvider';
import AppProvider from './context/AppProvider';
import AddRoomModal from './components/Modals/AddRoomModal';
function App() {
  return (

    <Router>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route path="/" element={<ChatRoom />} />
            <Route path="/login" element={<Login />} />
          </Routes>

        </AppProvider>

      </AuthProvider>

    </Router>



  );
}

export default App;
