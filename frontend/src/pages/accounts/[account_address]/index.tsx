import React, { FC } from 'react';
import { useParams } from 'react-router';

const Account: FC = () => {
  const { account_address } = useParams();
  console.log("🚀 ~ file: [account_address].tsx:6 ~ account_address:", account_address)

  return (
    <div>
      <h1>
        {account_address}
      </h1>
      <div>
        Secret infos
      </div>
    </div>
  )
}

export default Account;