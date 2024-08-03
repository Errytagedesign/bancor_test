import './login-screen.css';
import * as Yup from 'yup';
import * as API from '@/api/apis';

import ErrorMessage from '@/components/ErrorMessage';
import GetHelp from '../GetHelp';
import { useCookies } from '@/Hooks/cookiesHook';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalHooks } from '@/Hooks/globalHooks';
import { ISignIn } from '@/Interfaces/Auth';
import toast from 'react-hot-toast';
import Spinner from '@/spinner/Spinner';
import { useState } from 'react';

const initialValues = {
  email: '',
  password: '',
};

const Signin = () => {
  const { setCookies } = useCookies();
  const [formData, setFormData] = useState(initialValues);

  const navigate = useNavigate();
  const { errors, setErrors, loading, setLoading } = useGlobalHooks();

  const handleSubmit = async () => {
    setLoading({ ['signin']: true });

    API.SignIn(formData)
      .then((res) => {
        const successMessage = {
          success: true,
          message: res.status === 200 ? 'User logged in successfuly' : '',
        };

        const userToken = res.data?.data?.token.access.token;

        toast.success(successMessage.message);

        setCookies('userToken', userToken);

        setLoading({ ['signin']: false });
        navigate('/');
      })
      .catch((err) => {
        const erroMessage = {
          success: false,
          message:
            err && err.response
              ? err.response.data.message
              : 'We encounter an error',
        };
        setLoading({ ['signin']: false });

        setErrors({ error: true, errMessage: erroMessage.message });
      });
  };

  const signUpSchema = Yup.object().shape({
    password: Yup.string().required('Field cannot be empty'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email address is required'),
  });

  return (
    <main className='categories flex justify-between min-h-screen bg-white'>
      <aside className='white w-full lg:w-[60%] flex flex-col justify-between py-5 px-5 lg:px-10'>
        <section className=''>
          <section className='categoryS'>
            <article>
              <h1>Welcome Back, Kindly Login</h1>
              <h5>
                Don&apos;t have an account?{' '}
                <Link to='/signup'>Create Account Here</Link>
              </h5>
            </article>
            <form onSubmit={handleSubmit}>
              <article className=' w-full '>
                <input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='Enter your email address'
                  required
                />
              </article>
              <article className=' w-full mt-3'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  placeholder='Create a strong password'
                  required
                />
              </article>
              <article className='flex items-center gap-2'>
                <input type='checkbox' name='keep' />

                <small className='!m-0 !p-0'>Keep me logged in</small>
              </article>

              <article className='mt-5 w-full '>
                <button
                  style={{ boxShadow: '0px 8px 20px 0px #4E60FF29' }}
                  className='main-btn w-full'
                  type='submit'
                >
                  {loading['signin'] ? <Spinner /> : 'Login'}
                </button>

                <div className='text-center   w-full mt-3'>
                  <Link
                    to='/forgot-password'
                    className='font-semibold text-[var(--pryColor)]  '
                  >
                    Forgot password
                  </Link>
                </div>
              </article>

              <div className='flex flex-col items-center justfy-center w-full mt-5'>
                {!loading && errors.error && (
                  <ErrorMessage message={errors.errMessage} />
                )}
              </div>
            </form>
          </section>
        </section>
        <GetHelp />
      </aside>
    </main>
  );
};

export default Signin;
