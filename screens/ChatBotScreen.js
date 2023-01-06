import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';

const ChatScreen = () => {
    const [messages, setMessages] = useState([]);
    const user = useSelector((state) => state.user.value) 

    const username = user.token? user.username : 'there'

        useEffect(() => {
            setMessages([
                {
                    _id: 1,
                    text: `Hello ${username}, I am the Easy Paris Chatbot. I'm here to answer your questions, don't hesitate`,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://res.cloudinary.com/dkay1mnds/image/upload/v1671659823/easyParis/Eiffel-Tower-in-Paris-at-sunset_pmagjn.jpg',
                    },
                },
            ]);
        }, [user]);
   

    // Définissez un tableau de questions prédéfinies et de leurs réponses correspondantes
    const questions = [
        {
            question: "What is the capital of France ?",
            answer: "The capital of France is Paris."
        },
        {
            question: "Quelle est la capitale de la France ?",
            answer: "Paris est la capitale de la France"
        },
        {
            question: "How many arrondissements does Paris have ?",
            answer: "Paris has 20 arrondissements (administrative districts)."
        },
        {
            question: "Combien d'arrondissement comporte Paris ?",
            answer: "Paris comporte 20 arrondissements différents"
        },
        {
            question: "What is the most famous street in Paris ?",
            answer: "The most famous street in Paris is the Champs-Élysées."
        },
        {
            question: "Quelle est la rue la plus célèbre de Paris ?",
            answer: "La rue ou plutot, l'avenue la plus célèbre de Paris est, l'avenue des champs-Elysée"
        },
        {
            question: "Who designed the Eiffel Tower ?",
            answer: "The Eiffel Tower was designed by Gustave Eiffel."
        },
        {
            question: "Qui a conçu la tour Eiffel ?",
            answer: "La tour Eiffel a été conçu par Gustave Eiffel le 28 janvier 1887."
        },
        {
            question: "What is the name of the famous cathedral in Paris ?",
            answer: "The famous cathedral in Paris is Notre Dame de Paris."
        },
        {
            question: "Quelle est le nom de la plus belle cathédrale de Paris ?",
            answer: "La plus belle cathédrale de Paris pour beaucoup est, la cathédrale de Notre Dame de Paris"
        },
        {
            question: "Thank you",
            answer: "You're welcome, it's a pleasure to help you. If you have any other questions, don't hesitate, I'm here to help you."
        },
        {
            question: "Merci",
            answer: "De rien c'est un plaisir de vous aider. Si vous avez d'autres questions, n'hésitez pas, je suis là pour vous aider"
        },
        {
            question: "how many langages do you speak ?",
            answer: "I am programmed to speak in two different languages. French and English"
        },
        {
            question: "Combien de langues parles tu ?",
            answer: "Je suis programmé pour parler dans deux langues différentes. Le Français et l'Anglais"
        },
        {
            question: "Bonjour",
            answer: "Ravi de vous rencontrer"
        },
        // Ajoutez autant de questions et de réponses que nécessaire
    ];
    // Définissez une fonction pourtrouver la réponse à une question donnée
    const findAnswer = (question) => {
        const user = useSelector((state) => state.user.value) 
        for (let i = 0; i < questions.length; i++) {
            if (questions[i].question.toLocaleLowerCase() === question.toLocaleLowerCase()) {
                return questions[i].answer;
            }
        }
        return `Tu me fais chier ${user.username}` ;
    }

    const onSend = useCallback((messages = []) => {
        // Met le contenu du message en minuscule avant de l'envoyer à findAnswer
        const lowerCaseMessage = messages[0].text.toLowerCase();
        const answer = findAnswer(lowerCaseMessage);

        setMessages((previousMessages) => {
            return GiftedChat.append(previousMessages, [
                {
                    _id: previousMessages.length + 1,
                    text: answer,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://res.cloudinary.com/dkay1mnds/image/upload/v1671659823/easyParis/Eiffel-Tower-in-Paris-at-sunset_pmagjn.jpg',
                    },
                },
                {
                    ...messages[0],
                    _id: previousMessages.length + 2,
                },
            ]);
        });
    }, []);

    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View>
                    <MaterialCommunityIcons
                        name="send-circle"
                        style={{ marginBottom: 5, marginRight: 5 }}
                        size={32}
                        color="#1E90FF"
                    />
                </View>
            </Send>
        );
    };

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#1E90FF',
                    },
                }}
                textStyle={{
                    right: {
                        color: '#fff',
                    },
                }}
            />
        );
    };
    const scrollToBottomComponent = () => {
        return (
            <FontAwesome name="angle-double-down" size={22} color="#333" />
        );
    };

    return (
        <SafeAreaView style={{ height: '85%', width: '100%' }}>
            <GiftedChat
                messages={messages}
                onSend={(messages) => onSend(messages)}
                user={{
                    _id: 1,
                }}
                renderBubble={renderBubble}
                alwaysShowSend
                renderSend={renderSend}
                scrollToBottom
                scrollToBottomComponent={scrollToBottomComponent}
                style={{ marginBottom: 60 }}
            />
        </SafeAreaView>);
};

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});