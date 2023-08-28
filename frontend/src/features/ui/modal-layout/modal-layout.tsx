import React, { ReactNode } from 'react';
import { FCC } from 'utils/types';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
}

const Modal: FCC<Props> = ({ children }: Props) => {
  return (
    <motion.div
      animate={{ opacity: [0, 100] }}
      className="fixed top-0 left-0 z-50 w-screen h-screen px-3 bg-black bg-opacity-50 2xl:flex 2xl:items-center 2xl:justify-center backdrop-blur-sm"
    >
      <motion.div
        animate={{ y: [200, 0] }}
        className="flex flex-col justify-between max-h-[95%] 2xl:max-h-[auto] w-full gap-4 px-8 py-8 mt-6 overflow-y-auto 2xl:mt-0 2xl:w-2/3 bg-text rounded-button"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Modal;
