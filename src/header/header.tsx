/* eslint-disable @typescript-eslint/no-unsafe-return */
import Image from 'next/image';
import type { FC } from 'react';

import img from '../styles/Logo.png';

interface InputProps {
  className?: string;
}

export const Header: FC<InputProps> = ({ className }) => {
  return (
    <div className={className}>
      <Image alt="Logo" src={img} />
    </div>
  );
};
