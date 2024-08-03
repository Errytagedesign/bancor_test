import './Signin/login-screen.css';
import BrandLogo from '@/components/BrandLogo';
import { Link } from 'react-router-dom';
import Aside from './Aside';

const PasswordSuccess = () => {
  return (
    <main className='categories flex justify-between'>
      <Aside />

      <section className='white w-full md:w-[60%]'>
        <div className='flex justify-end'>
          <BrandLogo className='w-5/12' />
        </div>
        <article className='categoryS'>
          <h1>Password Reset</h1>
          <h5>Your Password has been reset successfully</h5>
          <Link to='/signin' className='main-btn text-center'>
            Login
          </Link>
        </article>
      </section>
    </main>
  );
};

export default PasswordSuccess;
