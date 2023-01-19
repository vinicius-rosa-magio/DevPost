import React, { useState, useContext } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import { Container, Title, Input, Button, ButtonText, SignUpButton, SignUptext } from './styles'

import { AuthContext } from '../../contexts/auth';

import * as Animatable from 'react-native-animatable';

const TitleAnimated = Animatable.createAnimatableComponent(Title)

function Login() {
    const [login, setLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signUp, signIn, loadingAuth } = useContext(AuthContext);


    function toggleLogin() {
        setLogin(!login)
        setName('');
        setEmail('');
        setPassword('');
    }

    async function handleSignIn() {
        if (email === '' || password === '') {
            console.log('preencha todos os campos')
            return;
        }
        await signIn(email, password)
    }

    async function handleSignUp() {
        if (name === '' || email === '' || password === '') {
            console.log('preencha todos os campos para cadastrar')
            return;
        }

        await signUp(email, password, name)

    }

    if (login) {
        return (
            <Container>
                <TitleAnimated animation='flipInX'>
                    Dev<Text style={{ color: '#e52246' }}>Post</Text>
                </TitleAnimated>


                <Input
                    placeholder='seuemail@gmail.com'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />

                <Input
                    placeholder='************'
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                    
                />

                <Button onPress={handleSignIn}>
                    {loadingAuth ? (
                        <ActivityIndicator
                            size={20}
                            color='#fff'
                        />

                    ) : (

                        <ButtonText>Acessar</ButtonText>
                    )}

                </Button>

                <SignUpButton onPress={toggleLogin}>
                    <SignUptext>Criar uma conta</SignUptext>
                </SignUpButton>
            </Container>
        )
    }

    return (
        <Container>
            <TitleAnimated animation='flipInY'>
                Dev<Text style={{ color: '#e52246' }}>Post</Text>
            </TitleAnimated>

            <Input
                placeholder='Seu nome'
                value={name}
                onChangeText={(text) => setName(text)}

            />

            <Input
                placeholder='seuemail@gmail.com'
                value={email}
                onChangeText={(text) => setEmail(text)}

            />

            <Input
                placeholder='************'
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                
            />

            <Button onPress={handleSignUp}>
                {loadingAuth ? (
                    <ActivityIndicator
                        size={20}
                        color='#fff'
                    />

                ) : (

                    <ButtonText>Cadastrar</ButtonText>
                )}

            </Button>

            <SignUpButton onPress={toggleLogin}>
                <SignUptext>Já possuo uma conta</SignUptext>
            </SignUpButton>
        </Container>
    );
}

export default Login;