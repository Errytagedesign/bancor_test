import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import * as API from '@/api/apis';
import { useGlobalHooks } from '@/Hooks/globalHooks';
import { FaCheckCircle } from 'react-icons/fa';
import { RxCrossCircled } from 'react-icons/rx';
import { IUserData } from '@/Interfaces/Auth';
import Spinner from '@/spinner/Spinner';

const Profile = () => {
  const [userData, setUserData] = useState<IUserData>();
  const { formatDate, loading, setLoading } = useGlobalHooks();

  useEffect(() => {
    const fetchData = async () => {
      setLoading({ user: true });
      try {
        const rsp = await API.getCurrentUser();
        setUserData(rsp?.data?.data?.profile);
        setLoading({ user: false });
      } catch (error) {
        throw error;
      } finally {
        setLoading({ user: false });
      }
    };

    fetchData();
  }, []);

  return (
    <main className='container my-10 py-10'>
      <h2> Welcome back, {userData?.firstname}</h2>

      {loading['user'] ? (
        <Spinner />
      ) : (
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
      )}
    </main>
  );
};

export default Profile;
