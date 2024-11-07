import React,{useState, useContext} from 'react';
import {Container,InputArea,CustomButton,
    CustomButtonText,SignMessageButton,SignMessageButtonText,SignMessageButtonTextBold} from './styles'
import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import SignInput from '../../components/SignInput';
import { useNavigation } from '@react-navigation/native';
import Api from '../../Api';
import AsyncStorage from '@react-native-community/async-storage';
import { UserContext} from '../../contexts/UserContext';

export default()=>{
    const {dispatch: userDispatch} = useContext(UserContext);
    const navigation = useNavigation();

    const[emailField,setEmailField] = useState('');
    const[senhaField,setSenhaField] = useState('');

   const handleMessageButtonClick = () =>{
            navigation.reset({
                routes:[{name: 'SignUp'}]
            });
   }

   const handleSignClick = async () =>{
        if(emailField != '' && senhaField !=''){
            let json = await Api.signIn(emailField,senhaField);
                if(json.token){
                    await AsyncStorage.setItem('token', json.token);
                    userDispatch({
                        type:'setAvatar',
                        payload:{
                            avatar:json.data.avatar
                        }
                    });
                    navigation.reset({
                        routes:[{name:'MainTab'}]
                    });

                }else{
                    alert("Email e/ou senha inválidos!");
                }
        }else{
            alert("Preencha os campos!");
        }

    }
 return(
     <Container>
         <BarberLogo width="100%" height="160"></BarberLogo>
            <InputArea>
                <SignInput IconSvg={EmailIcon} 
                placeholder="Digite seu email"
                value={emailField}
                onChangeText={t=>setEmailField(t)}></SignInput>

                <SignInput IconSvg={LockIcon}
                 placeholder="Digite sua senha"
                 value={senhaField}
                 onChangeText={t=>setSenhaField(t)}
                 password={true}></SignInput>

                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>LOGIN</CustomButtonText>
                </CustomButton>
            </InputArea>
            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre-se </SignMessageButtonTextBold>
            </SignMessageButton>
     </Container>
    );
      
 }