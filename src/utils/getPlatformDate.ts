import { addDays } from 'date-fns';
import { Platform } from 'react-native';

export function getPlatfromDate(date: Date) {
  if(Platform.OS === 'ios') {
    return addDays(date, 1);
  } else {
    return date;
  }
}
