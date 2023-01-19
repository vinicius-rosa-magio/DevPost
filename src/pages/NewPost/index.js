import React, { useState, useLayoutEffect, useContext } from 'react';

import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';

import storage from '@react-native-firebase/storage';
import { AuthContext } from '../../contexts/auth';


import { Container, Input, ButtonText, Button } from './styles';

function NewPost() {
    const navigation = useNavigation();
    const { user } = useContext(AuthContext)
    const [post, setPost] = useState('');

    useLayoutEffect(() => {

        const options = navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => handlepost()}>
                    <ButtonText>Compartilhar</ButtonText>
                </Button>
            )
        })

    }, [navigation, post])

    async function handlepost() {
        if (post === '') {
            console.log('seu post contem conteudo invalido')
            return;
        }

        let avatarUrl = null;

        try {
            let response = await storage().ref('user').child(user?.uid).getDownloadURL();
            avatarUrl = response;
        } catch (err) {
            avatarUrl = null
        }

        await firestore().collection('posts')
        .add({
            created: new Date(),
            content: post,
            autor: user?.nome,
            userId: user?.uid,
            likes: 0,
            avatarUrl,
        })
        .then(() => {
            setPost('')
            console.log('Post criado com sucesso')
        })
        .catch((error) => {
            console.log('erro ao criar o post', error)
        })
        navigation.goBack();
    }

    return (
        <Container>
            <Input
                placeholder='O que esta acontecendo?'
                value={post}
                onChangeText={(text) => setPost(text)}
                autoCorrect={false}
                multiline={true}
                placeholderTextColor='#ddd'
                maxLength={300}
            />
        </Container>
    )
}

export default NewPost;