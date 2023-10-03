import React, { useCallback } from 'react';
import { UnitType } from 'utils/types/units';
import * as yup from 'yup';

export const seYupValidationResolver = (validationSchema: any) =>
  useCallback(
    async (data: any) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors: any) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors: any, currentError: any) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [validationSchema]
  );


export const createCompaniesSalaryFormValidationSchema = yup.object({
  company_name: yup.string().required('Company name is required').max(100),
  role: yup.string().required('Role is required').max(100),
  opinion: yup.string().required('Opinion is required').max(1000),
  location: yup.string().required('Location is required').max(50),
  employment_type: yup.string().required('Employment type is required').max(50),
  operating_mode: yup.string().required('Operating mode is required').max(50),
  salary_currency: yup.string().required('Salary currency is required').max(4),
  first: yup
    .number()
    .required('First salary is required')
    .min(0, 'Minimum value of amount is 0')
    .max(1e12, 'Max value of first salary is 1 000 000 000 000'),
  last: yup
    .number()
    .required('Last salary is required')
    .min(0, 'Minimum value of last salary is 0')
    .max(1e12, 'Max value of last salary is 1 000 000 000 000'),
  speed_of_growth: yup
    .number()
    .required('Speed of growth is required')
    .min(0, 'Minimum value of speed of growth salary is 0')
    .max(1e9, 'Max value of speed of growth salary is 1 000 000 000'),
  experience: yup
    .number()
    .required('Experience is required')
    .min(0, 'Minimum value experience salary is 0')
    .max(1e9, 'Max value of experience salary is 65535'),
  experience_in_company: yup
    .number()
    .required('Experience in company is required')
    .min(0, 'Minimum value experience in company in company salary is 0')
    .max(1e9, 'Max value of experience in company salary is 65535'),
});
