
import React from 'react';
import styled from 'styled-components/native';
export const InputArea = styled.TouchableOpacity `
flex-direction: row;
background-color: #e3edf2;
border-radius:30px;
width:100%;
height:60px;
padding-left: 15px;
margin-bottom:15px;
align-items: center;
`;
const Input = styled.TextInput `
   font-size: 16px;
   color:#4e7d96;
   flex:1;
   margin-left:10px;
`;
export default({IconSvg, placeholder, value,onChangeText,password}) =>{
    return(
        <InputArea>
            <IconSvg width="24" height="24" fill="#268596" />
            <Input 
            placeholder={placeholder}
            placeholderTextColor="#268596"
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={password}></Input>
        </InputArea>
    );
}
