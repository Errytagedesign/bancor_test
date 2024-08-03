import './Signin/login-screen.css';
import Aside from './Aside';
import * as Yup from 'yup';
import * as API from '@/api/apis';
import Spinner from '@/spinner/Spinner';
import { useGlobalHooks } from '@/Hooks/globalHooks';
import ErrorMessage from '@/components/ErrorMessage';
import { useState } from 'react';
import toast from 'react-hot-toast';

const initialValues = {
  email: '',
};

const ForgotPasswordRequest = () => {
  const [formData, setFormData] = useState(initialValues);
  const [linkSent, setLinkSent] = useState(false);

  const {
    errors: customErrors,
    setErrors,
    setLoading,
    loading,
  } = useGlobalHooks();

  const handleSubmit = async () => {
    setLoading({ ['pass']: true });

    API.requestPasswordChange(formData)
      .then((res) => {
        const successMessage = {
          success: true,
          message: res.data.message,
        };
        toast.success(successMessage.message);
        setLoading({ ['pass']: false });

        setLinkSent(true);
        // navigate('/resetpassword');
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

  const signUpSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email address is required'),
  });

  return (
    <main className='categories flex justify-between  bg-white'>
      <section className='white w-full lg:w-[60%] px-3 lg:px-10'>
        {linkSent ? (
          <section className='categoryS'>
            <hgroup>
              <h1>Reset Password Link Sent</h1>
              <h5>
                A reset link was sent to your email, please follow the
                instruction to reset your mail
              </h5>
            </hgroup>
            <form className='mt-10' onSubmit={handleSubmit}>
              <button className='main-btn w-full' type='submit'>
                {loading ? <Spinner /> : 'Didn’t get it? Resend Link'}
              </button>
            </form>

            <div className='flex justify-center mt-6'>
              {customErrors.error && (
                <ErrorMessage message={customErrors.errMessage} />
              )}
            </div>
          </section>
        ) : (
          <section className='categoryS'>
            <article>
              <h1>Forgot password?</h1>
              <h5>Enter your email and we will send you a reset instruction</h5>
            </article>
            <form onSubmit={handleSubmit}>
              <article className=' w-full mt-5'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='Enter your email address'
                  required
                />
              </article>
              <article className='mt-10'>
                <button className='main-btn w-full' type='submit'>
                  {loading ? <Spinner /> : ' Reset Password'}
                </button>
              </article>

              <div className='flex justify-center mt-6'>
                {customErrors.error && (
                  <ErrorMessage message={customErrors.errMessage} />
                )}
              </div>
            </form>
          </section>
        )}
      </section>
    </main>
  );
};

export default ForgotPasswordRequest;
