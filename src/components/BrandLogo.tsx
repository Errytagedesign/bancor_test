import { Link } from 'react-router-dom';
import Logo from '@/assets/logo.png';

const BrandLogo = () => {
  return (
    <Link to='/' className='flex'>
      <figure>
        <img src={Logo} alt='Brand logo' />
      </figure>
    </Link>
  );
};

export default BrandLogo;
