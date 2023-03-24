/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-props-no-spreading */
import type { FC } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

import BackGround from 'components/background/BackGround';
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
    <>
      <BackGround className="background-svg" />
      <div className="main-container">
        <h2>Get started in minutes</h2>
        <p>
          First, let's create your account. Once your account has been created you can choose the
          billing plan that is right for you and link your account with a server provider.
        </p>
        <form
          className="form-container"
          onSubmit={wrapAsyncFunction(handleSubmit(formSubmitHandler))}
        >
          <Input label="Name" name="name" register={register} type="text" />
          <br />
          <Input label="E-mail" name="email" register={register} type="email" />
          <br />
          <Input label="Password" name="password" register={register} type="password" />
          <br />
          <Input
            label="Confirm Password"
            name="passwordConfirm"
            register={register}
            type="password"
          />
          <br />
          <button type="submit">Küldés</button>
        </form>
      </div>
    </>
  );
};
