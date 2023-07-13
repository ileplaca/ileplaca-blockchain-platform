import { parseISO, formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';

export const parseDateFns = (date: number) => {
  return formatDistanceToNow(new Date(Number(date) * 1000), { locale: enUS });
};
