import React from 'react';
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler';
import {MaterialCommunityIcons} from '@expo/vector-icons'

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

export function ButtonAdd({...rest}: RectButtonProperties) {
    return(
        <RectButton
            style={styles.container}
            {...rest} //Se quisermos alterar alguma propriedade específica dos RectButtons
        >
            <MaterialCommunityIcons
                name='plus'
                color={theme.colors.heading}
                size={24}
            />
        </RectButton>
    )
}