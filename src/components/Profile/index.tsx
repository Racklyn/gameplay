import React from 'react';
import {View, Text, Alert} from 'react-native'
import { RectButton } from 'react-native-gesture-handler';
import { Avatar } from '../Avatar';

import { useAuth } from '../../hooks/auth';

import { styles } from './styles';

type Props = {
    onPressAvatar?: () => void;
}

export function Profile({onPressAvatar}:Props) {

    const {user, signOut} = useAuth()

    return(
        <View style={styles.container}>

            <RectButton onPress={onPressAvatar}>
                <Avatar urlImage={user.avatar}/>
            </RectButton>

            <View>
                <View style={styles.user}>
                    <Text style={styles.greeting}>
                        Olá,
                    </Text>

                    <Text style={styles.username}>
                        {user.firstName}
                    </Text>
                </View>
            
                <Text style={styles.message}>
                    Hoje é dia de vitória
                </Text>
                
            </View>
        </View>
    )
}