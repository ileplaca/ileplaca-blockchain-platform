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
      className="fixed backdrop-blur-sm top-0 left-0 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center"
    >
      {children}
    </motion.div>
  );
};

export default Modal;
