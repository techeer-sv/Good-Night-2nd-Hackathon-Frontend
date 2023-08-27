import { Controls, Player } from '@lottiefiles/react-lottie-player';
import { useRouter } from 'next/router';
import React from 'react';

import Layout from '../src/layouts/Layout';

function Error404() {
  const router = useRouter();

  return (
    <section className='py-8 px-4 text-center'>
      <div className='max-w-auto md:max-w-4xl mx-auto'>
        <div className='flex flex-col items-center my-12 md:my-20'>
          {/** asset 주소: https://lottiefiles.com/search?q=404&category=animations&animations-sort=popular */}
          <Player
            autoplay
            loop
            src='https://assets9.lottiefiles.com/packages/lf20_zyu0ctqb.json'
            className='max-w-[500px]'
          >
            <Controls
              visible={false}
              buttons={['play', 'repeat', 'frame', 'debug']}
            />
          </Player>
          <div className='font-bold text-3xl xl:text-7xl lg:text-6xl md:text-5xl'>
            존재하지 않는 페이지입니다.
          </div>
          <div className='text-main-1 font-medium text-sm md:text-xl lg:text-2xl mt-8'>
            The page you are looking for does not exist.
          </div>
          <button
            type='button'
            className='flex items-center rounded-lg bg-main-1 px-4 py-2 text-white mt-8'
            onClick={() => router.replace('/')}
          >
            <span className='font-medium'>
              Back To Homepage
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Error404;

Error404.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};