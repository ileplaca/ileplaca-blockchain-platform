import { faExclamationCircle, faLock, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';

import useCreateSecretInfoForm from './use-create-secret-info-form';
import { Loading } from 'features/components';
import { Link } from 'react-router-dom';
import { ModalLayout, WarningText } from 'features/ui';

export interface CreateSecretInfoFormProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateSecretInfoForm: FC<CreateSecretInfoFormProps> = ({ setIsModalOpen }) => {
  const { handleOnChangeAmount, onSubmit, loading, error, handleSubmit, register, errors } =
    useCreateSecretInfoForm();

  return (
    <ModalLayout>
      <form className="text-black" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-lg font-medium lg:text-2xl">Create Secret Info</h2>

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
            Zero knowledge proof
          </label>
          <textarea className="h-20 form-input" {...register('zero_knowledge_proof')} />
          <span className="text-red-600">{errors.zero_knowledge_proof?.message as string}</span>
        </div>

        <div className="form-input-block">
          <label className="form-label" htmlFor="">
            <FontAwesomeIcon icon={faLock} /> Your secret information
          </label>
          <textarea className="h-64 form-input" {...register('info')} />
          <span className="text-red-600">{errors.info?.message as string}</span>
        </div>
        <WarningText>This information will be secret until someone buys it</WarningText>
        <WarningText>
          If you want to pass more data than 10k chars checkout{' '}
          <Link target="_blank" className="underline text-primary hover:text-primary-hover" to={'/'}>
            ileplaca blockchain big data sharing{'(100k chars per data)'}
          </Link>
        </WarningText>

        <div className="form-input-block">
          <label htmlFor="" className="form-label">
            Amount
          </label>
          <div className="flex gap-2">
            <input
              className="form-input"
              type="number"
              min={1}
              placeholder="Amount"
              defaultValue={1}
              {...register('amount', { onChange: handleOnChangeAmount })}
            />
            <select className="form-input" {...register('amount_unit')}>
              <option value="ETH">ETH</option>
              <option value="GWEI">GWEI</option>
              <option value="WEI">WEI</option>
            </select>
          </div>
        </div>

        <div className="form-input-block">
          <label className="form-label" htmlFor="">
            Max uses
          </label>
          <input
            min={1}
            defaultValue={1}
            className="w-64 form-input" 
            type="number" 
            {...register('max_uses', { onChange: handleOnChangeAmount })}
            />
        </div>

        <div className="text-red-600">{error}</div>

        <button disabled={loading} className="mt-4 button bg-primary" type="submit">
          {loading ? <Loading /> : 'Create secret info'}
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
