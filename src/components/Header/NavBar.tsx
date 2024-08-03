import { NavLink } from 'react-router-dom';
import logo from '@/assets/logo.png';
import { useCookies } from '@/Hooks/cookiesHook';
import './Navbar.scss';

const NavBar = () => {
  const { removeTokenCookie, getTokenCookie } = useCookies();

  const logoutUser = () => {
    const userToken = getTokenCookie('rancUserToken');
    if (userToken) {
      removeTokenCookie('rancUserToken');
    }
    localStorage.clear();
    window.location.reload();
  };
  return (
    <header className='navbar'>
      <nav className=' container w-full flex items-center justify-between'>
        <figure className='flex items-center gap-5 justify-between'>
          <img src={logo} alt='Logo' className='h-8 w-auto' />
        </figure>
        <nav className='flex items-center gap-5'>
          <NavLink
            to='/'
            className={({ isActive }) => (isActive ? 'active' : 'notActive')}
          >
            Home
          </NavLink>
          <NavLink
            to='/wallet'
            className={({ isActive }) => (isActive ? 'active' : 'notActive')}
          >
            Wallet
          </NavLink>
        </nav>

        <div>
          <button onClick={logoutUser} className='negative-btn'>
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
