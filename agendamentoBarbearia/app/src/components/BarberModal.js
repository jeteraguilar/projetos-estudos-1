import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import Api from '../Api';
import ExpandIcon from '../assets/expand';
import NavPrevIcon from '../assets/nav_prev';
import NavNextIcon from '../assets/nav_next';


const Modal = styled.Modal``;
const ModalArea = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;
const ModalBody = styled.View`
  background-color: #4e7d96;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  min-height: 300px;
  padding: 10px 20px 40px 20px;
`;
const CloseButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
`;
const ModalItem = styled.View`
  background-color: #e3edf2;
  border-radius: 10px;
  margin-bottom: 15px;
  padding: 10px;
`;

const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;
const UserAvatar = styled.Image`
  height: 56px;
  width: 56px;
  border-radius: 20px;
  margin-right: 15px;
`;
const UserName = styled.Text`
  color: #000000;
  font-size: 18px;
  font-weight: bold;
`;
const ServiceInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const ServiceName = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;
const ServicePrice = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;
const FinishButton = styled.TouchableOpacity`
  background-color: #ff844b;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;
const FinishButtonText = styled.Text`
  color: #e3edf2;
  font-size: 17px;
  font-weight: bold;
`;
const DateInfo = styled.View`
  flex-direction: row;
`;
const DateNextArea = styled.TouchableOpacity`
  flex: 1;
  justify-content: flex-start;
`;
const DateTitleArea = styled.View`
  width: 140px;
  justify-content: center;
  align-items: center;
`;
const DatePrevArea = styled.TouchableOpacity`
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
`;
const DateTitle = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: #000000;
`;
const DateList = styled.ScrollView``;
const DateItem = styled.TouchableOpacity`
  width: 45px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
`;
const DateItemWeekDay = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;
const DateItemNumber = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;
const TimeList = styled.ScrollView``;
const TimeItem = styled.TouchableOpacity`
  width: 75px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;
const TimeItemText = styled.Text`
  font-size: 16px;
`;

const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex','Sab'];

export default ({show, setShow, user, service}) => {
    
    const navigation = useNavigation();
    
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedHour, setSelectedHour] = useState(null);
  const [listDays, setListDays] = useState([]);
  const [listHours, setListHours] = useState([]);
  
  useEffect(() => {
    let today = new Date();
    setSelectedYear(today.getFullYear());
    setSelectedMonth(today.getMonth());
    setSelectedDay(today.getDate());
 }, []);
 useEffect(() => {
  if (user.available && selectedDay > 0) {
    let d = new Date(selectedYear, selectedMonth, selectedDay);

    let year = d.getFullYear();
    let month = d.getMonth() +1;
    let day = d.getDate();
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    let selDate = `${year}-${month}-${day}`;
    let aviability = user.available.filter((e) => e.date === selDate);

    if (aviability.length > 0) {
      setListHours(aviability[0].hours);
    }
  }
  setSelectedHour(null);
}, [user, selectedDay]);



  const handleLeftDateClick = () => {
      let mountDate = new Date(selectedYear, selectedMonth, 1);
      mountDate.setMonth(mountDate.getMonth() - 1);
      setSelectedYear(mountDate.getFullYear());
      setSelectedMonth(mountDate.getMonth());
      setSelectedDay(0);
};

 const handleRightDateClick = () => {
      let mountDate = new Date(selectedYear, selectedMonth, 1);
      mountDate.setMonth(mountDate.getMonth() + 1);
      setSelectedYear(mountDate.getFullYear());
      setSelectedMonth(mountDate.getMonth());
      setSelectedDay(0);
};
 /* useEffect(() => {
    if (user.available) {
      let daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
      let newListDays = [];

      for (let i = 1; i <= daysInMonth; i++) {
        let d = new Date(selectedYear, selectedMonth, i);
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let day = d.getDate();
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
        let selDate = `${year}-${month}-${day}`;
        let aviability = user.available.filter(e => e.date === selDate);

        newListDays.push({
          status: aviability.length > 0 ? true : false,
          weekday: days[d.getDay()],
          number: i,
        });
      }
      setListDays(newListDays);
      setSelectedDay(0);
      setListHours([]);
      setSelectedHour(0);
    }
  }, [user, selectedMonth, selectedYear]);

  */ 
  useEffect(() => {
    if (user.available) {
      const daysInMonth = new Date(
        selectedYear,
        selectedMonth + 1,
        0,
      ).getDate();
  
      const monthDays = [...Array(daysInMonth).keys()]
        .map(day => day + 1)
        .map(day => {
          const date = new Date(selectedYear, selectedMonth, day);
          const [currentDate] = date.toISOString().split('T');
          const weekday = days[date.getDay()];
          const status = user.available.some(({date: userAvailableDate}) => {
            return userAvailableDate === currentDate;
          });
  
          console.log(`${currentDate}-${weekday}`);
  
          return {
            id: `${currentDate}-${weekday}`,
            status,
            weekday,
            number: day,
          };
        });
        setSelectedDay(0);
        setListHours([]);
        setSelectedHour(0);
        setListDays(monthDays);
      }
    }, [user, selectedMonth, selectedYear]);
    

  
  

    const handleCloseButton = () => {
        setShow(false);
      };

    const handleFinishClick = async () => {
        if (
          user.id &&
          service != null &&
          selectedYear > 0 &&
          selectedMonth > 0 &&
          selectedDay > 0 &&
          selectedHour != null
        ) {
          let res = await Api.setAppointments(
            user.id,
            user.services[service].id,
            selectedYear,
            selectedMonth + 1,
            selectedDay,
            selectedHour,
          );
          if (res.error == '') {
            setShow(false);
            navigation.navigate('Appointments');
          } else {
            alert(res.error);
          }
        } else {
          alert('Preencha todos os dados!');
        }
      };


    return(
        <Modal 
        transparent={true} 
        visible={show} 
        animationType="slide">
            <ModalArea>
                <ModalBody>
                    <CloseButton onPress={handleCloseButton}>
                    <ExpandIcon width="40" height="40" fill="#000000" />
                    </CloseButton>
                     <ModalItem>
                        <UserInfo>
                            <UserAvatar source={{uri:user.avatar}}></UserAvatar>
                            <UserName>{user.name}</UserName>
                        </UserInfo>
                    </ModalItem>

                    {service !=null &&
                    <ModalItem>
                        <ServiceInfo>
                        <ServiceName>{user.services[service].name}</ServiceName>
                         <ServicePrice>R$ {user.services[service].price.toFixed(2).replace('.', ',')}
                    </ServicePrice>
                        </ServiceInfo>
                    </ModalItem>
                    }

                    <ModalItem>
                        <DateInfo>
                            <DatePrevArea onPress={handleLeftDateClick}>
                                <NavPrevIcon width="35" height="35" fill="#000000"></NavPrevIcon>
                            </DatePrevArea>
                            <DateTitleArea>
                                <DateTitle>{months[selectedMonth]} {selectedYear}</DateTitle>
                            </DateTitleArea>
                            <DateNextArea onPress={handleRightDateClick}>
                            <NavNextIcon width="35" height="35" fill="#000000"></NavNextIcon>
                            </DateNextArea>
                        </DateInfo>
                        <DateList
                        horizontal={true} 
                        showsHorizontalScrollIndicator={false}>
                          
                          {listDays.map(item => (
                              <DateItem
                                key={item.id}
                       
                                onPress={() =>item.status ? setSelectedDay(item.number) : null}
                                style={{
                                    opacity: item.status ? 1 : 0.5,
                                    backgroundColor:
                                    item.number === selectedDay ? '#ff844b' : '#e3eff2',
                                }}>
                                <DateItemWeekDay
                                    style={{
                                    color: item.number === selectedDay ? '#e3eff2' : '#000',
                                    }}>
                                    {item.weekday}
                                </DateItemWeekDay>
                                <DateItemNumber
                                    style={{
                                    color: item.number === selectedDay ? '#e3eff2' : '#000',
                                    }}>
                                    {item.number}
                                </DateItemNumber>
                                </DateItem>
                            ))}
                    </DateList>
                    </ModalItem>
                            {selectedDay > 0 && listHours.length > 0 && (
                            <ModalItem>
                                <TimeList
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}>
                                    {listHours.map((item, key) => (
                                    <TimeItem
                                        key={key}
                                        onPress={() => setSelectedHour(item)}
                                        style={{
                                        backgroundColor: item === selectedHour ? '#ff844b' : '#e3eff2',
                                        }}>
                                        <TimeItemText
                                        style={{
                                            color: item === selectedHour ? '#e3eff2' : '#000',
                                            fontWeight: item === selectedHour ? 'bold' : 'normal',
                                        }}>
                                        {item}
                                        </TimeItemText>
                                    </TimeItem>
                                    ))}
                                </TimeList>
                            </ModalItem>
                    )}


                    <FinishButton onPress={handleFinishClick}>
                        <FinishButtonText>Finalizar Agendamento</FinishButtonText>
                    </FinishButton>

                </ModalBody>
            </ModalArea>
        </Modal>
    );
}