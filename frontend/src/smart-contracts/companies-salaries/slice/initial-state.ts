import { ResponseStatusType } from 'utils/types/api';
import { Salary } from '../types';

export interface CompaniesSalariesSliceInitialState {
  manipulatedCompaniesSalaries: Salary[];
  companiesSalaries: Salary[];
  status: ResponseStatusType;
  error: string | null;
}

export const companiesSalariesSliceInitialState: CompaniesSalariesSliceInitialState = {
  manipulatedCompaniesSalaries: [],
  companiesSalaries: [],
  status: 'pending',
  error: null,
};
