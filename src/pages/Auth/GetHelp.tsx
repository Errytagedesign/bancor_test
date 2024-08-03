import { Link } from 'react-router-dom';

const GetHelp = () => {
  return (
    <article className='flex justify-end'>
      <Link to='/help'>
        Having Troubles?{' '}
        <span className='text-[var(--secColor)] font-bold'>Get Help</span>
      </Link>
    </article>
  );
};

export default GetHelp;
