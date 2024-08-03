import { NavLink, Link } from 'react-router-dom';
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
      <nav className=' container w-full flex flex-wrap gap-y-4 items-center justify-between'>
        <Link to='/' className='flex-1'>
          <figure className='flex items-center gap-5 justify-between w-20 h-20'>
            <img src={logo} alt='Logo' className='' />
          </figure>
        </Link>
        <ul className='flex items-center gap-5 grow'>
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
        </ul>

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
