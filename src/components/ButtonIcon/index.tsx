import React from 'react'
import {Text,View,Image} from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

import DiscordImg from '../../assets/discord.png'
import {styles} from './styles'

// Props recebe todas as props do TouchableOpacity + as props que estamos definindo
type Props = RectButtonProps & {
    title: string
}

export function ButtonIcon({title, ...rest}: Props){
    return(
        <RectButton
            style={styles.container}
            {...rest} //Todas as demais propriedade de TouchableOpacity
        >
            <View style={styles.iconWrapper}>
                <Image source={DiscordImg} style={styles.icon}/>
            </View>

            <Text style={styles.title}>
                {title}
            </Text>
        </RectButton>
    )
}