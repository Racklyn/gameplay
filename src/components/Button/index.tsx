import React from 'react'
import {Text} from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

import {styles} from './styles'

// Props recebe todas as props do TouchableOpacity + as props que estamos definindo
type Props = RectButtonProps & {
    title: string
}

export function Button({title, ...rest}: Props){
    return(
        <RectButton
            style={styles.container}
            {...rest} //Todas as demais propriedade de TouchableOpacity
        >
            <Text style={styles.title}>
                {title}
            </Text>
        </RectButton>
    )
}