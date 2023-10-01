import { Address } from 'hardhat-deploy/dist/types';
import { Rate, Reply } from './PassingSecretInfo';
import { BigNumber } from 'ethers';

export interface Salary {
  salary_id: number;
  owner_address: Address;
  first: number;
  last: number;
  speed_of_growth: number;
  company_id: number;
  company_name: string;
  role: string;
  experience: string;
  opinion: string;
  location: string;
  employment_type: string;
  operating_mode: string;
  created_at: number;
  replies: Reply[];
  rates: Rate[];
}

export interface CompaniesSalaries {
  addSalary: (
    first: number,
    last: number,
    speed_of_growth: number,
    company_id: number,
    company_name: string,
    role: string,
    experience: string,
    opinion: string,
    location: string,
    employment_type: string,
    operating_mode: string,
  ) => Promise<void>;
  getSalaries: () => Promise<Salary[]>;
  addSalaryRate: (salary_id: number, rate: boolean) => Promise<void>;
  removeSalaryRate: (salary_id: number) => Promise<void>;
  changeSalaryRate: (salary_id: number) => Promise<void>;

  deployed: () => Promise<void>;
  connect: (address: any) => Promise<CompaniesSalaries>;
  receive: ({ value }: { value: number | BigNumber }) => Promise<CompaniesSalaries>;
}
