import React, { useState, useCallback, useEffect } from 'react';
import {View, FlatList} from 'react-native' 
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { CategorySelector } from '../../components/CategorySelector';
import { ListDivider } from '../../components/ListDivider';
import { Appointment, AppointmentProps } from '../../components/Appointment';
import { Background } from '../../components/Background';
import { ListHeader } from '../../components/ListHeader';
import { ButtonAdd } from '../../components/ButtonAdd';
import { Profile } from '../../components/Profile';
import { Load } from '../../components/Load';

import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';

export function Home() {

    const [category, setCategory] = useState('')
    const [appointments, setAppointments] = useState<AppointmentProps[]>([])
    const [loading, setLoading] = useState(true)

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

    useFocusEffect(useCallback(()=>{
        setCategory('')
    },[]))

    useFocusEffect(useCallback(()=>{
        loadAppointments()
    },[category]))

    return(
        <Background>
            <View style={styles.header}>
                <Profile/>
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
                        contentContainerStyle={{paddingBottom: 69}} //estilo do container da FlatList
                        renderItem={({item})=>(
                            <Appointment
                                data={item}
                                onPress={()=>handleAppointmentDetails(item)}
                            />
                        )}
                    />
                </>
            }

        </Background>
    )
}