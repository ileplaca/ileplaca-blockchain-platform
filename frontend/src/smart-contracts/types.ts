export enum SMART_CONTRACTS {
  PASSING_SECRET_INFO = 'PassingSecretInfo',
  COMPANIES_SALARIES = 'CompaniesSalaries',
}

export type Reply = [id: number, owner_address: string, created_at: number, content: string];

export type Rate = [id: number, owner_address: string, rate: boolean];
