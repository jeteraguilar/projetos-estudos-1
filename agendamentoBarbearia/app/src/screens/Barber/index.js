import { Container,Scroller,FakeSwiper,PageBody,UserInfoArea,ServiceArea,
    TestimonialArea,SwipeDot,SwipeDotActive,SwipeItem,SwipeImage,
    UserAvatar,UserInfo,UserInfoName,UserFavButton,LoadingIcon,BackButton,
    ServiceTitle,ServiceItem,ServiceInfo,ServiceName,ServicePrice,
    ServiceChooseButton,ServiceChooseButtonText,TestimonialItem,
    TestimonialInfo,TestimonialName,TestimonialBody} from './styles';
import React, {useEffect, useState} from 'react';
import Api from '../../Api';
import Swiper from 'react-native-swiper';
import {useNavigation, useRoute} from '@react-navigation/native';
import Stars from '../../components/Stars';
import BarberModal  from '../../components/BarberModal';
import FavoriteIcon from '../../assets/favorite.svg';
import FavoriteFullIcon from '../../assets/favorite_full.svg';
import BackIcon from '../../assets/back.svg';
import NavPrevIcon from '../../assets/nav_prev';
import NavNextIcon from '../../assets/nav_next';

export default () =>{
    const navigation = useNavigation();
    const route = useRoute();
    const [userInfo, setUserInfo] = useState({
        id: route.params.id,
        avatar: route.params.avatar,
        name: route.params.name,
        stars: route.params.stars,
      });
    
      const [loading, setLoading] = useState(false);
      const [favorited, setFavorited] = useState(false);
      const [selectedService, setSelectedService] = useState(null);
      const [showModal, setShowModal] = useState(false);

      useEffect(() => {
        const getBarberInfo = async () => {
          setLoading(true);
          let res = await Api.getBarber(userInfo.id);
          if (res.error == '') {
            setUserInfo(res.data);
            setFavorited(res.data.favorited);
          } else {
            alert('Erro: ' + res.error);
          }
          setLoading(false);
        };
        getBarberInfo();
      }, []);


      const handleBackButton = () => {
        navigation.goBack();
      };
     
      const handleFavClick = async() => {
        setFavorited( !favorited);
        Api.setFavorite(userInfo.id); 
      };

      const handleServiceChoose = key => {
        setSelectedService(key);
        setShowModal(true);
      };
  
    return(
        <Container>
            <Scroller>
            {userInfo.photos && userInfo.photos.length > 0 ? 
           <Swiper
           style={{height: 240}}
                  dot={<SwipeDot />}
                  activeDot={<SwipeDotActive />}
                  paginationStyle={{top: 15, right: 15, bottom: null, left: null}}
                  autoplay={true}>
                  {userInfo.photos.map((item, key) => (
                      <SwipeItem key={key}>
                        <SwipeImage source={{uri:item.url}} resizeMode="cover" />
                      </SwipeItem>
                  ))}

           </Swiper>
           :
           <FakeSwiper></FakeSwiper>
        }
        <PageBody>
            <UserInfoArea>
                <UserAvatar source={{uri:userInfo.avatar}}></UserAvatar>
                <UserInfo>
                    <UserInfoName>{userInfo.name}</UserInfoName>
                    <Stars stars={userInfo.stars} showNumber={true}></Stars>
                </UserInfo>
                <UserFavButton onPress={handleFavClick}>
                      {favorited ? 
                        <FavoriteFullIcon width="24" height="24" fill="#FF0000" />
                       : 
                        <FavoriteIcon width="24" height="24" fill="#FF0000" />
                      }
                  </UserFavButton>
            </UserInfoArea>
            {loading && <LoadingIcon size="large" color="#000000" />}
            {userInfo.services &&
            <ServiceArea>
                  <ServiceTitle>Lista de serviços</ServiceTitle>
             
                     {userInfo.services.map((item, key) => (
                        <ServiceItem key={key}>
                            <ServiceInfo>
                                <ServiceName>{item.name}</ServiceName>
                                <ServicePrice>R$ {item.price.toFixed(2).replace('.',',')}</ServicePrice>
                            </ServiceInfo>
                            <ServiceChooseButton onPress={()=>handleServiceChoose(key)}>
                                <ServiceChooseButtonText>Agendar</ServiceChooseButtonText>
                            </ServiceChooseButton>
                        </ServiceItem>
                      ))}
                  </ServiceArea>
                }
                {userInfo.testimonials && userInfo.testimonials.length > 0 &&
            <TestimonialArea>
                        <Swiper
                        style={{height: 110}}
                        showsPagination={false}
                        showsButtons={true}
                        prevButton={<NavPrevIcon width="35" height="35" fill="#000000" />}
                        nextButton={<NavNextIcon width="35" height="35" fill="#000000" />}
                        >
                        {userInfo.testimonials.map((item, key) => (
                            <TestimonialItem key={key}>
                              <TestimonialInfo>
                                  <TestimonialName>{item.name}</TestimonialName>
                                  <Stars stars={item.rate} showNumber={false} />
                              </TestimonialInfo>
                              <TestimonialBody>{item.body}</TestimonialBody>
                            </TestimonialItem>
                        ))}
                      </Swiper>
                </TestimonialArea>
                }
          </PageBody>
           </Scroller>
           <BackButton onPress={handleBackButton}>
            <BackIcon width="44" height="44" fill="#FFFFFF" />
          </BackButton>
          <BarberModal 
            show={showModal}
            setShow={setShowModal}
            user={userInfo}
            service={selectedService}
          />
        </Container>
    );
}