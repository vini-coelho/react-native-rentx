import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';

import { getPlatfromDate } from '../../utils/getPlatformDate';
import { CarDTO } from '../../dtos/carDTO';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import {
  Calendar,
  DayProps,
  generateInterval,
  MarkedDateProps
} from '../../components/Calendar';

import ArrowSvg from '../../assets/arrow.svg';

import {
  Container,
  Header,
  Title,
  RentPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer
} from './styles';

interface RentalPeriod {
  start: number;
  startFormatted: string;
  end: number;
  endFormatted: string;
}

interface RouteParams {
  car: CarDTO;
}

export function Scheduling() {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();

  const { car } = route.params as RouteParams;

  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

  function handleConfirmRental() {
    navigation.navigate('SchedulingDetails', { car });
  }

  function handleGoBack() {
    navigation.goBack();
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if(start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);

    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const lastDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      start: start.timestamp,
      end: end.timestamp,
      startFormatted: format(getPlatfromDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatfromDate(new Date(lastDate)), 'dd/MM/yyyy')
    });
  }

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle='light-content'
          translucent
          backgroundColor='transparent'
        />
        <BackButton
          onPress={handleGoBack}
          color={theme.colors.shape}
        />

        <Title>
          Escolha uma {'\n'}
          data de in??cio e {'\n'}
          fim do aluguel
        </Title>

        <RentPeriod>
          <DateInfo selected={!!rentalPeriod.startFormatted}>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.startFormatted}</DateValue>
          </DateInfo>

          <ArrowSvg  />

          <DateInfo selected={!!rentalPeriod.startFormatted}>
            <DateTitle>AT??</DateTitle>
            <DateValue>{rentalPeriod.endFormatted}</DateValue>
          </DateInfo>
        </RentPeriod>
      </Header>

      <Content>
        <Calendar
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </Content>

      <Footer>
        <Button
          title='Confirmar'
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}
