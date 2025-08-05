import { useEffect, useReducer, useState } from 'react'
import type StateInterface from '../types/StateInterface'
import AuthContext from '../contexts/AuthContext'
import AuthReducer from '../reducers/AuthReducer'
import axiosGuest from '../axios/axiosGuest'

export default function AuthState({ 
    children
}: StateInterface) {
    const initialState = {
        auth: null
    }

    const [loading, setLoading] = useState(true)
    const [state, dispatch] = useReducer(AuthReducer, initialState)
    
    useEffect(() => {
        (async () => {
            setLoading(true)
            await getAuth()
            setLoading(false)
        })()
    }, []);


    const getAuth = async () => {
        const token = JSON.parse(localStorage.getItem('accessToken'))
        if(token){
            try{
                const res = await axiosGuest.get('/users/user', {
                    headers:{
                    Authorization: `Bearer ${token}` 
                    }
                })

                dispatch({
                    type: 'GET_AUTH',
                    auth: res.data
                })
        
            }catch(err){
                console.log('err', err)
            }
        }
    }

    const logout = async () => {
        localStorage.removeItem('accessToken')
        dispatch({
            type: 'LOGOUT'
        })
    }

    // const logout = async () => {
    //     setLoading(true)
    //     try {
    //         await signOut(auth)
    //         dispatch({ type: "GET_USER", auth: null })
    //         toast.success('Çıkış yapıldı')
    //     } catch (err: any) {
    //         const message = getFirebaseErrorMessage(err.code || err.message)
    //         toast.error(message)
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    // const toggleFavorite = async (blogId: string) => {
    //     if (!state.auth) {
    //     toast.error("Lütfen önce giriş yapın")
    //     return
    //     }
    //     const userRef = doc(db, "users", state.auth.id)
    //     try {
    //     if (state.auth.favorites.includes(blogId)) {
    //         await updateDoc(userRef, {
    //         favorites: arrayRemove(blogId)
    //         })
    //     } else {
    //         await updateDoc(userRef, {
    //         favorites: arrayUnion(blogId)
    //         })
    //     }
    //     dispatch({ type: "TOGGLE_FAVORITE", blogId })
    //     toast.success(
    //         state.auth.favorites.includes(blogId)
    //         ? "Favorilerden çıkarıldı"
    //         : "Favorilere eklendi"
    //     )
    //     } catch (err: any) {
    //     console.error(err)
    //     toast.error("Favori güncellenirken hata oluştu")
    //     }
    // }

    return (
        <AuthContext.Provider value={{
            loading: loading,
            auth: state.auth,
            getAuth,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}
