import * as API from '@/api/apis';
import ErrorMessage from '@/components/ErrorMessage';
import { useCookies } from '@/Hooks/cookiesHook';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalHooks } from '@/Hooks/globalHooks';
import toast from 'react-hot-toast';
import Spinner from '@/spinner/Spinner';
import { FormEvent, useState } from 'react';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { useGlobalContext } from '@/context/GlobalContext';
import BrandLogo from '@/components/BrandLogo';

const initialValues = {
  emailAddress: '',
  password: '',
};

const Signin = () => {
  const { setCookies } = useCookies();
  const [formData, setFormData] = useState(initialValues);
  const [passwordType, setPasswordType] = useState(false);
  const navigate = useNavigate();
  const { errors, setErrors, loading, setLoading } = useGlobalHooks();

  const { setIsLoggedIn } = useGlobalContext();

  const showPassword = () => {
    setPasswordType(!passwordType);
  };

  const handleChange = (e: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading({ ['signin']: true });

    API.SignIn(formData)
      .then((res) => {
        console.log(res);

        const userToken = res.data?.token;
        toast.success('User Singin Successfully');
        setCookies('rancUserToken', userToken);
        setIsLoggedIn(true);
        setLoading({ ['signin']: false });
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        const erroMessage = {
          success: false,
          message:
            err && err.response
              ? err.response.data.errorMessage
              : 'We encounter an error',
        };
        setLoading({ ['signin']: false });

        setErrors({ error: true, errMessage: erroMessage.message });
      });
  };

  return (
    <main className='signup flex flex-col items-center justify-center gap-5 w-11/12 md:w-6/12 mx-auto min-h-screen my-auto bg-white'>
      <article className='w-5/12 md:w-3/12 mx-auto my-4'>
        <BrandLogo />
      </article>
      <article className='text-center'>
        <h1 className='mb-3'>Welcome Back, Kindly Login</h1>
        <h5>
          Don&apos;t have an account?{' '}
          <Link to='/signup' className='text-pryColor font-bold'>
            Create Account Here
          </Link>
        </h5>
      </article>
      <form
        className={`form flex flex-col justify-between mt-5 w-full`}
        onSubmit={handleSubmit}
      >
        <section className='mb-3'>
          <label htmlFor='emailAddress' className='labelTitle'>
            {' '}
            Email Address
          </label>
          <div>
            <input
              type='email'
              id='emailAddress'
              name='emailAddress'
              placeholder='example@gmail.com'
              defaultValue={formData.emailAddress}
              onChange={handleChange}
              className='form-control'
              required
            />
          </div>
        </section>
        <section className='w-full mb-3'>
          <label htmlFor='email' className='labelTitle'>
            {' '}
            Password
          </label>
          <div className={` passwordWrapper w-full`}>
            <input
              id='password'
              type={!passwordType ? 'password' : 'text'}
              name='password'
              placeholder='enter your password'
              defaultValue={formData.password}
              onChange={handleChange}
              className={` formInput  form-control `}
              required
            />{' '}
            <div onClick={showPassword} className='icon'>
              {!passwordType ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
            </div>
          </div>

          <div className=' font-bold text-end mt-2'>
            <Link to='/forgot-password' className='!text-pryColor'>
              Forgot Password
            </Link>
          </div>
        </section>

        <div className=' w-full text-center'>
          <button className='main-btn w-full mt-1' type='submit'>
            {loading['signin'] ? <Spinner /> : 'Log In'}
          </button>
        </div>
        <div className='flex flex-col items-center justfy-center w-full mt-5'>
          {errors.error && <ErrorMessage message={errors.errMessage} />}
        </div>
      </form>
    </main>
  );
};

export default Signin;
