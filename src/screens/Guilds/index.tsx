import React, {useState, useEffect} from 'react'
import {View, FlatList} from 'react-native'

import { styles } from './styles'

import { Guild, GuildProps } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';
import { Load } from '../../components/Load';

import {api} from '../../services/api'

type Props = {
    handleGuildSelect: (guild: GuildProps) => void;
}

export function Guilds({handleGuildSelect}:Props) {

    const [guilds, setGuilds] = useState<GuildProps[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        fetchGuilds()
    },[])

    async function fetchGuilds() {
        const response = await api.get('/users/@me/guilds')

        setGuilds(response.data)
        setLoading(false)
    }

    return(
        <View style={styles.container}>

            {
                loading ?
                <Load/> :
                <FlatList
                    data={guilds}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    style={styles.guilds}
                    ItemSeparatorComponent={()=> <ListDivider isCentered />}
                    //Aparecer antes dos elementos renderizados:
                    ListHeaderComponent={()=> <ListDivider isCentered /> }
                    contentContainerStyle={{paddingBottom: 68, paddingTop: 103}}
                    renderItem={({item})=>(
                        <Guild
                            data={item}
                            onPress={()=>handleGuildSelect(item)}
                        />
                    )}
                />
            }
        </View>
    )
}