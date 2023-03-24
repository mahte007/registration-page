/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable react/jsx-props-no-spreading */
import type { FC, HTMLInputTypeAttribute } from 'react';

interface InputProps {
  name?: string;
  type?: HTMLInputTypeAttribute;
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any;
}

export const Input: FC<InputProps> = ({ name, type, label, register }) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <br />
      <input id={name} type={type} {...register(name)} />
    </>
  );
};
