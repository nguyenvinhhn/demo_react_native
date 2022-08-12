import React, { FC } from 'react';

import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

interface Title {
    key: number,
    answer: string,
    onPress: () => void,
    correct: boolean,
    disabled: boolean
}

const Buttons: FC<Title> = (props) => {
    return(
        <SafeAreaView >
            <TouchableOpacity
                style={[ (!props.disabled) ? styles.bg_1 : styles.bg_2, styles.TouchableOpacity ]}
                onPress={() => { props.onPress() }}
            >
                <Text style={[styles.textstyle, { color: props.correct ? 'brown' : 'black' }]}>{props.answer}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    TouchableOpacity: {
        width: "80%",
        elevation: 5,
        justifyContent: 'center',
        alignContent: 'center',
        marginLeft: 27,
        height: 38,
        marginTop: 10
    },
    bg_1: {
        backgroundColor: '#F5F5DC'
    },
    bg_2: {
        backgroundColor: '#F5DEB3'
    },
    textstyle: {
        textAlign: 'left',
        fontSize: 17,
        marginLeft: 8,
    },
})

export default Buttons;