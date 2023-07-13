import { faExclamationCircle, faLock, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import {
  createSecretInfoFormValidationSchema,
  seYupValidationResolver,
} from './create-secret-info-form.config';
import useCreateSecretInfoForm from './use-create-secret-info-form';

export interface CreateSecretInfoFormProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateSecretInfoForm: FC<CreateSecretInfoFormProps> = ({ setIsModalOpen }) => {
  const resolver = seYupValidationResolver(createSecretInfoFormValidationSchema);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver });
  const { handleOnChangeAmount, onSubmit } = useCreateSecretInfoForm();

  return (
    <form className="text-black" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-medium">Create Secret Info</h2>

      <div className="form-input-block">
        <label className="form-label" htmlFor="">
          Title
        </label>
        <input className="form-input" type="text" {...register('title')} />
        <span className="text-red-600">{errors.title?.message as string}</span>
      </div>

      <div className="form-input-block">
        <label className="form-label" htmlFor="">
          Description
        </label>
        <textarea className="h-20 form-input" {...register('description')} />
        <span className="text-red-600">{errors.description?.message as string}</span>
      </div>

      <div className="form-input-block">
        <label className="form-label" htmlFor="">
          <FontAwesomeIcon icon={faLock} /> Your secret information
        </label>
        <textarea className="h-36 form-input" {...register('secret_info')} />
        <span className="text-red-600">{errors.secret_info?.message as string}</span>
      </div>
      <div className="flex gap-2 mt-2">
        <FontAwesomeIcon icon={faExclamationCircle} className="text-lg text-yellow-600" />
        <span className="text-sm text-black">
          This information will be secret until someone buys it
        </span>
      </div>

      <div className="form-input-block">
        <label htmlFor="" className="form-label">
          Amount
        </label>
        <div className="flex gap-2">
          <input
            className="form-input"
            type="number"
            min={0}
            placeholder="Amount"
            defaultValue={0}
            {...register('amount', { onChange: handleOnChangeAmount })}
          />
          <select className="form-input" {...register('amount_unit')}>
            <option value="ETH">ETH</option>
            <option value="GWEI">GWEI</option>
            <option value="WEI">WEI</option>
          </select>
        </div>
        <span className="text-red-600">{errors.amount?.message as string}</span>
      </div>

      <div className="form-input-block">
        <label className="form-label" htmlFor="">
          Max uses
        </label>
        <input className="w-64 form-input" type="number" {...register('max_uses')} />
        <span className="text-red-600">{errors.max_uses?.message as string}</span>
      </div>

      <button className="button bg-primary" type="submit">
        Create secret info
      </button>
      <button onClick={() => setIsModalOpen(false)} className="ml-4 button-cancel">
        Cancel
      </button>
    </form>
  );
};

export default CreateSecretInfoForm;
