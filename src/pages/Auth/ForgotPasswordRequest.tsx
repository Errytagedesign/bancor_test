import * as API from '@/api/apis';
import Spinner from '@/spinner/Spinner';
import { useGlobalHooks } from '@/Hooks/globalHooks';
import ErrorMessage from '@/components/ErrorMessage';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useGlobalContext } from '@/context/GlobalContext';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordRequest = () => {
  const { email, setEmail, setForgotID } = useGlobalContext();
  const [formData, setFormData] = useState({
    emailAddress: email,
    code: '',
  });

  const [emailAddress, setEmailAddress] = useState('');
  const [codeSent, setCodeSent] = useState(false);

  const navigate = useNavigate();

  const {
    errors: customErrors,
    setErrors,
    setLoading,
    loading,
  } = useGlobalHooks();

  const handleChange = (e: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading({ ['pass']: true });
    setEmail(emailAddress);
    API.requestPasswordChange({ emailAddress })
      .then((res) => {
        console.log(res);
        toast.success(res?.data?.message);
        setLoading({ ['pass']: false });
        setCodeSent(true);
      })
      .catch((err) => {
        const erroMessage = {
          success: false,
          message:
            err && err.response
              ? err.response.data.message
              : 'We encounter an error',
        };

        setLoading({ ['pass']: false });

        setErrors({ error: true, errMessage: erroMessage.message });
      });
  };

  const handleVerifyCode = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading({ ['verify']: true });
    setEmail(emailAddress);
    setFormData((prev) => ({ ...prev, emailAddress: emailAddress }));
    API.verifyPasswordCode(formData)
      .then((res) => {
        console.log(res);
        setForgotID(res?.data?.data?.id);
        toast.success(res?.data?.message);
        setLoading({ ['verify']: false });
        setCodeSent(true);
        navigate('/reset-password');
      })
      .catch((err) => {
        const erroMessage = {
          success: false,
          message:
            err && err.response
              ? err.response.data.title
              : 'We encounter an error',
        };

        console.log(erroMessage);
        setLoading({ ['verify']: false });

        setErrors({ error: true, errMessage: erroMessage.message });
      });
  };

  return (
    <main className='signup flex flex-col items-center justify-center gap-5 w-11/12 md:w-6/12 mx-auto min-h-screen my-auto bg-white'>
      <article className='text-center'>
        <h1>Forgot password?</h1>
        {codeSent ? (
          <h5>Enter the code sent to {email}</h5>
        ) : (
          <h5>Enter your email and we will send you a reset instruction</h5>
        )}
      </article>
      {codeSent ? (
        <form onSubmit={handleVerifyCode} className='w-full'>
          <article className=' w-full mt-5'>
            <input
              id='emailAddress'
              name='emailAddress'
              type='email'
              placeholder='Enter your email address'
              defaultValue={formData.emailAddress}
              className='form-control'
              onChange={handleChange}
              required
            />
          </article>
          <article className=' w-full mt-5'>
            <input
              id='code'
              name='code'
              type='number'
              placeholder='Enter your email address'
              className='form-control'
              onChange={handleChange}
              required
            />
          </article>
          <article className='mt-10'>
            <button className='main-btn w-full' type='submit'>
              {loading['verify'] ? <Spinner /> : ' Reset Password'}
            </button>
          </article>

          <div className='flex justify-center mt-6'>
            {customErrors.error && (
              <ErrorMessage message={customErrors.errMessage} />
            )}
          </div>
        </form>
      ) : (
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
      )}
    </main>
  );
};

export default ForgotPasswordRequest;
