import * as API from '@/api/apis';
import Spinner from '@/spinner/Spinner';
import { useGlobalHooks } from '@/Hooks/globalHooks';
import ErrorMessage from '@/components/ErrorMessage';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useGlobalContext } from '@/context/GlobalContext';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordRequest = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const { setEmail } = useGlobalContext();
  const navigate = useNavigate();

  const {
    errors: customErrors,
    setErrors,
    setLoading,
    loading,
  } = useGlobalHooks();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading({ ['pass']: true });
    setEmail(emailAddress);
    API.requestPasswordChange({ emailAddress })
      .then((res) => {
        console.log(res);
        toast.success(res?.data?.message);
        setLoading({ ['pass']: false });
        navigate('/reset-password');
      })
      .catch((err) => {
        const erroMessage = {
          success: false,
          message:
            err && err.response
              ? err.response.data.message
              : 'We encounter an error',
        };

        console.log(erroMessage);
        setLoading({ ['pass']: false });

        setErrors({ error: true, errMessage: erroMessage.message });
      });
  };

  return (
    <main className='signup flex flex-col items-center justify-center gap-5 w-11/12 md:w-6/12 mx-auto min-h-screen my-auto bg-white'>
      <article className='text-center'>
        <h1>Forgot password?</h1>
        <h5>Enter your email and we will send you a reset instruction</h5>
      </article>
      <form onSubmit={handleSubmit} className='w-full'>
        <article className=' w-full mt-5'>
          <input
            id='email'
            name='email'
            type='email'
            placeholder='Enter your email address'
            className='form-control'
            onChange={(e) => setEmailAddress(e.target.value)}
            required
          />
        </article>
        <article className='mt-10'>
          <button className='main-btn w-full' type='submit'>
            {loading['pass'] ? <Spinner /> : ' Reset Password'}
          </button>
        </article>

        <div className='flex justify-center mt-6'>
          {customErrors.error && (
            <ErrorMessage message={customErrors.errMessage} />
          )}
        </div>
      </form>
    </main>
  );
};

export default ForgotPasswordRequest;
