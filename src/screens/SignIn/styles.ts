import {StyleSheet} from 'react-native'
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image:{
        width: '100%',
        height: 360,
        position: 'absolute'
    },
    content:{
        marginTop: '-22%', // -40
        paddingHorizontal: 50,
        //paddingBottom: 20
    },
    title:{
        color: theme.colors.heading,
        textAlign: 'center',
        fontSize: 40,
        marginBottom: 16,
        fontFamily: theme.fonts.title700,
        lineHeight: 40
    },
    subtitle:{
        color: theme.colors.heading,
        textAlign: 'center',
        fontSize: 15,
        marginBottom: '8%', //64 (original)
        fontFamily: theme.fonts.title500,
        lineHeight: 25 
    },

});