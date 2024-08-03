import * as API from '@/api/apis';
import { Link, useNavigate } from 'react-router-dom';
import { ISignUp } from '@/Interfaces/Auth';
import { useGlobalHooks } from '@/Hooks/globalHooks';
import { FormEvent, useEffect, useState } from 'react';
import Spinner from '@/spinner/Spinner';
import ErrorMessage from '@/components/ErrorMessage';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import './style.scss';
import BrandLogo from '@/components/BrandLogo';
import { useGlobalContext } from '@/context/GlobalContext';

const initialValues = {
  firstname: '',
  lastname: '',
  middlename: '',
  emailaddress: '',
  password: '',
  phonenumber: '',
  confirmpassword: '',
  role: 0,
};

const Signup = () => {
  const { loading, setLoading, errors, setErrors } = useGlobalHooks();
  const [passwordType, setPasswordType] = useState<{ [key: string]: boolean }>(
    {},
  );
  const { setEmail } = useGlobalContext();

  const [formData, setFormData] = useState<ISignUp>(initialValues);
  const [rolesData, setRolesData] = useState([]);
  const navigate = useNavigate();

  const showPassword = (id: string) => {
    setPasswordType((prev) => ({ ...prev, [id]: !prev[id] }));
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
    setLoading({ ['signup']: true });

    if (formData?.password !== formData?.confirmpassword) {
      setErrors({ error: true, errMessage: 'Your password does not match' });
      setLoading({ ['signup']: false });
      return;
    }

    setErrors({ error: false, errMessage: '' });
    setEmail(formData?.emailaddress);

    API.SignUp(formData)
      .then((res) => {
        console.log(res);
        setLoading({ ['signup']: false });
        navigate('/verify-email');
      })
      .catch((err) => {
        console.log(err);

        setLoading({ ['signup']: false });
      });
  };

  useEffect(() => {
    const fetchRoles = async () => {
      const { data } = await API.getRoles();
      setRolesData(data?.data);
    };

    fetchRoles();
  }, []);

  return (
    <main className='signup flex flex-col items-center justify-center gap-5 w-11/12 md:w-6/12 mx-auto min-h-screen my-auto bg-white'>
      <article className='w-full md:w-2/12 mx-auto my-2'>
        <BrandLogo />
      </article>
      <article className='  flex flex-col justify-center gap-4'>
        <hgroup>
          <h1 className='mb-3  text-center'>
            Create an Account With Your Email
          </h1>
          <h5>
            Already have an Account?{' '}
            <Link to='/signin' className='text-pryColor font-bold'>
              Login Now
            </Link>
          </h5>
        </hgroup>

        <form
          onSubmit={handleSubmit}
          className='flex flex-wrap gap-4 justify-between w-full'
        >
          <div className='inputWrapper'>
            <label htmlFor='firstname'> First Name</label>
            <input
              id='firstname'
              name='firstname'
              type='text'
              placeholder='Input first name'
              defaultValue={formData.firstname}
              onChange={handleChange}
              className='form-control mt-2'
              required
            />
          </div>
          <div className='inputWrapper'>
            <label htmlFor='lastname'> First Name</label>
            <input
              name='lastname'
              id='lastname'
              type='text'
              placeholder='Input your last name here'
              defaultValue={formData.lastname}
              onChange={handleChange}
              className='form-control mt-2'
              required
            />
          </div>
          <div className='inputWrapper'>
            <label htmlFor='middlename'> Middle Name</label>
            <input
              name='middlename'
              id='middlename'
              type='text'
              placeholder='Input your middle name here'
              defaultValue={formData.middlename}
              onChange={handleChange}
              className='form-control mt-2'
            />
          </div>
          <div className='inputWrapper'>
            <label htmlFor='phonenumber'> Phone Number</label>
            <input
              name='phonenumber'
              id='phonenumber'
              type='text'
              placeholder='Enter your phone number'
              defaultValue={formData.phonenumber}
              onChange={handleChange}
              className='form-control'
              pattern='.{10,}'
              required
            />
          </div>

          <article className='inputWrapper'>
            <label htmlFor='emailaddress'> Email Address</label>
            <input
              id='emailaddress'
              name='emailaddress'
              type='email'
              placeholder='Enter your email address'
              className='form-control mt-2'
              defaultValue={formData.emailaddress}
              onChange={handleChange}
              required
            />
          </article>

          <article className='inputWrapper'>
            <label htmlFor='role'> User Role</label>
            <select
              id='role'
              name='role'
              className='form-control'
              defaultValue={formData.role}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  role: parseInt(e.target.value),
                }))
              }
            >
              <option value=''>Select Role</option>
              {rolesData?.map(({ roleID, roleName }) => (
                <option key={roleID} value={roleID}>
                  {roleName}
                </option>
              ))}
            </select>
          </article>
          <article className='inputWrapper'>
            <label htmlFor='password'> Enter Password</label>
            <div className=' w-full passwordWrapper'>
              <input
                id='password'
                name='password'
                type={passwordType['password'] ? 'text' : 'password'}
                placeholder='Create password'
                className='form-control'
                defaultValue={formData.password}
                onChange={handleChange}
                required
              />
              <div onClick={() => showPassword('password')} className='icon'>
                {!passwordType['password'] ? (
                  <BsFillEyeSlashFill />
                ) : (
                  <BsFillEyeFill />
                )}
              </div>
            </div>
          </article>
          <article className='inputWrapper'>
            <label htmlFor='confirmPassword'> Confirm Password</label>
            <div className=' w-full passwordWrapper'>
              <input
                id='confirmpassword'
                name='confirmpassword'
                type={passwordType['confirmpassword'] ? 'text' : 'password'}
                placeholder='Re-enter password'
                className={` ${
                  errors.errMessage === 'Your password does not match'
                    ? 'errors'
                    : ''
                }  form-control `}
                defaultValue={formData.confirmpassword}
                onChange={handleChange}
                required
              />
              <div
                onClick={() => showPassword('confirmpassword')}
                className='icon'
              >
                {!passwordType['confirmpassword'] ? (
                  <BsFillEyeSlashFill />
                ) : (
                  <BsFillEyeFill />
                )}
              </div>
            </div>
          </article>

          <article className='mt-4 w-full'>
            <button className='main-btn w-full shadow-3xl' type='submit'>
              {loading['signup'] ? <Spinner /> : 'Create Account'}
            </button>
          </article>
        </form>

        <div className='flex flex-col items-center justfy-center w-full mt-2'>
          {errors.error && <ErrorMessage message={errors.errMessage} />}
        </div>
      </article>
    </main>
  );
};

export default Signup;
