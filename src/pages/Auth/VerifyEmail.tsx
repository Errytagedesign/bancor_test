import React, { FormEvent, useEffect, useRef, useState } from 'react';

import { toast } from 'react-hot-toast';
import * as API from '@/api/apis';

import { useNavigate } from 'react-router-dom';
import { useGlobalHooks } from '@/Hooks/globalHooks';
import { useGlobalContext } from '@/context/GlobalContext';
import ErrorMessage from '@/components/ErrorMessage';
import Spinner from '@/spinner/Spinner';
import BrandLogo from '@/components/BrandLogo';

const numInput = [
  { id: '1', name: 'num1' },
  { id: '2', name: 'num2' },
  { id: '3', name: 'num3' },
  { id: '4', name: 'num4' },
  { id: '5', name: 'num5' },
  { id: '6', name: 'num6' },
];

const VerifyEmail = () => {
  const { loading, setLoading, errors, setErrors } = useGlobalHooks();
  const navigate = useNavigate();

  const { email } = useGlobalContext();

  const [verifyCode, setVerifyCode] = useState({
    num1: '',
    num2: '',
    num3: '',
    num4: '',
    num5: '',
    num6: '',
  });

  const inputRefs = useRef([
    React.createRef<HTMLInputElement>(),
    React.createRef<HTMLInputElement>(),
    React.createRef<HTMLInputElement>(),
    React.createRef<HTMLInputElement>(),
    React.createRef<HTMLInputElement>(),
    React.createRef<HTMLInputElement>(),
  ]);

  const handleChange = (e: FormEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target as HTMLInputElement;
    setVerifyCode({ ...verifyCode, [`num${index + 1}`]: value });

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].current?.focus();
    }
  };

  const handleVerifyEmail = async () => {
    if (Object.keys(verifyCode).some((code) => code === '')) {
      setErrors({
        error: true,
        errMessage: 'Enter the code sent to your email',
      });
      return;
    }

    const verificationCode = Object.values(verifyCode).join('');
    setLoading({ ['verify']: true });

    API.verifyEmail({
      emailAddress: email,
      activationCode: verificationCode,
    })
      .then((res) => {
        console.log(res);

        if (res?.data?.statusCode !== 200) {
          setErrors({ error: true, errMessage: res?.data?.message });
          setLoading({ ['verify']: false });
        } else {
          toast.success(res?.data?.message ?? 'Activation successful');
          setLoading({ ['verify']: false });

          navigate('/signin');
        }
      })
      .catch((err) => {
        console.log(err);

        setErrors({ error: true, errMessage: err });
        setLoading({ ['verify']: false });
      });
  };

  // When delete is pressed it should delete backward and jump focus to current input
  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    // Detect if backspace or delete key is clicked, if yes and the current input value is empty, jump backward to next one if available
    if (e.key === 'Backspace' && !e.currentTarget?.value && index > 0) {
      inputRefs.current[index - 1].current?.focus();
    }
  };

  // Auto focus on component mount
  useEffect(() => {
    inputRefs.current[0].current?.focus();
  }, []);

  useEffect(() => {
    if (
      verifyCode.num1 &&
      verifyCode.num2 &&
      verifyCode.num3 &&
      verifyCode.num4 &&
      verifyCode.num5 &&
      verifyCode.num6
    ) {
      handleVerifyEmail();
    }
  }, [verifyCode]);

  return (
    <section
      className={` bg-white rounded-md px-3 py-10 md:px-8 w-11/12 md:w-5/12 mx-auto min-h-screen grid place-items-center`}
    >
      <article className='w-5/12 md:w-3/12 mx-auto my-4'>
        <BrandLogo />
      </article>
      <form className='flex flex-col '>
        <hgroup className='text-center my-3'>
          <h4 className='font-bold mb-5'>Verify with email</h4>

          <h5 className='mt-1 text-grey1 font-medium'>
            {' '}
            Code sent to <span className='text-black'> {email}</span>
          </h5>
        </hgroup>
        <article>
          <ul className={`flex items-center gap-2 justify-center`}>
            {numInput.map(({ id, name }, idx) => (
              <li className='w-2/12 lg:w-1/12' key={id}>
                <input
                  ref={inputRefs.current[idx]}
                  id={id}
                  type='text'
                  name={name}
                  onChange={(e) => handleChange(e, idx)}
                  onKeyDown={(e) => handleKeyPress(e, idx)}
                  maxLength={1}
                  defaultValue={verifyCode[name as keyof typeof verifyCode]}
                  className={`${
                    errors.error && 'errors animate__animated  animate__shakeY'
                  }  form-control !p-1 text-center h-[50px]`}
                />
              </li>
            ))}
          </ul>
        </article>

        <article>
          <div className='mt-10'>
            <button
              className='main-btn w-full'
              type='button'
              onClick={handleVerifyEmail}
            >
              {' '}
              {loading['verify'] ? <Spinner /> : 'Verify '}
            </button>
          </div>{' '}
          <div className='flex justify-center my-2'>
            {errors.error && <ErrorMessage message={errors.errMessage} />}
          </div>
        </article>
      </form>
    </section>
  );
};

export default VerifyEmail;
