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
      className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen px-2 bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <motion.div
        animate={{ y: [200, 0] }}
        className="flex flex-col justify-between w-full gap-4 px-8 py-8 md:w-2/3 bg-text rounded-button"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Modal;
