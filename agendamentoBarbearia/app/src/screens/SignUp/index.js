import React,{useState,useContext} from 'react';
import {Container,InputArea,CustomButton,
    CustomButtonText,SignMessageButton,SignMessageButtonText,SignMessageButtonTextBold} from './styles'
import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import PersonIcon from '../../assets/person.svg';
import SignInput from '../../components/SignInput';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { UserContext} from '../../contexts/UserContext';
import Api from '../../Api';
export default()=>{
    
    const {dispatch: userDispatch} = useContext(UserContext);
    const navigation = useNavigation();
    const[nameField,setNameField] = useState('');
    const[emailField,setEmailField] = useState('');
    const[senhaField,setSenhaField] = useState('');

   const handleMessageButtonClick = () =>{
            navigation.reset({
                routes:[{name: 'SignIn'}]
            });
   }

   const handleSignClick = async() =>{
    if(nameField != '' && emailField != '' && senhaField !=''){
        let res = await Api.signUp(nameField,emailField,senhaField);
        if(res.token){
            await AsyncStorage.setItem('token', res.token);
            userDispatch({
                type:'setAvatar',
                payload:{
                    name: res.data.name,
                    avatar: res.data.avatar,
                    email: res.data.email
                }
            });
            navigation.reset({
                routes:[{name:'MainTab'}]
            });
        }else{
            alert("Erro" + res.error);
        }
    }else{
        alert("Preencha os campos!");
    }
}

 return(
     <Container>
         <BarberLogo width="100%" height="160"></BarberLogo>
            <InputArea>
                <SignInput IconSvg={PersonIcon} 
                placeholder="Digite seu Nome"
                value={nameField}
                onChangeText={t=>setNameField(t)}></SignInput>

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
                    <CustomButtonText>CADASTRAR</CustomButtonText>
                </CustomButton>
            </InputArea>
            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Faça Login </SignMessageButtonTextBold>
            </SignMessageButton>
     </Container>
    );
      
 }