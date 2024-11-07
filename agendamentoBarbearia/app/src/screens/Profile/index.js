import React, { useContext } from 'react';
import { Container,AvatarIcon,UserName,UserEmail,ButtonSignOut,ButtonSignOutText} from './styles';
import Api from '../../Api';
import { UserContext} from '../../contexts/UserContext';
import { useNavigation } from '@react-navigation/native';

export default () =>{
    const navigation = useNavigation();
    const { state: user } = useContext(UserContext);
    const handleLogoutClick = async () => {
        
        await Api.logout();
        navigation.reset({
            routes:[{name: 'SignIn'}]
        })
    }
    return(
        <Container>
            <UserName>{user.name}</UserName>
            <UserEmail>{user.email}</UserEmail>
            <AvatarIcon source={{uri: user.avatar}} />
            <ButtonSignOut onPress={handleLogoutClick}>
                    <ButtonSignOutText>SAIR</ButtonSignOutText>
                </ButtonSignOut>
        </Container>
    );
}