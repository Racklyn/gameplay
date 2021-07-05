import React, {useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { AppRoutes } from './app.routes'
import { SignIn } from '../screens/SignIn'

import { useAuth } from '../hooks/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function Routes() {

    const {user} = useAuth()
    // async function apagar() {
    //     await AsyncStorage.removeItem('@gameplay:appointments')
    //   }
    
    // useEffect(()=>{
    // apagar()
    // },[])
    

    return(
        <NavigationContainer>
            {/* Se existe um usuário, retorna a rota de telas autenticadas,
             senão só retorna a tela de SignIn */}
            { user.id ? <AppRoutes/> : <SignIn/>}
        </NavigationContainer>
    )
}