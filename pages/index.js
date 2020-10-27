import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import { getSortedPostsData } from '../lib/posts';
import Date from '../components/Date';

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="text-xl leading-6">
        <p>
          Hi there, I'm <b>Joe</b>. I'm a front-end developer originally from
          Denver, CO currently living in Dallas, Tx.
        </p>
        <br />
        <p>
          I am going to make this blog site just for learning purposes and
          maybe, if I like it, I'll keep it going!
        </p>
      </section>
      <section className="text-xl leading-6">
        <h2 className="text-2xl leading-6 my-4">Blog</h2>
        <ul className="list-none p-0 m-0">
          {allPostsData.map(({ id, date, title }) => (
            <li className="mb-5 text-blue-600" key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className="text-gray-500">
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
