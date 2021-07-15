import React from 'react'
import {Text, ViewStyle, TouchableOpacity, TouchableOpacityProps} from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

import {styles} from './styles'

// Props recebe todas as props do TouchableOpacity + as props que estamos definindo
type Props = TouchableOpacityProps & {
    title: string
    newStyle?: ViewStyle;
}

export function Button({title, newStyle, ...rest}: Props){
    return(
        <TouchableOpacity
            style={[styles.container, newStyle]}
            activeOpacity={0.8}
            {...rest} //Todas as demais propriedade de TouchableOpacity
        >
            <Text style={styles.title}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}