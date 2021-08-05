import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar, FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { api } from '../../services/api';

import { Car } from '../../components/Car';

import Logo from '../../assets/logo.svg';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars
} from './styles';

export function Home() {
  const [data, setData] = useState([]);
  const navigation = useNavigation();



  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/cars');
        console.log(response.data)
        setData(response.data);
      } catch(err) {
        console.log(err);
      }
    };
    fetchCars();
  }, []);

  function handleCarDetails() {
    navigation.navigate('CarDetails');
  }

  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        translucent
        backgroundColor='transparent'
      />
        <Header>
          <HeaderContent>
            <Logo
              height={RFValue(12)}
              width={RFValue(108)}
            />
            <TotalCars>Total de 12 carros</TotalCars>
          </HeaderContent>
        </Header>

        <FlatList
          data={data}
          contentContainerStyle={{ padding: 16 }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Car
              data={item}
              onPress={handleCarDetails}
            />
          )}
        />

    </Container>
  );
}
