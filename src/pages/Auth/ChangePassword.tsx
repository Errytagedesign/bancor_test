import './Signin/login-screen.css';
import * as Yup from 'yup';
import * as API from '@/api/apis';
import { useGlobalHooks } from '@/Hooks/globalHooks';
import Spinner from '@/spinner/Spinner';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ErrorMessage from '@/components/ErrorMessage';
import toast from 'react-hot-toast';

const initialValues = {
  password: '',
  confirmPassword: '',
};

const ChangePassword = () => {
  const navigate = useNavigate();

  // Get token from the url
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');

  const {
    errors: customErrors,
    setErrors,
    setLoading,
    loading,
  } = useGlobalHooks();

  const handleSubmit = async () => {
    setLoading({ ['pass']: true });

    API.resetPassword(token)
      .then((res) => {
        const successMessage = {
          success: true,
          message: res.data.message,
        };
        toast.success(successMessage.message);
        console.log(res);
        setLoading({ ['pass']: false });

        navigate('/password-reset-successfully');
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

  const passwordSchema = Yup.object().shape({
    password: Yup.string()
      .required(
        'Password must include number and special chars, number and minimum of 8 chars',
      )
      .min(8, ' Must be Minimum of 8 Characters')
      .matches(/^(?=.*[a-z])/, ' Must Contain One Lowercase Character')
      .matches(/^(?=.*[A-Z])/, '  Must Contain One Uppercase Character')
      .matches(/^(?=.*[0-9])/, '  Must Contain One Number Character')
      .matches(
        /^(?=.*[!@#$%^&*])/,
        '  Must Contain  One Special Case Character',
      ),

    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Your passwords does not match'),
  });

  return (
    <main className='categories flex flex-wrap justify-between bg-white'>
      <section className='white w-full lg:w-[60%] px-3 lg:px-10'>
        <section className='categoryS'>
          <article>
            <h1>Create New Password</h1>
            <h5>
              Your new password must be different from previous used passwords.
            </h5>
          </article>
          <form onSubmit={handleSubmit}>
            <article className=' w-full mt-5'>
              <input
                id='password'
                name='password'
                type='password'
                placeholder='Enter your password'
                required
              />
            </article>
            <article className=' w-full mt-5'>
              <input
                id='confirmPassword'
                name='confirmPassword'
                type='password'
                placeholder='Enter your password'
                required
              />
            </article>
            <article className='mt-10'>
              <button className='main-btn w-full' type='submit'>
                {loading ? <Spinner /> : ' Reset Password'}
              </button>
            </article>
          </form>

          <div className='flex justify-center mt-5'>
            {customErrors.error &&
            customErrors.errMessage === 'Password reset failed: jwt expired' ? (
              <div className='flex flex-wrap items-center gap-3 mt-4'>
                <ErrorMessage message='Password reset link expired' />

                <div className=''>
                  <Link
                    to='/forgot-password'
                    className='text-[var(--pryColor)] font-bold border-[var(--pryColor)] border-[1px] rounded-md p-1'
                  >
                    {' '}
                    Request for a new link
                  </Link>
                </div>
              </div>
            ) : (
              customErrors.error && (
                <ErrorMessage message={customErrors.errMessage} />
              )
            )}
          </div>
        </section>
      </section>
    </main>
  );
};

export default ChangePassword;
