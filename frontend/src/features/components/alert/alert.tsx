import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface AlertProps {
  icon: any;
  message: string;
}

const Alert: FC<AlertProps> = ({ message, icon }) => {
  return (
    <motion.div
    
    >
      <FontAwesomeIcon icon={icon} />
      {message}
    </motion.div>
  )
}

export default Alert;