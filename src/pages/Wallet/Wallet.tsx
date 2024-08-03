import { useEffect, useState } from 'react';
import * as API from '@/api/apis';
import { useGlobalHooks } from '@/Hooks/globalHooks';
import Spinner from '@/spinner/Spinner';

const Wallet = () => {
  const [walletData, setWalletData] = useState<{
    walletNumber: string;
    balance: number;
    createdDate: string;
  }>();
  const { formatDate, loading, setLoading } = useGlobalHooks();

  useEffect(() => {
    const fetchData = async () => {
      setLoading({ user: true });
      try {
        const rsp = await API.getMyWallet();
        console.log(rsp);
        setWalletData(rsp?.data?.data);
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
      <h2> My Wallet</h2>

      {loading['user'] ? (
        <Spinner />
      ) : (
        <ul className='rounded-lg border border-gray-400 mt-7 divide-y w-full md:w-6/12'>
          <li className='flex items-center justify-between py-3 px-7'>
            <p>Wallet Balance</p>{' '}
            <b className='text-pryColor uppercase'>
              {' '}
              ₦{walletData?.balance.toFixed(2)}
            </b>
          </li>

          <li className='flex items-center justify-between py-3 px-7'>
            <p>Wallet Number</p>{' '}
            <b className='text-pryColor uppercase'>
              {' '}
              {walletData?.walletNumber}
            </b>
          </li>

          <li className='flex items-center justify-between py-3 px-7'>
            <p>Date Created</p>{' '}
            <b className='text-pryColor uppercase'>
              {' '}
              {formatDate(new Date(walletData?.createdDate as string))}{' '}
            </b>
          </li>
        </ul>
      )}
    </main>
  );
};

export default Wallet;
