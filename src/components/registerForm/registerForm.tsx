/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-props-no-spreading */
import type { FC } from 'react';
import { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { json } from 'stream/consumers';

import BackGround from 'components/background/BackGround';
import { Input } from 'components/input/input';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export const RegisterForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const url = 'api/registration';

  const formSubmitHandler: SubmitHandler<FormData> = data => {
    async function fetchData() {
      const requestOptions = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      const response = await window.fetch(url, requestOptions);
      const json = await response.json();

      if (response.ok) {
        setIsSuccessful(true);
      } else if (response.status === 406) {
        if (json.errors.name) {
          setError('name', {
            type: 'server',
            message: json.errors.name.message,
          });
        }
        if (json.errors.email) {
          setError('email', {
            type: 'server',
            message: json.errors.email.message,
          });
        }
        if (json.errors.password.rule !== 'same') {
          setError('password', {
            type: 'server',
            message: json.errors.password.message,
          });
        }
        if (json.errors.password.rule === 'same') {
          setError('confirm_password', {
            type: 'server',
            message: json.errors.password.message,
          });
        }
      } else {
        console.log('Unexpected error: ', json);
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData();
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
          <Input label="Name" name="name" register={register} showerror={showError} type="text" />
          <div className="error-text">{errors.name?.message}</div>
          <br />
          <Input
            label="E-mail"
            name="email"
            register={register}
            showerror={showError}
            type="email"
          />
          <div className="error-text">{errors.email?.message}</div>
          <br />
          <Input
            label="Password"
            name="password"
            register={register}
            showerror={showError}
            type="password"
          />
          <div className="error-text">{errors.password?.message}</div>
          <br />
          <Input
            label="Confirm Password"
            name="confirm_password"
            register={register}
            showerror={showError}
            type="password"
          />
          <div className="error-text">{errors.confirm_password?.message}</div>
          <br />
          <div className="tos-checkbox">
            <Input name="tos" register={register} type="checkbox" />
            <label htmlFor="tos">
              I agree to the <span>Terms of Service</span> and <span>Privacy Policy</span>
            </label>
          </div>
          <button type="submit">Register</button>
          {isSuccessful && <p className="successful-message">Successful Registration</p>}
          <div className="sing-in-container">
            <p>Already have an account?</p>
            <p>Sign in</p>
          </div>
        </form>
      </div>
    </>
  );
};
