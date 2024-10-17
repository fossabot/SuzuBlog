import Image from 'next/image';
import PostsPage from './posts/page';

export default function Home() {
  return (
    <div>
      {/* Top Banner */}
      <div
        className='relative h-[500px] w-full bg-cover bg-center md:h-[800px]'
        style={{ backgroundImage: "url('/images/katomegumi.jpg')" }}
      >
        {/* Avatar */}
        <div className='absolute left-1/2 top-[60%] -translate-x-1/2 transform'>
          <Image
            src='/images/avatar.jpg'
            alt='Avatar'
            width={150}
            height={150}
            className='aspect-square h-[60vw] max-h-[150px] w-[60vw] max-w-[150px] rounded-full border-4 border-gray-300 object-cover md:h-[150px] md:w-[150px]'
          />
        </div>
      </div>

      {/* Slogan */}
      <div className='mt-4 text-center'>
        <h1 className='text-2xl font-semibold'>Your Slogan Goes Here</h1>
      </div>

      {/* Posts List - centered */}
      <div className='container mx-auto mt-10 justify-center p-4'>
        <PostsPage />
      </div>
    </div>
  );
}
