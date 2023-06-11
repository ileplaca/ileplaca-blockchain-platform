import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { connectWallet } from 'smart-contracts/connect';
import { setAccount } from 'smart-contracts/slice';


const Index: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <main className='flex items-center justify-center w-screen h-screen text-center'>
      <img src='../../public/images/eth_logo.png' className='absolute z-10 w-96 opacity-30 rotating-360' />
      <section className='z-10'>
        <div>
          <h1 className='text-5xl font-semibold text-primary-text'>
            Welcome!
          </h1>
          <h2 className='mt-2 text-xl font-medium text-text'>
            Connect wallet and start your adventure
          </h2>
          <p className='-mt-2 -light text text-subtext'>
            Browse companies salaries, secret info and add and sell yours
          </p>
        </div>
        <button onClick={async () => {
          const account = await connectWallet()
          if (account) {
            dispatch(setAccount(account))
            navigate('/companies-salaries')
          }
        }} className='px-10 py-3 mt-4 text-2xl font-medium text-white duration-100 bg-primary hover:bg-primary-hover rounded-button'>
          Connect wallet
        </button>
      </section>
    </main>
  )
}

export default Index;