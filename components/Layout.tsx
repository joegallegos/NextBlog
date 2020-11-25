import Link from 'next/link';
import Head from 'next/head';
import { Button } from '@chakra-ui/react';

const name = 'Joe Gallegos';
export const siteTitle = 'Joe Gallegos Personal Blog';

type Layout = {
  children: any;
  home?: boolean;
};

export default function Layout({ children, home }: Layout) {
  return (
    <div className="max-w-2xl py-12 px-16 mt-8 mx-auto mb-24 bg-brand rounded-lg">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Personal blog website using Next.js"
        />
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
