import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';

import { DetailsScreenRouteProp } from '../navigation/types';

interface Props {
    navigation: NavigationProp<any>;
}

const DetailScreen:FC<Props> = ({navigation}) => {
    // const route = useRoute();
    const route = useRoute<DetailsScreenRouteProp>();
    const { name, birthYear } = route.params;

    return (
        <View style={{ flex: 1, paddingTop: 12, paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 18, paddingBottom: 12 }}>Name: {name}</Text>
            <Text style={{ fontSize: 18 }}>Birth Year: {birthYear}</Text>
        </View>
    );
};

export default DetailScreen;