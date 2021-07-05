import React from 'react';
import { ScrollView } from 'react-native';
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler';
import { Category } from '../Category';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import { categories } from '../../utils/categories';


type Props = {
    categorySelected: string;
    setCategory: (categoryId:string) => void,
    hasCheckBox?: boolean;
}

export function CategorySelector({categorySelected, setCategory, hasCheckBox=false}:Props) {
    return(
        <ScrollView
            style={styles.container}
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
    )
}