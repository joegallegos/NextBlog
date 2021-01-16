import Link from 'next/link';
import Head from 'next/head';
import { Button } from '@chakra-ui/react';
import { FiCamera, FiInstagram, FiLinkedin, FiMonitor } from 'react-icons/fi';
import { IconContext } from 'react-icons/lib';

const name = 'Joe Gallegos';
export const siteTitle = 'Joe Gallegos Blog';

type Layout = {
  children: any;
  home?: boolean;
};

export default function Layout({ children, home }: Layout) {
  return (
    <div className="max-w-xl lg:max-w-4xl md:max-w-2xl py-12 px-4 sm:px-8 md:px-16 mt-8 mx-auto mb-24 bg-brand rounded-lg">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Photography, Code and Life" />
        <meta property="og:image" content="/images/camera.jpg" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className="flex flex-col items-center">
        {home ? (
          <>
            <img
              src="/images/profile.jpg"
              className="w-64 h-64 rounded-full"
              alt={name}
            />
            <h1 className="text-3xl leading-5 font-extrabold tracking-tighter py-4">
              {name}
            </h1>
            <IconContext.Provider value={{ color: '#6E0E0A' }}>
              <div className="flex flex-row space-x-4">
                <a href="https://www.joegallegosphoto.com/" target="__blank">
                  <FiMonitor />
                </a>
                <a
                  href="https://www.flickr.com/photos/joegallegosphotography"
                  target="__blank"
                >
                  <FiCamera />
                </a>
                <a
                  href="https://www.instagram.com/joegallegosphoto/"
                  target="__blank"
                >
                  <FiInstagram />
                </a>
                <a
                  href="https://www.linkedin.com/in/joseph-gallegos-5435755a/"
                  target="__blank"
                >
                  <FiLinkedin />
                </a>
              </div>
            </IconContext.Provider>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <img
                  src="/images/profile.jpg"
                  className="w-24 h-24 rounded-full mb-4"
                  alt={name}
                />
              </a>
            </Link>
            <IconContext.Provider value={{ color: '#6E0E0A' }}>
              <div className="flex flex-row space-x-4 mb-3">
                <a href="https://www.joegallegosphoto.com/" target="__blank">
                  <FiMonitor />
                </a>
                <a
                  href="https://www.flickr.com/photos/joegallegosphotography"
                  target="__blank"
                >
                  <FiCamera />
                </a>
                <a
                  href="https://www.instagram.com/joegallegosphoto/"
                  target="__blank"
                >
                  <FiInstagram />
                </a>
                <a
                  href="https://www.linkedin.com/in/joseph-gallegos-5435755a/"
                  target="__blank"
                >
                  <FiLinkedin />
                </a>
              </div>
            </IconContext.Provider>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className="mt-4">
          <Link href="/">
            <a>
              <Button colorScheme="blue" size="sm" variant="solid">
                ← Back to home
              </Button>
            </a>
          </Link>
        </div>
      )}
    </div>
  );
}
