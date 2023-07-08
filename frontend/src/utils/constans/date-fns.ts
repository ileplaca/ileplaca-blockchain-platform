import { parseISO, formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';

export const parseDateFns = (date: Date) => {
  return formatDistanceToNow(date, { locale: enUS });
};
