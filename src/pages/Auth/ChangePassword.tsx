import * as API from '@/api/apis';
import { useGlobalHooks } from '@/Hooks/globalHooks';
import Spinner from '@/spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '@/components/ErrorMessage';
import toast from 'react-hot-toast';
import { useGlobalContext } from '@/context/GlobalContext';
import { FormEvent, useState } from 'react';
import BrandLogo from '@/components/BrandLogo';

const ChangePassword = () => {
  const navigate = useNavigate();
  const { email, forgotID } = useGlobalContext();
  const [formData, setFormData] = useState({
    forgotID,
    newPassword: '',
    confirmPassword: '',
  });

  const { errors, setErrors, setLoading, loading } = useGlobalHooks();

  const handleChange = (e: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading({ ['changePass']: true });

    API.resetPassword(formData)
      .then((res) => {
        console.log(res);

        toast.success(res?.data?.message);
        console.log(res);
        setLoading({ ['changePass']: false });

        navigate('/signin');
      })
      .catch((err) => {
        console.log(err);
        const erroMessage = {
          success: false,
          message:
            err && err.response
              ? err.response.data.title
              : 'We encounter an error',
        };

        console.log(erroMessage);
        setLoading({ ['changePass']: false });

        setErrors({ error: true, errMessage: erroMessage.message });
      });
  };

  return (
    <main className='signup flex flex-col items-center justify-center gap-5 w-11/12 md:w-6/12 mx-auto min-h-screen my-auto bg-white'>
      <article className='w-5/12 md:w-3/12 mx-auto my-4'>
        <BrandLogo />
      </article>
      <article className='text-center'>
        <h1>Create New Password</h1>
        <h5>Enter the code sent to {email} and create new password</h5>
      </article>
      <form onSubmit={handleSubmit} className='w-full'>
        <article className=' w-full mt-5'>
          <input
            id='newPassword'
            name='newPassword'
            type='text'
            placeholder='Enter your new password'
            className='form-control'
            onChange={handleChange}
            required
          />
        </article>
        <article className=' w-full mt-5'>
          <input
            id='confirmPassword'
            name='confirmPassword'
            type='text'
            placeholder='Confirm password'
            className='form-control'
            onChange={handleChange}
            required
          />
        </article>
        <article className='mt-10'>
          <button className='main-btn w-full' type='submit'>
            {loading['changePass'] ? <Spinner /> : ' Reset Password'}
          </button>
        </article>
      </form>

      <article className='flex justify-center mt-5'>
        {errors.error && <ErrorMessage message={errors.errMessage} />}
      </article>
    </main>
  );
};

export default ChangePassword;
