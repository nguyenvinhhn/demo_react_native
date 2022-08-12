import React, { FC } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from 'react-native';

interface Question {
    QuestionNo: number,
    Question: string
}

const Questions: FC<Question> = (props) => {
    return (
        <SafeAreaView>
            <View style={styles.questioncontainer}>
                <Text style={styles.textstyle} >{ props.QuestionNo }</Text> 
                <Text style={styles.question} >{ props.Question }</Text> 
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    questioncontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 10,
        paddingRight: 16
    },
    textstyle: {
        padding: 15,
        fontSize: 15,
        color: 'blue'
    },
    question: {
        fontSize: 15,
        color: 'black',
        textAlign: 'left',
        marginRight: 7
    }

});

export default Questions;