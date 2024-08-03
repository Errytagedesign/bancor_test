import man from '../../../public/man.png';
import Logo from '../../../public/logo.png';
import Eye from '../../../public/eye.svg';
import '../HomeComps/login-screen.css';

const GetStarted = () => {
  return (
    <main className='categories'>
      <section className='purple'>
        <h2>Whats in it for you</h2>
        <article className='purpleImg'>
          <img src={man} alt='man' />
        </article>
        <article>
          <h3>AS A BUYER...</h3>
          <h4>
            You get to locate and connect with Local sellers and businesses in
            your neighbourhood
          </h4>
        </article>
        <article>
          <h3>AS A SELLER...</h3>
          <h4>
            What better way to reach a wider audience ready to purchase your
            products and Services
          </h4>
        </article>
      </section>
      <section className='white'>
        <article className='whiteImg'>
          <img src={Logo} alt='Local venda logo' />
        </article>
        <section className='categoryS'>
          <article>
            <h1>Create New Password</h1>
            <h5>
              Your new password must be different from previous used passwords.
            </h5>
          </article>
          <form>
            <article className='input'>
              <label htmlFor='password'>Password</label>
              <div className='inputContainer'>
                <input
                  type='text'
                  placeholder='*********'
                  className='form-controls'
                />
                <div className='pass-icon'>
                  <img src={Eye} alt='Eye icon' />
                </div>
              </div>
              <small>Must be at least 8 characters</small>
            </article>
            <article className='input'>
              <label htmlFor='password'>Confirm Password</label>
              <div className='inputContainer'>
                <input
                  type='text'
                  placeholder='*********'
                  className='form-controls'
                />
                <div className='pass-icon'>
                  <img src={Eye} alt='Eye icon' />
                </div>
              </div>
            </article>
            <article className='Btns'>
              <button className='main-btn'>Reset Password</button>
            </article>
          </form>
        </section>
      </section>
    </main>
  );
};

export default GetStarted;
