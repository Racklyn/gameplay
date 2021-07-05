import React, {createContext, ReactNode, useContext, useState, useEffect} from 'react'

import * as AuthSession from 'expo-auth-session'
import AsyncStorage from '@react-native-async-storage/async-storage'

const {REDIRECT_URI} = process.env
const {SCOPE} = process.env
const {RESPONSE_TYPE} = process.env
const {CLIENT_ID} = process.env
const {CDN_iMAGE} = process.env

import { api } from '../services/api'
import {COLLECTION_APPOINTMENTS, COLLECTION_USER} from '../configs/database'


type User = {
    id: string;
    userName: string;
    firstName: string;
    avatar: string;
    email: string;
    token: string;
}

type AuthContextData = {
    user: User;
    loading: boolean;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;

}

type AuthProviderProps = {
    children: ReactNode,
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
    params:{
        access_token?: string; //chave de acesso ao Token, para poder pegar as informações do usuário
        error?: string;
    }
}

const AuthContext = createContext({} as AuthContextData)

//Retornando o Provider de Auth
function AuthProvider({children}:AuthProviderProps){
    const [user, setUser] = useState<User>({} as User)
    const [loading, setLoading] = useState(false)


    useEffect(()=>{
        loadUserStorageData()
    },[])


    async function signIn(){    
        try {
            setLoading(true)

            const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

            //authUrl: para o onde o usuário deve ir quando começão o processo de autentificação
            const {type, params} = await AuthSession.startAsync({authUrl}) as AuthorizationResponse

            if(type === 'success' && !params.error){
                api.defaults.headers.authorization = `Bearer ${params.access_token}`

                const userInfo = await api.get('/users/@me')

                const firstName = userInfo.data.username.split(' ')[0]

                // Atualizando o código do avatar para o endereço dela no servidor CDN
                userInfo.data.avatar = `${CDN_iMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`

                const userData = {
                    ...userInfo.data,
                    firstName,
                    token: params.access_token    
                }

                await AsyncStorage.setItem(COLLECTION_USER, JSON.stringify(userData))

                setUser(userData)

            }
        } catch {
            throw new Error("Não foi possível autenticar")
        }finally{
            setLoading(false)
        }
    }

    async function signOut() {
        setUser({} as User)
        await AsyncStorage.removeItem(COLLECTION_USER)
        // await AsyncStorage.removeItem(COLLECTION_APPOINTMENTS)
    }

    async function loadUserStorageData(){
        const storage = await AsyncStorage.getItem(COLLECTION_USER)

        //Se COLLECTION_USER já existe
        if(storage){
            const userLogged = JSON.parse(storage) as User
            api.defaults.headers.authorization = `Bearer ${userLogged.token}`

            setUser(userLogged)
        }
    }

    return(
        <AuthContext.Provider value={{user, loading, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext)

    return context
}

export {
    AuthContext,
    AuthProvider,
    useAuth
}