export enum SMART_CONTRACTS {
  PASSING_SECRET_INFO = 'PassingSecretInfo',
  COMPANIES_SALARIES = 'CompaniesSalaries',
}

export enum SMART_CONTRACTS_DATA_ENUM {
  SECRET_INFO = 'SecretInfo',
  COMPANIES_SALARY = 'CompaniesSalaray',
}
export type SmartContractsDataTypes = `${SMART_CONTRACTS_DATA_ENUM}`;

export type Reply = [id: number, owner_address: string, created_at: number, content: string];
export type Rate = [id: number, owner_address: string, rate: boolean];