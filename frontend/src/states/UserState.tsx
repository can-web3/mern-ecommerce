import { useReducer } from 'react'
import UserReducer from '../reducers/UserReducer'
import UserContext from '../contexts/UserContext'
import type StateInterface from '../types/StateInterface'
import axiosGuest from '../axios/axiosGuest'

export default function UserState({ 
    children
}: StateInterface) {
    const initialState = {
        users: []
    }

    const [state, dispatch] = useReducer(UserReducer, initialState)

    const createUser = async (values: any)=> {
        try {
            const res = await axiosGuest.post('/users/register', { ...values })
            console.log('res', res)
            // toast.success('Kayıt başarılı');
            return true;
        }catch (err: any) {
            console.log('err', err)
            return false;
        }
    }

    return (
        <UserContext.Provider value={{
            users: state.users,
            createUser,
        }}>
            {children}
        </UserContext.Provider>
    )
}

