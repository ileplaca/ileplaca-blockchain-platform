import React, { ReactNode } from 'react';
import { FCC } from 'utils/types';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
  type?: "form"
}

const Modal: FCC<Props> = ({ children, type }: Props) => {
  return (
    <motion.div
      animate={{ opacity: [0, 100] }}
      className={`fixed top-0 left-0 z-50 w-screen h-screen px-3 bg-black bg-opacity-50 lg:flex lg:items-center lg:justify-center backdrop-blur-sm`}
    >
      <motion.div
        animate={{ y: [200, 0] }}
        className="flex flex-col justify-between max-h-[95%] xl:max-h-[auto] w-full lg:w-3/4 gap-4 px-8 py-8 mt-6 overflow-y-auto xl:mt-0 xl:w-2/3 bg-text rounded-button"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Modal;
