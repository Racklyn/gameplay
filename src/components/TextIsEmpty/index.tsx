import React from 'react';

import {
  Text
} from 'react-native';

import { styles } from './styles';

type Props = {
    message?: string;
}

export function TextIsEmpty({message = 'Este campo é obrigatório'}:Props){
  return (
    <Text style={styles.textIsEmpty}>
        {message}
    </Text>
  );
}