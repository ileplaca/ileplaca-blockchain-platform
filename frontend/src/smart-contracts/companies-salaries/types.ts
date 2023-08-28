import { Rate, Reply } from 'smart-contracts/types';
import { ResponseContractType } from 'utils/types/api';

export type Salary = [
  id: number,
  owner_address: string,
  current: number,
  first: number,
  speed_of_growth: number,
  raise_change: number,
  role: string,
  experience: string,
  opinion: string,
  company_id: number,
  company_name: string,
  created_at: number,
  replies: Reply[],
  rates: Rate[]
];

export interface CompaniesSalaries {
  addSalary: (
    current: number,
    first: number,
    speed_of_growth: number,
    raise_change: number,
    role: string,
    experience: string,
    opinion: string,
    company_id: number,
    company_name: string
  ) => Promise<ResponseContractType>;
  getSalaries: () => Promise<Salary[]>;
  getSalaryById: (salary_id: number) => Promise<Salary>;
  getSalariesByCompanyId: (company_id: number) => Promise<Salary[]>;
  addSalaryReply: (salary_id: number, content: string) => Promise<void>;
  addSalaryRate: (salary_id: number, rate: boolean) => Promise<void>;
  removeSalaryRate: (salary_id: number) => Promise<void>;
  changeSalaryRate: (salary_id: number) => Promise<void>;
}
