import Logo from '@/assets/logo.png';
import * as Yup from 'yup';
import * as API from '@/api/apis';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from '@/Hooks/cookiesHook';
import { ISignUp } from '@/Interfaces/Auth';
import { useGlobalHooks } from '@/Hooks/globalHooks';
import toast from 'react-hot-toast';
import { useState } from 'react';
import Spinner from '@/spinner/Spinner';
import ErrorMessage from '@/components/ErrorMessage';

const initialValues = {
  firstname: '',
  lastname: '',
  middlename: '',
  emailaddress: '',
  password: '',
  phonenumber: '',
};
const Signup = () => {
  const { loading, setLoading, errors, setErrors } = useGlobalHooks();
  const { setCookies } = useCookies();

  const [formData, setFormData] = useState<ISignUp>(initialValues);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading({ ['signup']: true });

    API.SignUp(formData)
      .then((res) => {
        const successMessage = {
          success: true,
          message: res.data.message,
        };

        const userToken = res.data.tokens.access.token;
        const tokenExpires = res.data.tokens.access.expires;
        const userId = res.data.user.id;
        const userEmail = res.data.user.email;
        const userName = `${res.data.user.firstName} ${res.data.user.lastName}`;
        const onBoarded = res.data.user.onboarded;

        toast.success(successMessage.message);

        setCookies('userToken', userToken);

        setLoading({ ['signup']: false });

        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        const erroMessage = {
          success: false,
          message:
            err && err.response
              ? err.response.data.message
              : 'We encounter an error',
        };
        setLoading({ ['signup']: false });

        setErrors({ error: true, errMessage: erroMessage.message });
      });
  };

  const signUpSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    password: Yup.string()
      .required(
        'Password must include number and special chars, number and minimum of 8 chars',
      )
      .matches(/^(?=.{8,})/, ' Must be Minimum of 8 Characters')
      .matches(/^(?=.*[a-z])/, ' Must Contain One Lowercase Character')
      .matches(/^(?=.*[A-Z])/, '  Must Contain One Uppercase Character')
      .matches(/^(?=.*[0-9])/, '  Must Contain One Number Character')
      .matches(
        /^(?=.*[!@#$%^&*])/,
        '  Must Contain  One Special Case Character',
      ),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email address is required'),
  });

  return (
    <main className='categories flex justify-between bg-white'>
      <section className='whiteC px-3 lg:px-10  flex flex-col justify-center w-full lg:w-[55%]'>
        <article className='categoryS  flex flex-col justify-center gap-7'>
          <hgroup>
            <h1>Create an Account With Your Email</h1>
            <h5>
              Already have an Account? <Link to='/signin'>Login Now</Link>
            </h5>
          </hgroup>

          <form onSubmit={handleSubmit}>
            <article className='flex flex-wrap gap-2 justify-between w-full'>
              <div className='inputWrapper'>
                <input
                  id='firstName'
                  name='firstName'
                  type='text'
                  placeholder='Input first name'
                  required
                />
              </div>
              <div className='inputWrapper'>
                <input
                  name='lastName'
                  id='lastName'
                  type='text'
                  placeholder='Input your last name here'
                  required
                />
              </div>
            </article>
            <article className=' w-full mt-5'>
              <input
                id='email'
                name='email'
                type='email'
                placeholder='Enter your email address'
                required
              />
            </article>
            <article className=' w-full mt-8'>
              <input
                id='password'
                name='password'
                type='password'
                placeholder='Create a strong password'
                required
              />
            </article>

            <article className='mt-8'>
              <button
                style={{ boxShadow: '0px 8px 20px 0px #4E60FF29' }}
                className='main-btn w-full'
                type='submit'
              >
                {loading ? <Spinner /> : 'Create Account'}
              </button>
            </article>
          </form>

          <div className='flex flex-col items-center justfy-center w-full mt-5'>
            {!loading && errors.error && (
              <ErrorMessage message={errors.errMessage} />
            )}
          </div>
        </article>
      </section>
    </main>
  );
};

export default Signup;
