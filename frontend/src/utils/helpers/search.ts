import { SecretInfo, SecretInfoAccessedResponse } from 'smart-contracts/passing-secret-info/types';
import { convertEthGweiWei } from './convert';
import { SMART_CONTRACTS_DATA_ENUM, SmartContractsDataTypes } from 'smart-contracts/types';
import { Salary } from 'smart-contracts/companies-salaries/types';

export const searchBySingleWord = (a: string, b: string) => {
  return a
    .toLocaleLowerCase()
    .split(' ')
    .some((word) =>
      b
        .toLocaleLowerCase()
        .split(' ')
        .some((secondWord) => word.includes(secondWord))
    );
};

export const searchAndPush = (
  data: SecretInfo[] | SecretInfoAccessedResponse[] | Salary[],
  searchedData: SecretInfo[] | SecretInfoAccessedResponse[] | Salary[],
  value: string,
  type: SmartContractsDataTypes
) => {
  if (type === SMART_CONTRACTS_DATA_ENUM.SECRET_INFO) {
    (data as SecretInfo[]).forEach((secretInfo, index) => {
      const [secret_info_id, owner_address, amount, title, description] = secretInfo;

      if (
        owner_address.toLocaleLowerCase().includes(value) ||
        searchBySingleWord(convertEthGweiWei(Number(amount)), value) ||
        searchBySingleWord(title, value) ||
        searchBySingleWord(description, value)
      ) {
        searchedData.push(data[index] as any);
      }
    });
  }

  if (type === SMART_CONTRACTS_DATA_ENUM.COMPANIES_SALARY) {
    (data as Salary[]).forEach((salary, index) => {
      const [
        salary_id,
        owner_address,
        first,
        last,
        speed_of_growth,
        company_id,
        company_name,
        role,
        experience,
        opinion,
        location,
        employment_type,
        operating_mode,
        salary_currency,
        experience_in_company,
        created_at,
        replies,
        rates,
      ] = salary;

      if (
        owner_address.toLocaleLowerCase().includes(value) ||
        searchBySingleWord(Number(first).toString(), value) ||
        searchBySingleWord(Number(last).toString(), value) ||
        searchBySingleWord(Number(speed_of_growth).toString(), value) ||
        searchBySingleWord(Number(experience).toString(), value) ||
        searchBySingleWord(Number(experience_in_company).toString(), value) ||
        searchBySingleWord(company_name, value) ||
        searchBySingleWord(role, value) ||
        searchBySingleWord(opinion, value) ||
        searchBySingleWord(location, value) ||
        searchBySingleWord(employment_type, value) ||
        searchBySingleWord(operating_mode, value) ||
        searchBySingleWord(salary_currency, value)
      ) {
        searchedData.push(data[index] as any);
      }
    });
  }
};
