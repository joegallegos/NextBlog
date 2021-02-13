import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/Layout';

const { NEXT_PUBLIC_GHOST_CONTENT_API_KEY, NEXT_PUBLIC_BLOG_URL } = process.env;

type Post = {
  title: string;
  slug: string;
  published_at: string;
  custom_excerpt: string;
  feature_image: string;
};

async function getPosts() {
  const res = await fetch(
    `${NEXT_PUBLIC_BLOG_URL}/ghost/api/v3/content/posts/?key=${NEXT_PUBLIC_GHOST_CONTENT_API_KEY}&fields=title,slug,published_at,custom_excerpt,feature_image`,
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
        <ul className="flex flex-col list-none items-center">
          {posts.map((post) => {
            const date = new Date(post.published_at).toLocaleDateString();

            return (
              <li key={post.slug} className="mb-2 cursor-pointer">
                <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                  <div className="rounded border-gray-700 border-2 overflow-hidden shadow-xl text-center">
                    <img
                      className="w-full cursor-pointer"
                      src={
                        post.feature_image
                          ? post.feature_image
                          : '/images/default.jpg'
                      }
                      alt={post.title}
                    />
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">{post.title}</div>
                      <p className="text-xs mb-3 text-gray-700">{date}</p>
                      <p className="text-gray-800 text-base">
                        {post.custom_excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
};

export default Home;
