import React, {useState,useEffect} from 'react';
import { Container,Scroller,HeaderArea,HeaderTitle,SearchButton,
    LocationArea,LocationInput,LocationFinder,LoadingIcon,ListArea} from './styles';
import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from   '../../assets/my_location.svg';
import {useNavigation} from '@react-navigation/native';
import {PERMISSIONS, request} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import {Platform, RefreshControl} from 'react-native';
import Api from '../../Api';
import BarberItem from '../../components/BarberItem';

export default () =>{
    const  navigation  = useNavigation();
    const [locationText, setLocationText] = useState('');
    const [coords, setCoords] = useState(null);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false)

    const  handleLocationFinder = async () =>{
        setCoords(null);
        let result = await request(
        Platform.OS === 'ios' ?
            PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
            :
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        );
        if(result == 'granted'){
            setLoading(true);
            setLocationText('');
            setList([]);

            Geolocation.getCurrentPosition((info)=>{
                setCoords(info.coords);
                getBarbers();

            }, 
            
           (error) => {
            this.setState({
            error: error.message }),
            console.log(error.code, error.message);

            },{
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 100000
                }
            );
        }
    }
        const getBarbers = async () => {
            setLoading(true);
            setList([]);

            let lat = null;
            let lgn = null;
            if(coords){
              lat = coords.latitude;
              lgn = coords.longitude;
            }

           let res = await Api.getBarbers(lat, lgn, locationText);
            if(res.error == ''){
                if(res.loc){
                    setLocationText(res.loc);
                }
                setList(res.data);

            }else{
                alert("Erro: "+res.error);
            }
            setLoading(false);
         };

         const onRefresh = () => {
            setRefreshing(false);
            getBarbers();
          }
          const handleLocationSearch = () => {
            setCoords({});
            getBarbers();
          }
        

    useEffect(()=>{
        getBarbers();
    }, []);

    return(
        <Container>
            <Scroller refreshControl={
             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
             }>
                  <HeaderArea>
                   <HeaderTitle numberOfLines={2}>Encontre o seu barbeiro favorito</HeaderTitle>
                    <SearchButton onPress={()=>navigation.navigate('Search')}>
                        <SearchIcon width="26" height="26" fill="#ffffff"></SearchIcon>
                    </SearchButton>
                </HeaderArea>
                <LocationArea>
                    <LocationInput 
                    placeholder="Onde você está?" 
                    placeholderTextColor="#ffffff"
                    value={locationText}
                    onChangeText={t=>setLocationText(t)}
                    onEndEditing={handleLocationSearch}></LocationInput>
                    <LocationFinder onPress={handleLocationFinder}>
                        <MyLocationIcon width="24" height="24" fill="#ffffff"></MyLocationIcon>
                    </LocationFinder>
                </LocationArea>
                {loading &&
                <LoadingIcon size="large" color="#ffffff"></LoadingIcon>
                }
                <ListArea>
                    {list.map((item, key) =>(
                        <BarberItem key={key} data={item} />
                    ))}
                </ListArea>
           </Scroller>
        </Container>
    );
}