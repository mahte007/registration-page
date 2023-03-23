/* eslint-disable react/jsx-props-no-spreading */
import type { FC } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

import { Input } from 'components/input/input';

interface FormData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export const RegisterForm: FC = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const formSubmitHandler: SubmitHandler<FormData> = data => {
    console.log(data);
  };

  function wrapAsyncFunction<ARGS extends unknown[]>(
    fn: (...args: ARGS) => Promise<unknown>,
  ): (...args: ARGS) => void {
    return (...args) => {
      void fn(...args);
    };
  }

  return (
    <div>
      <form onSubmit={wrapAsyncFunction(handleSubmit(formSubmitHandler))}>
        <Input label="name" name="name" register={register} type="text" />
        <br />
        <Input label="email" name="email" register={register} type="email" />
        <br />
        <Input label="pass" name="password" register={register} type="password" />
        <br />
        <Input label="re-pass" name="passwordConfirm" register={register} type="password" />
        <br />
        <button type="submit">Küldés</button>
      </form>
    </div>
  );
};
