import { Address } from "hardhat-deploy/dist/types"
import { Rate, Reply } from "./PassingSecretInfo"
import { BigNumber } from "ethers"

export interface Salary {
  salary_id: number,
  owner_address: Address,
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
    company_id: number,
    company_name: string
  ) => Promise<void>
  getSalaries: () => Promise<Salary[]>
  getSalaryById: (salary_id: number) => Promise<Salary>
  getSalariesByCompanyId: (company_id: number) => Promise<Salary[]>
  addSalaryReply: (salary_id: number, content: string) => Promise<void>
  addSalaryRate: (salary_id: number, rate: boolean) => Promise<void>
  removeSalaryRate: (salary_id: number) => Promise<void>
  changeSalaryRate: (salary_id: number) => Promise<void>


  deployed: () => Promise<void>
  connect: (address: any) => Promise<CompaniesSalaries>
  receive: ({ value }: { value: number | BigNumber }) => Promise<CompaniesSalaries>
}