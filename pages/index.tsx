import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/Layout';

const { NEXT_PUBLIC_GHOST_CONTENT_API_KEY, NEXT_PUBLIC_BLOG_URL } = process.env;

type Post = {
  title: string;
  slug: string;
  published_at: string;
  custom_excerpt: string;
};

async function getPosts() {
  const res = await fetch(
    `${NEXT_PUBLIC_BLOG_URL}/ghost/api/v3/content/posts/?key=${NEXT_PUBLIC_GHOST_CONTENT_API_KEY}&fields=title,slug,published_at,custom_excerpt`,
  ).then((res) => res.json());

  const posts = res.posts;
  return posts;
}

export const getStaticProps = async ({ params }) => {
  const posts = await getPosts();
  return {
    props: { posts },
    revalidate: 60,
  };
};

const Home: React.FC<{ posts: Post[] }> = (props) => {
  const { posts } = props;

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className="flex flex-col text-center mt-8">
        <section className="text-xl leading-6 mb-4">
          <p className="text-lg">
            Hi there, I'm <b>Joe</b>. I'm a front-end developer originally from
            Denver, CO currently living in Dallas, Tx.
          </p>
        </section>
        <ul className="list-none">
          {posts.map((post) => {
            const date = new Date(post.published_at).toLocaleDateString();

            return (
              <li key={post.slug} className="mb-2">
                <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                  <a className="no-underline text-xl text-link font-semibold">
                    {post.title}
                  </a>
                </Link>
                <>
                  <p className="text-xs mb-3 text-gray-700">{date}</p>
                  <p className="truncate">{post.custom_excerpt}</p>
                </>
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
};

export default Home;
