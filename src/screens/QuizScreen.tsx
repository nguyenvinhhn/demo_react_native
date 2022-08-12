
import React, { FC, useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { getquestiojns, Question } from '../utils/api';
import Questions from '../components/Question';
import Answers from '../components/Answers';
import { Icon } from 'react-native-elements';
import {NavigationProp} from '@react-navigation/native';


export type AnswerObject = {
    question: string,
    answer: string,
    correct: boolean,
    correctanswer: string
}
interface Props{
    navigation:NavigationProp<any>;
}

const Quiz:FC<Props> = ({navigation}) => {
// const Quiz: FC<props> = ({navigation})  => {
    const [loader, setloader] = useState(false)
    const [question, setquestion] = useState<Question[]>([])
    const [useranswers, setuseranswers] = useState<AnswerObject[]>([])
    const [score, setscore] = useState(0)
    const [current_index, setCurrentIndex] = useState(0)
    const [totalquestion] = useState(10)
    const [gameover, setgameover] = useState(true)
    const [correcta, setcorrecta] = useState("")
    const setcorrectanswer = useRef(null)

    useEffect(() => {
        startQuiz()
    }, [])

    const startQuiz = async () => {
        setCurrentIndex(0)
        setloader(true)
        setgameover(false)
        const newquestions = await getquestiojns()
        console.log(newquestions)
        // console.log('123');
        setquestion(newquestions)
        setscore(0)
        setuseranswers([])
        setloader(false)

    }
    const nextQuestion = () => {

        const nextq = current_index + 1
        if (nextq == totalquestion) {
            setgameover(true)
        }
        else {
            setCurrentIndex(nextq)
        }
    }
    const checkanswer = () => {
        if (!gameover) {
            const answer = setcorrectanswer.current

            const correcta = question[current_index].correct_answer === answer
            // nếu câu trả lời đúng score ++ 1
            if (correcta) setscore((prev) => prev + 1)

            const answerobject = {
                question: question[current_index].question,
                answer,
                correcta,
                correctanswer: question[current_index].correct_answer
            }

            setuseranswers((prev) => [...prev, answerobject])
            setTimeout(() => {
                nextQuestion()
            }, 1000);
        }
    }

    return (
        <View style={{ flex: 1 }}>
            {/* onPress={()=>navigation.navigate('Post',{post})} */}
            <TouchableOpacity onPress={()=>navigation.navigate('Posts',{test: 'test'})}  >
                <Text style={{ color: 'blue', textAlign: 'center' }}>Go to posts</Text>
            </TouchableOpacity>
        {!loader
            ?
            <View>
                <View style={styles.container}>
                    <Text style={styles.textstyle}>Questions</Text>
                    <Text style={styles.textstyle}>{current_index + 1}/{totalquestion}</Text>
                </View>
                <View style={{ marginLeft: 20 }}>
                    <Text style={styles.textstyle}>Score : {score}</Text>
                </View>
                {question.length > 0
                    ?
                    <>
                        <Questions QuestionNo={current_index + 1} Question={question[current_index].question} />
                        <Answers 
                            useranswer={useranswers ? useranswers[current_index] : undefined}
                            answers={question[current_index].answers}
                            {...{ setcorrectanswer, checkanswer }}
                        />
                    </>
                    : null
                }
            </View>
            :
            <ActivityIndicator style={{ justifyContent: 'center', top: 200 }} size={50} color="black" />
        }

        <View>
            {!gameover && !loader && current_index != totalquestion - 1
                ?
                <TouchableOpacity onPress={() => nextQuestion()} >
                        <Icon name="arrowright" size={40} color="black" type="antdesign" style={{ left: 130, margin: 20 }} />
                    </TouchableOpacity>
                    :
                    (current_index == totalquestion - 1
                        ?
                        <TouchableOpacity onPress={() => startQuiz()}>
                            <Icon name="controller-play" size={40} color="black" type="entypo" style={{ left: 130, margin: 20 }} />
                        </TouchableOpacity>
                        : null
                    )
                }
            </View>

        </View>
    );
};

const styles = StyleSheet.create({


    container: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 70, backgroundColor: 'white' },
    textstyle: { padding: 15, fontSize: 15, color: 'blue' },
    bottomview: { padding: 13, backgroundColor: 'blue', borderRadius: 300, width: 70, height: 70, position: 'absolute', right: 20, top: 550 },
    questioncontainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', marginTop: 10, paddingRight: 16 },
    iconstyle: { backgroundColor: 'blue', borderRadius: 50, width: 70, height: 70, margin: 5, top: 100, left: 260 },

})


export default Quiz;
