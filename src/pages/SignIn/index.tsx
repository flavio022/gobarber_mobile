import React, {useCallback, useRef} from 'react';
import {
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErros';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import {userAuth} from '../../hooks/auth';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreatAccountButton,
  CreateAccountButtonText,
} from './styles';

import logoImg from '../../assets/logo.png';
interface SignInFormData {
  email: string;
  password: string;
}
const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const {singIn, user} = userAuth();
  console.log(user);
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handlerSignIn = useCallback(async (data: SignInFormData) => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      await singIn({
        email: data.email,
        password: data.password,
      });
      // history.push('/dashboard');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }
      Alert.alert(
        'Erro na autenticação',
        'Ocorreu erro ao fazer login,cheque as credenciais',
      );
    }
  }, []);
  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flex: 1}}>
          <Container>
            <Image source={logoImg} />
            <View>
              <Title>Faça seu login</Title>
            </View>
            <Form onSubmit={handlerSignIn} ref={formRef}>
              <Input
                name="email"
                icon="mail"
                placeholder="E-mail"
                autoCorrect={false}
                keyboardType={'email-address'}
                returnKeyType="next"
                onSubmitEditing={() => {}}
              />
              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                  console.log('Foi');
                }}
              />
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                  console.log('Foi');
                }}>
                Entrar
              </Button>
            </Form>

            <ForgotPassword onPress={() => {}}>
              <ForgotPasswordText>Esqueceu a senha?</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <CreatAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
      </CreatAccountButton>
    </>
  );
};

export default SignIn;
