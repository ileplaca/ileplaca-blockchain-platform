import React, { FC } from 'react';
import useCreateSecretInfoForm from './use-create-companies-salary-form';
import { ModalLayout } from 'features/ui';

export interface CreateSecretInfoFormProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateSecretInfoForm: FC<CreateSecretInfoFormProps> = ({ setIsModalOpen }) => {
  const { onSubmit, loading, error, handleSubmit, register, errors } =
    useCreateSecretInfoForm();

  return (
    <ModalLayout>
      <form className="text-black" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-lg font-medium lg:text-2xl">Create Secret Info</h2>

        <div className="form-input-block">
          <label htmlFor="" className="form-label">
            First salary
          </label>
          <div className="flex gap-2">
            <input className="form-input" type="number" defaultValue={0} {...register('first')} />
            <select className="form-input" {...register('salary_currency')}>
              <option value="PLN">PLN</option>
              <option value="$">$</option>
              <option value="€">€</option>
            </select>
          </div>
        </div>

        <div className="form-input-block">
          <label className="form-label" htmlFor="">
            Last salary
          </label>
          <input className="w-64 form-input" type="number" defaultValue={0} {...register('last')} />
          <span className="text-red-600">{errors.last?.message as string}</span>
        </div>

        <div className="form-input-block">
          <label className="flex items-center form-label" htmlFor="">
            Speed of growth
          </label>
          <input className="w-64 form-input" type="number" defaultValue={0} {...register('speed_of_growth')} />
          <span className="text-red-600">{errors.speed_of_growth?.message as string}</span>
        </div>

        <div className="form-input-block">
          <label className="form-label" htmlFor="">
            Company name
          </label>
          <input className="form-input" {...register('company_name')} />
          <span className="text-red-600">{errors.company_name?.message as string}</span>
        </div>

        <div className="form-input-block">
          <label className="form-label" htmlFor="">
            Role
          </label>
          <input className="form-input" {...register('role')} />
          <span className="text-red-600">{errors.role?.message as string}</span>
        </div>

        <div className="form-input-block">
          <label className="form-label" htmlFor="">
            Experience in company {'(months)'}
          </label>
          <input className="w-20 form-input" defaultValue={0} {...register('experience_in_company')} />
          <span className="text-red-600">{errors.experience?.message as string}</span>
        </div>

        <div className="form-input-block">
          <label className="form-label" htmlFor="">
            Experience {'(months)'}
          </label>
          <input className="w-20 form-input" defaultValue={0} {...register('experience')} />
          <span className="text-red-600">{errors.experience?.message as string}</span>
        </div>

        <div className="form-input-block">
          <label className="form-label" htmlFor="">
            Opinion
          </label>
          <textarea className="h-64 form-input" {...register('opinion')} />
          <span className="text-red-600">{errors.opinion?.message as string}</span>
        </div>

        <div className="form-input-block">
          <label className="form-label" htmlFor="">
            Location
          </label>
          <input className="form-input" {...register('location')} />
          <span className="text-red-600">{errors.location?.message as string}</span>
        </div>

        <div className="form-input-block">
          <label htmlFor="" className="form-label">
            Employment type
          </label>
          <div className="flex gap-2">
            <select className="form-input" {...register('employment_type')}>
              <option value="Permanent">Permanent</option>
              <option value="B2B">B2B</option>
              <option value="Mandate contract">Mandate contract</option>
            </select>
          </div>
        </div>

        <div className="form-input-block">
          <label htmlFor="" className="form-label">
            Operating mode
          </label>
          <div className="flex gap-2">
            <select className="form-input" {...register('operating_mode')}>
              <option value="Office">Office</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Fully remote">Fully remote</option>
            </select>
          </div>
        </div>

        <div className="text-red-600">{error}</div>

        <button
          disabled={loading}
          className={`mt-4 button bg-primary ${
            loading ? 'bg-opacity-80 cursor-not-allowed hover:bg-primary hover:bg-opacity-80' : ''
          }`}
          type="submit"
        >
          Create secret info
        </button>
        <button
          disabled={loading}
          onClick={() => setIsModalOpen(false)}
          className="ml-4 button-cancel"
        >
          Cancel
        </button>
      </form>
    </ModalLayout>
  );
};

export default CreateSecretInfoForm;
