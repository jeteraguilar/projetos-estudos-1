import React from 'react';
import styled from 'styled-components/native';
export const Container = styled.SafeAreaView `
    background-color: #4e7d96;
    flex:1;
    justify-content: center;
    align-items: center;   
`;
export const InputArea = styled.View `
    padding:40px;  
    width:100%;
`;

export const CustomButton = styled.TouchableOpacity `
    background-color: #ff844b;
    border-radius:30px;
    justify-content: center;
    align-items: center;   
    height:60px;
`;


export const CustomButtonText = styled.Text `
   font-size: 18px;
   color:#fff;
`;
export const SignMessageButton = styled.TouchableOpacity `
    flex-direction: row;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 20px;
`;
export const SignMessageButtonText = styled.Text `
    font-size: 16px;
    color:#e3edf2;   
`;
export const SignMessageButtonTextBold = styled.Text `
    font-size: 16px;
    color:#ff844b; 
    font-weight:bold; 
    margin-left:5px;
`;