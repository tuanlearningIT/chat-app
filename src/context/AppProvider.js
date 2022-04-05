
import { createContext, useContext, useMemo, useState } from 'react';
import UseFirestores from '../hooks/UseFirestores';
import { AuthContext } from './AuthProvider';

export const AppContext = createContext()

const AppProvider = ({ children }) => {
    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false)
    const [isViviteMembeVisible, setIsViviteMembeVisible] = useState(false)
    const [selectedRoomId, setSelectedRoomId] = useState("")
    const { user: { uid } } = useContext(AuthContext)
    const roomsCondittion = useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: uid
        }
    }, [uid])
    const rooms = UseFirestores('rooms', roomsCondittion)
    const selectedRoom = useMemo(
        () => rooms.find((room) => room.id === selectedRoomId) || {},
        [rooms, selectedRoomId]
    )
    const usersCondittion = useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: selectedRoom.members
        }
    }, [selectedRoom.members])
    const members = UseFirestores('users', usersCondittion)

    return (
        <AppContext.Provider value={{
            rooms, members, isAddRoomVisible, setIsAddRoomVisible,
            selectedRoomId, setSelectedRoomId, selectedRoom,
            isViviteMembeVisible, setIsViviteMembeVisible
        }}>
            {children}
        </AppContext.Provider>
    )

}

export default AppProvider;