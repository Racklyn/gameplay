import React, {ReactNode} from 'react';

import {
    View,
    Text,
    Modal,
    ModalProps,
    TouchableWithoutFeedback
} from 'react-native';

import { styles } from './styles';

import { Background } from '../Background';

type Props = ModalProps & {
  children: ReactNode;
  title?: string;
  closeModal: () => void;
}

export function AlertModal({
    children,
    title,
    closeModal,
    ...rest
  }: Props){
  return (
    <Modal
      transparent
      animationType="slide"
      statusBarTranslucent //escurecer a barra de notificações
      {...rest}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Background>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.alertContainer}>
                  {children}
                </View>
            </Background>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}