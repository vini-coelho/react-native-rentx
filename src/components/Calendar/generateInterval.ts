import { eachDayOfInterval, format } from 'date-fns';

import { DayProps, MarkedDateProps } from '.';
import { getPlatfromDate } from '../../utils/getPlatformDate';

import theme from '../../styles/theme';

export function generateInterval(start: DayProps, end: DayProps) {
  let interval: MarkedDateProps = {};

  eachDayOfInterval({ start: new Date(start.timestamp), end: new Date(end.timestamp)})
  .forEach(item => {
    const date = format(getPlatfromDate(item), 'yyyy-MM-dd');

    interval = {
      ...interval,
      [date]: {
        color: start.dateString === date || end.dateString === date
        ? theme.colors.main_light : theme.colors.main,
        textColor: start.dateString === date || end.dateString === date
        ? theme.colors.main : theme.colors.main_light,
      }
    }
  });

  return interval;
}
