import React, { useState } from 'react';
import {
    Text,
    View,
    Platform, //Para lidar com os comportamentos diferentes de cada plataforma (Android ou iOs)
    ScrollView,
    KeyboardAvoidingView, //Para a tela subir quando o teclado aparecer
    Alert
} from 'react-native'
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import uuid from 'react-native-uuid'

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

import { CategorySelector } from '../../components/CategorySelector';
import { TextIsEmpty } from '../../components/TextIsEmpty';
import { SmallInput } from '../../components/SmallInput';
import { Background } from '../../components/Background';
import { ModalView } from '../../components/ModalView';
import { GuildIcon } from '../../components/GuildIcon';
import { TextArea } from '../../components/TextArea';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Guilds } from '../Guilds';

import { GuildProps } from '../../components/Guild'; //Importando interface
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';


export function AppointmentCreate() {

    const data = new Date();

    const [category, setCategory] = useState('')
    const [openGuildsModal, setOpenGuildsModal] = useState(false)
    const [guild, setGuild] = useState<GuildProps>({} as GuildProps)

    const navigation = useNavigation()

    const [day, setDay] = useState(data.getDate().toString())
    const [month, setMonth] = useState((data.getMonth()+1).toString())
    const [hour, setHour] = useState(data.getHours().toString())
    const [minute, setMinute] = useState(data.getMinutes().toString())
    const [description, setDescription] = useState('')

    const [emptyFields, setEmptyFields] = useState({
        category: false,
        guild: false,
    })

    useEffect(()=>{
        setEmptyFields({...emptyFields, category: false})
    },[category])

    useEffect(()=>{
        setEmptyFields({...emptyFields, guild: false})
    },[guild.id])
    
    function handleOpenGuilds() {
        setOpenGuildsModal(true)
    }
    function handleGuildSelect(guildSelected: GuildProps) {
        setGuild(guildSelected)
        setOpenGuildsModal(false)
    }

    function handleCategorySelected(categoryId:string) {
        setCategory(categoryId)
    }

    function onChangeDay(day: string) {
        if(Number(day)<0){
            setDay('01')
        }else if(Number(day)>31){
            setDay('31')
        }else{
            setDay(day)
        }
    }

    function onChangeMonth(month: string) {
        if(Number(month)<0){
            setMonth('01')
        }else if(Number(month)>12){
            setMonth('12')
        }else{
            setMonth(month)
        }
    }

    function onChangeHour(hour: string) {
        if(Number(hour)<0){
            setHour('00')
        }else if(Number(hour)>23){
            setHour('23')
        }else{
            setHour(hour)
        }
    }

    function onChangeMinute(minute: string) {
        if(Number(minute)<0){
            setMinute('00')
        }else if(Number(minute)>59){
            setMinute('59')
        }else{
            setMinute(minute)
        }
    }



    async function handleSave() {

        setEmptyFields({
            category: emptyFields.category = category==='',
            guild: emptyFields.guild = guild.id===undefined,
        })

        // if(Number.isNaN(minute) || Number.isNaN(parseInt(minute))){
        //     console.log("Oi")
        //     setMinute('00')
        // }
        
        if(!Object.values(emptyFields).every(e=>!e)){
            // Alert.alert(`Preencha todos os campos!`)
            return
        }
        
        const newAppointment = {
            id: uuid.v4(),
            guild,
            category,
            date: `${String(day).padStart(2,'0')}/${String(month).padStart(2,'0')}`
                +` às ${String(hour).padStart(2,'0')}:${String(minute).padStart(2,'0')}h`,
            description
        }
        // Alert.alert(`Data: ${newAppointment.date} \n Minute: ${minute}`)

        const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS)
        //Verificando se já existe algum appointment salvo localmente
        const appointments = storage ? JSON.parse(storage) : []

        //Todos os appointments que já existiam + o novo
        await AsyncStorage.setItem(
            COLLECTION_APPOINTMENTS,
            JSON.stringify([...appointments, newAppointment])    
        )

        navigation.navigate("Home")
    }

    return(
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <Background>
                <ScrollView>
                    <Header
                        title="Agendar partida"
                    />

                    <Text style={[
                        styles.label,{
                            marginLeft: 24, marginTop: 36, marginBottom: 18
                        }
                    ]}>
                        Categoria
                    </Text>     

                    <CategorySelector
                        hasCheckBox
                        setCategory={handleCategorySelected}
                        categorySelected={category}
                        isEmpty={emptyFields.category}
                    />

                    <View style={styles.form}>
                        <RectButton onPress={handleOpenGuilds}>
                            <View style={[styles.select, emptyFields.guild?styles.isEmptyStyle:null]}>

                                {
                                    guild.icon
                                    ? <GuildIcon guildId={guild.id} iconId={guild.icon}/>
                                    : <View style={styles.image}/>
                                }

                                <View style={styles.selectBody}>
                                    <Text style={styles.label}>
                                        { guild.name? guild.name: 'Selecione um servidor'}
                                    </Text>
                                </View>

                                <Feather
                                    name='chevron-right'
                                    color={theme.colors.heading}
                                    size={18}
                                />

                            </View>

                            { emptyFields.guild && <TextIsEmpty/>}

                        </RectButton>
                    
                        <View style={styles.field}>
                            <View>
                                <Text style={[styles.label, {marginBottom: 12}]}> Dia e mês</Text>

                                <View style={styles.column}>
                                    <SmallInput
                                        maxLength={2}
                                        onChangeText={onChangeDay}
                                        value={day}
                                        onEndEditing={()=>{
                                            if(Number(day)==0){
                                                setDay('01')
                                            }
                                        }}
                                    />
                                    <Text style={styles.divider}>/</Text>
                                    <SmallInput
                                        maxLength={2}
                                        onChangeText={onChangeMonth}
                                        value={month}
                                        onEndEditing={()=>{
                                            if(Number(month)==0){
                                                setMonth('01')
                                            }
                                        }}
                                    />

                                </View>
                            </View>

                            <View>
                                <Text style={[styles.label, {marginBottom: 12}]}> Hora e minuto</Text>
                                
                                <View style={styles.column}>
                                    <SmallInput
                                        maxLength={2}
                                        onChangeText={onChangeHour}
                                        value={hour}
                                        onEndEditing={()=>{
                                            if(Number(hour)==0){
                                                setHour('00')
                                            }
                                        }}

                                    />     
                                    <Text style={styles.divider}>:</Text>
                                    <SmallInput
                                        maxLength={2}
                                        onChangeText={onChangeMinute}
                                        value={minute}
                                        onEndEditing={()=>{
                                            if(Number(minute)==0){
                                                setMinute('00')
                                            }
                                        }}
                                        
                                    />
                                </View>
                            </View>  

                        </View>
                    
                        <View style={[styles.field, {marginBottom: 12}]}>
                            <Text style={styles.label}>
                                Descrição
                            </Text>
                            <Text style={styles.caracteresLimit}>
                                Max 100 caracteres
                            </Text>
                        </View>

                        <TextArea
                            multiline
                            maxLength={100}
                            numberOfLines={5}
                            autoCorrect={false}
                            onChangeText={setDescription}
                        />
                        

                        <View style={styles.footer}>
                            <Button
                                title="Agendar"
                                onPress={handleSave}
                            />
                        </View>

                    </View>
                </ScrollView>
            </Background>

            <ModalView visible={openGuildsModal} closeModal={()=>setOpenGuildsModal(false)}>
                <Guilds handleGuildSelect={handleGuildSelect}/>
            </ModalView>

        </KeyboardAvoidingView>
    )
}