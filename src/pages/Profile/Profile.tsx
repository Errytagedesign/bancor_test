import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import * as API from '@/api/apis';
import { useGlobalHooks } from '@/Hooks/globalHooks';
import { FaCheckCircle } from 'react-icons/fa';
import { RxCrossCircled } from 'react-icons/rx';

const Profile = () => {
  const [userData, setUserData] = useState<{ [key: string]: string }>();
  const { formatDate } = useGlobalHooks();

  useEffect(() => {
    const fetchData = async () => {
      const rsp = await API.getCurrentUser();
      console.log(rsp);
      setUserData(rsp?.data?.data?.profile);
    };

    fetchData();
  }, []);

  console.log(userData);

  return (
    <main className='container my-10 py-10'>
      <h2> Welcome back, {userData?.firstname}</h2>

      <ul className='rounded-lg border border-gray-400 mt-7 divide-y w-full md:w-6/12'>
        <li className='flex items-center justify-between py-3 px-7'>
          <p>User Name</p>{' '}
          <b className='text-pryColor uppercase'>
            {' '}
            {userData?.firstname} {userData?.lastname}{' '}
          </b>
        </li>
        <li className='flex items-center justify-between py-3 px-7'>
          <p>Verified</p>{' '}
          <b className='text-pryColor uppercase'>
            {' '}
            {userData?.isEmailConfirmed ? (
              <FaCheckCircle className='text-positive' />
            ) : (
              <RxCrossCircled className='text-negative' />
            )}{' '}
          </b>
        </li>
        <li className='flex items-center justify-between py-3 px-7'>
          <p>Phone Number</p>{' '}
          <b className='text-pryColor uppercase'> {userData?.phonenumber} </b>
        </li>
        <li className='flex items-center justify-between py-3 px-7'>
          <p>Role</p>{' '}
          <b className='text-pryColor uppercase'>
            {' '}
            {userData?.roleDetails?.roleName as string}{' '}
          </b>
        </li>
        <li className='flex items-center justify-between py-3 px-7'>
          <p>Date Joined</p>{' '}
          <b className='text-pryColor uppercase'>
            {' '}
            {formatDate(new Date(userData?.datecreated as string))}{' '}
          </b>
        </li>
      </ul>
    </main>
  );
};

export default Profile;
