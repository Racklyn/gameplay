import React from 'react'
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableOpacityProps
} from 'react-native'

import DiscordImg from '../../assets/discord.png'
import {styles} from './styles'

// Props recebe todas as props do TouchableOpacity + as props que estmos definindo
type Props = TouchableOpacityProps & {
    title: string
}

export function ButtonIcon({title, ...rest}: Props){
    return(
        <TouchableOpacity
            style={styles.container}
            {...rest} //Todas as demais propriedade de TouchableOpacity
        >
            <View style={styles.iconWrapper}>
                <Image source={DiscordImg} style={styles.icon}/>
            </View>

            <Text style={styles.title}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}