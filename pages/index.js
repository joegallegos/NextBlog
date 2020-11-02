import Head from 'next/head';
import fs from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';

export default function Home({ posts }) {
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
        <p>
          I am going to make this blog site just for learning purposes and
          maybe, if I like it, I'll keep it going!
        </p>
      </section>
      <section className="text-xl leading-6">
        {posts
          .reverse()
          .map(({ frontmatter: { title, description, date }, slug }) => (
            <article key={slug}>
              <header className="flex flex-col p-0 m-0">
                <h3 className="p-0 m-0">
                  <Link href={'/post/[slug]'} as={`/post/${slug}`}>
                    <a className="text-2xl font-semibold text-blue-600 no-underline">
                      {title}
                    </a>
                  </Link>
                </h3>
                <span className="text-xs">{date}</span>
              </header>
              <section>
                <p className="mb-2 text-sm text-gray-600">{description}</p>
              </section>
            </article>
          ))}
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(`${process.cwd()}/content/posts`);

  const posts = files.map((filename) => {
    const markdownWithMetadata = fs
      .readFileSync(`content/posts/${filename}`)
      .toString();

    const { data } = matter(markdownWithMetadata);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = data.date.toLocaleDateString('en-US', options);

    const frontmatter = {
      ...data,
      date: formattedDate,
    };

    return {
      slug: filename.replace('.md', ''),
      frontmatter,
    };
  });

  return {
    props: {
      posts,
    },
  };
}
