import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar, FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { api } from '../../services/api';

import { Car } from '../../components/Car';
import { CarDTO } from '../../dtos/carDTO';

import Logo from '../../assets/logo.svg';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars
} from './styles';
import { Loading } from '../../components/Loading';

export function Home() {
  const [data, setData] = useState<CarDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/cars');
        setData(response.data);
      } catch(err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCars();
  }, []);

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
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
            <TotalCars>Total de {data.length} carros</TotalCars>
          </HeaderContent>
        </Header>

        {
          isLoading ?
          <Loading />
          :
          <FlatList
            data={data}
            contentContainerStyle={{ padding: 16 }}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Car
                data={item}
                onPress={() => handleCarDetails(item)}
              />
            )}
          />
        }

    </Container>
  );
}
