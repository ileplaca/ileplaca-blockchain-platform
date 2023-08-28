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

export interface CreateSecretInfoDto {
  title: string;
  description: string;
  secret_info: string;
  amount: number;
  amount_unit: UnitType;
  max_uses: number;
  zero_knowledge_proof: string;
}

export const createSecretInfoFormValidationSchema = yup.object({
  title: yup.string().required('Title is required').max(250),
  description: yup.string().required('Description is required').max(1000),
  zero_knowledge_proof: yup.string().required('Zero knowledge proof is required').max(1000),
  secret_info: yup.string().required('Secret info is required').max(10000),
  amount: yup
    .number()
    .required('Amount is required')
    .min(0, 'Minimum value of amount is 0')
    .max(1e24, 'Max value of amount is 1e24'),
  max_uses: yup
    .number()
    .required('Max uses is required')
    .min(1, 'Minimum value of max uses is 1')
    .max(1e24, 'Max value of max uses is 1e24'),
});
