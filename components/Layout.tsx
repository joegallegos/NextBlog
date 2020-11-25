import Link from 'next/link';
import Head from 'next/head';

const name = 'Joe Gallegos';
export const siteTitle = 'Joe Gallegos blog site using Next.js';

export default function Layout({ children, home }) {
  return (
    <div className="max-w-xl px-4 mt-12 mx-auto mb-24">
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
    </div>
  );
}
