import React from 'react'
import {Text,View} from 'react-native'

import {styles} from './styles'

// Props recebe todas as props do TouchableOpacity + as props que estamos definindo
type Props = {
    title: string;
    subtitle: string;
}

export function ListHeader  ({title, subtitle}: Props){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>
                {title}
            </Text>

            <Text style={styles.subtitle}>
                {subtitle}
            </Text>
        </View>
    )
}