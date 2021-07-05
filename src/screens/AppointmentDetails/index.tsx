import React, { useState, useEffect } from 'react';
import {
    Text,
    FlatList,
    View,
    ImageBackground,
    Alert,
    Share,
    Platform
} from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler';
import { Fontisto, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import * as Linking from 'expo-linking'
import { useRoute } from '@react-navigation/native';

import { AppointmentProps } from '../../components/Appointment';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import BannerPng from '../../assets/banner.png'

import { ListDivider } from '../../components/ListDivider';
import { Background } from '../../components/Background';
import { ListHeader } from '../../components/ListHeader';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Header } from '../../components/Header';
import { Member, MemberProps } from '../../components/Member';
import { Load } from '../../components/Load';

import { api } from '../../services/api';

type Params = {
    appointmentSelected: AppointmentProps
}

type GuildWidget = {
    id: string;
    name: string;
    instant_invite: string;
    members: MemberProps[],
}

export function AppointmentDetails() {

    const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget)
    const [loading, setLoading] = useState(true)
    const [widgetAvailable, setWidgetAvailable] = useState(true)

    const route = useRoute()
    const {appointmentSelected} = route.params as Params

    useEffect(()=>{
        fetchGuildWidget()
    },[])

    async function fetchGuildWidget() {
        try {
            const response = await api.get(`/guilds/${appointmentSelected.guild.id}/widget.json`)
            setWidget(response.data)
            
            
        } catch {
            Alert.alert("Verifique as configurações do servidor","Será que o Widget está habilitado?")
            setWidgetAvailable(false)
        }finally{
            setLoading(false)
        }
    }

    function handleShareInvitation() {

        if(widget.instant_invite==null){
            Alert.alert("Link indisponível",
            "Verifique se este servidor possui algum canal de convite selecionado!")

        }else{
            const message = Platform.OS === 'ios'
            ? `Junte-se a ${appointmentSelected.guild.name}`
            : widget.instant_invite;

            Share.share({
                message,
                url: widget.instant_invite
            });
        }

    }

    async function handleDeleteAppointment(){
        Alert.alert("Delete?")
        
    }

    function handleOpenGuild() {
        Linking.openURL(widget.instant_invite)
    }


    return(
        <Background>
            <Header
                title="Detalhes"
                action={
                    appointmentSelected.guild.owner &&
                    <BorderlessButton onPress={handleShareInvitation}>
                        <Fontisto
                            name='share'
                            size={24}
                            color={theme.colors.primary}
                        />
                    </BorderlessButton>
                }
            />

            <ImageBackground
                source={BannerPng}
                style={styles.banner}
            >
                
                <View style={styles.bannerContent}>
                
                    <BorderlessButton
                        style={styles.deleteButton}
                        onPress={handleDeleteAppointment}
                    >
                        <MaterialIcons name="delete" size={58} color={theme.colors.primary} />
                    </BorderlessButton>
                    
                    <Text style={styles.title}>
                        {appointmentSelected.guild.name}
                    </Text>

                    <Text style={styles.subtitle}>
                        {appointmentSelected.description}
                    </Text>

                </View>
            </ImageBackground>


            {   
                loading ? <Load/> :

                widgetAvailable ?
                    <>
                        <ListHeader
                            title="Jogadores"
                            subtitle={`Total `}
                        />

                        <FlatList
                            data={widget.members}
                            style={styles.members}
                            keyExtractor={item => item.id}
                            ItemSeparatorComponent={()=> <ListDivider isCentered/>}
                            renderItem={({item}) => (
                                <Member
                                    data={item}
                                />
                            )}
                        />
                    </>
                : <View style={styles.unavailable}>
                    <FontAwesome5 name="sad-tear" size={36} color={theme.colors.primary} />
                    <Text style={styles.unavailableText}>Informações do servidor indisponíveis!</Text>
                </View>
            }

            <View style={styles.footer}>
                {
                    appointmentSelected.guild.owner &&    
                    <ButtonIcon
                        onPress={handleOpenGuild}
                        title="Entrar na partida"
                    />}
            </View>

        </Background>
    )
}