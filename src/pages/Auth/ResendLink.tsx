import './Signin/login-screen.css';
import Aside from './Aside';
import BrandLogo from '@/components/BrandLogo';

const ResendLink = () => {
  return (
    <main className='categories flex justify-between'>
      <Aside />
      <section className='white w-full md:w-[60%]'>
        <div className='flex justify-end'>
          <BrandLogo className='w-5/12' />
        </div>
        <section className='categoryS'>
          <article>
            <h1>Reset Password Link Sent</h1>
            <h5>
              A reset link was sent to your email, please follow the instruction
              to reset your mail
            </h5>
          </article>
          <form>
            <article className='Btns'>
              <button className='main-btn mm'>
                Didn't get it? Resend Email
              </button>
            </article>
          </form>
        </section>
      </section>
    </main>
  );
};

export default ResendLink;
