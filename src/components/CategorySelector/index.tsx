import React from 'react';
import { ScrollView, Text, View} from 'react-native';
import { Category } from '../Category';

import { styles } from './styles';

import { categories } from '../../utils/categories';
import { TextIsEmpty } from '../TextIsEmpty';


type Props = {
    categorySelected: string;
    setCategory: (categoryId:string) => void,
    hasCheckBox?: boolean;
    isEmpty?: boolean;
}

export function CategorySelector({
    categorySelected,
    setCategory,
    hasCheckBox=false,
    isEmpty=false}:Props)
    {

    return(
        <View>
            <ScrollView
                style={[styles.container, isEmpty?styles.isEmptyStyle:null]}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingRight: 40}} //Margin ao final do scroll
            >
                {
                    categories.map(category=>(
                        <Category
                            key={category.id}
                            title={category.title}
                            icon={category.icon}
                            checked={category.id === categorySelected}
                            onPress={()=> setCategory(category.id)}
                            hasCheckBox={hasCheckBox}
                        />
                    ))
                }

            </ScrollView>

            { isEmpty && <TextIsEmpty message="Selecione uma categoria"/> }
            
        </View>
    )
}