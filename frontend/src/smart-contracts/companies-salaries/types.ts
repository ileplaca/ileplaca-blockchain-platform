import { ResponseContractEnum, ResponseContractType } from "utils/types/api"

export type Salary = [
  salary_id: number,
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
  created_at: number
]

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
  ) => Promise<ResponseContractEnum>
  getSalaries: () => Promise<Salary[]>
  getSalariesByCompanyId: (company_id: number) => Promise<Salary[]>
}