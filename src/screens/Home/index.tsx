import React, { useState, useCallback, useEffect } from 'react';
import {View, Text, FlatList, Alert, Vibration} from 'react-native' 
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { CategorySelector } from '../../components/CategorySelector';
import { ListDivider } from '../../components/ListDivider';
import { Appointment, AppointmentProps } from '../../components/Appointment';
import { Background } from '../../components/Background';
import { ListHeader } from '../../components/ListHeader';
import { ButtonAdd } from '../../components/ButtonAdd';
import { AlertModal } from '../../components/AlertModal';
import { Profile } from '../../components/Profile';
import { Button } from '../../components/Button';
import { Load } from '../../components/Load';

import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';

import { useAuth } from '../../hooks/auth';
import { theme } from '../../global/styles/theme';

export function Home() {

    const {signOut} = useAuth()

    const [category, setCategory] = useState('')
    const [appointments, setAppointments] = useState<AppointmentProps[]>([])
    const [loading, setLoading] = useState(true)
    const [heldAppointment, setHeldAppointment] = useState(-1)
    const [showLogoutAlert, setShowLogoutAlert] = useState(false)

    const navigation = useNavigation()


    function handleCategorySelected(categoryId:string) {
        categoryId === category? setCategory(''):setCategory(categoryId)
    }

    function handleAppointmentDetails(appointmentSelected: AppointmentProps) {
        //Passando parâmetros da tela Home para a AppointmentDetails
        navigation.navigate('AppointmentDetails', {appointmentSelected})
    }

    function handleAppointmentCreate() {
        navigation.navigate('AppointmentCreate')
    }

    async function loadAppointments() {
        const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS)
        const storage: AppointmentProps[] = response ? JSON.parse(response) : []

        if(category){
            setAppointments(storage.filter(item=>item.category === category))
        }else{
            setAppointments(storage)
        }
        setLoading(false)

    }

    function onLongPressAppointment(index: number) {
        Vibration.vibrate(60)
        setHeldAppointment(index)

        setTimeout(() => {
            Alert.alert('Deletar partida?', '',
            [
                {
                    text: 'Cancelar  ',
                    style: 'cancel',
                    onPress: () => setHeldAppointment(-1)
                },
                {
                    text: 'Deletar',
                    onPress: () => {
                        deleteAppointment(index)
                        setHeldAppointment(-1)
                    }
                }
            ]
        )    
        }, 250);

    }
    
    async function deleteAppointment(index: number) {

        const newAppointments = appointments.filter((value,idx) => idx !== index)

        try {
            await AsyncStorage.setItem(
                COLLECTION_APPOINTMENTS,
                JSON.stringify(newAppointments)    
            )
        } catch (err) {
            Alert.alert('Erro ao deletar partida!')
        }

        loadAppointments()
    }

    useFocusEffect(useCallback(()=>{
        setCategory('')
    },[]))

    useFocusEffect(useCallback(()=>{
        loadAppointments()
    },[category]))

    return(
        <>
            <Background>
                <View style={styles.header}>
                    <Profile onPressAvatar={()=>setShowLogoutAlert(true)}/>
                    <ButtonAdd onPress={handleAppointmentCreate}/>
                </View>
                

                <CategorySelector
                    categorySelected={category}
                    setCategory={handleCategorySelected}
                />

                {
                    loading? <Load/> :
                    <>
                        <ListHeader
                            title="Partidas agendadas"
                            subtitle={`Total ${appointments.length}`}
                        />

                        <FlatList
                            data={appointments} //objeto de onde virão  os dados
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                            style={styles.matches}
                            ItemSeparatorComponent={()=> <ListDivider/>}
                            ListFooterComponent={()=>
                                <Text style={styles.infoText}>
                                    Mantenha pressionado para 
                                    <Text style={styles.infoTextRed}> deletar </Text> 
                                    uma partida
                                </Text>
                            }
                            contentContainerStyle={{paddingBottom: 69}} //estilo do container da FlatList
                            renderItem={({item, index})=>(
                                <Appointment
                                    data={item}
                                    onPress={()=>handleAppointmentDetails(item)}
                                    onLongPress={()=>onLongPressAppointment(index)}
                                    hasBeenHeld={index===heldAppointment}
                                />
                            )}
                        />
                        
                    </>
                }

            </Background>

            <AlertModal
                title="Deseja sair do GamePlay?"
                visible={showLogoutAlert}
                closeModal={()=>{setShowLogoutAlert(false)}}
            >
                <Button
                    newStyle={{width: '40%', backgroundColor: theme.colors.secondary50}}
                    title="Cancelar"
                    onPress={()=>{setShowLogoutAlert(false)}}
                />
                <Button
                    newStyle={{width: '40%'}}
                    title="Sim"
                    onPress={signOut}
                />
                    
            </AlertModal>

        </>
    )
}