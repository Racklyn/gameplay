import React from 'react';
import {TextInput, TextInputProps, View} from 'react-native'

import { TextIsEmpty } from '../TextIsEmpty';

import { styles } from './styles';

type Props = TextInputProps & {
    isEmpty?: boolean;
}

export function TextArea({...rest}:TextInputProps) {

    return(
        <TextInput
            style={styles.container}
            {...rest}
        />
    )
}