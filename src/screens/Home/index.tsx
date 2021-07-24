import React from 'react';
import { StatusBar, FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars
} from './styles';

export function Home() {
  const carData = [
    {
      brand: 'Audi',
      name: 'RS 5 Coupé',
      rent: {
        period: 'Ao dia',
        price: '120'
      },
      thumbnail: 'https://img2.gratispng.com/20180628/bea/kisspng-audi-rs5-car-audi-q5-audi-s5-motor-sport-5b359e505de2b8.8061450915302405923846.jpg'
    },
    {
      brand: 'Porsche',
      name: 'Panamera',
      rent: {
        period: 'Ao dia',
        price: '340'
      },
      thumbnail: 'https://img2.gratispng.com/20180628/bea/kisspng-audi-rs5-car-audi-q5-audi-s5-motor-sport-5b359e505de2b8.8061450915302405923846.jpg'
    },
    {
      brand: 'Porsche',
      name: 'Panamera',
      rent: {
        period: 'Ao dia',
        price: '340'
      },
      thumbnail: 'https://img2.gratispng.com/20180628/bea/kisspng-audi-rs5-car-audi-q5-audi-s5-motor-sport-5b359e505de2b8.8061450915302405923846.jpg'
    }
  ]

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
          data={carData}
          contentContainerStyle={{ padding: 16 }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Car
              data={item}
            />
          )}
        />

    </Container>
  );
}
