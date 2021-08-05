import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage
} from './styles';
import { CarDTO } from '../../dtos/carDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

interface CarData {
  brand: string;
  name: string;
  rent: {
    period: string;
    price: string;
  },
  thumbnail: string;
}

interface Props extends RectButtonProps {
  data: CarDTO;
}

export function Car({ data, onPress }: Props) {
  const MotorIcon = getAccessoryIcon(data.fuel_type);

  return (
    <Container onPress={onPress}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>{`R$ ${data.rent.price}`}</Price>
          </Rent>

          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>

      <CarImage source={{ uri: data.thumbnail }}/>
    </Container>
  );
}
