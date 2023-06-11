import { Address } from "hardhat-deploy/dist/types"

export interface Salary {
  salary_id: number
  owner_address: Address
  current: number
  first: number
  speed_of_growth: number
  raise_change: number
  role: string
  experience: string
  opinion: string
  company_id: number
}

export interface CompaniesSalaries {
  addSalary: (
    current: number,
    first: number,
    speed_of_growth: number,
    raise_change: number,
    role: string,
    experience: string,
    opinion: string,
    company_id: number
  ) => Promise<void>
  getSalaries: () => Promise<Salary[]>
  getSalariesByCompanyId: (company_id: number) => Promise<Salary[]>
  deployed: () => Promise<void>
}