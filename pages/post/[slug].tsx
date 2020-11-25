import { Spinner } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

const { NEXT_PUBLIC_GHOST_CONTENT_API_KEY, NEXT_PUBLIC_BLOG_URL } = process.env;

type Post = {
  title: string;
  html: string;
  slug: string;
  created_at: string;
  updated_at: string;
};

async function getPost(slug: string) {
  const res = await fetch(
    `${NEXT_PUBLIC_BLOG_URL}/ghost/api/v3/content/posts/slug/${slug}?key=${NEXT_PUBLIC_GHOST_CONTENT_API_KEY}&fields=title,slug,html,created_at,updated_at`,
  ).then((res) => res.json());

  const posts = res.posts;
  return posts[0];
}

export const getStaticProps = async ({ params }) => {
  const post = await getPost(params.slug);
  return {
    props: { post },
    revalidate: 60,
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

const Post: React.FC<{ post: Post }> = (props) => {
  const { post } = props;
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Layout>
        <div className="flex justify-center items-center mt-4">
          <Spinner color="blue.500" size="xl" thickness="4px" />
        </div>
      </Layout>
    );
  }

  const created = new Date(post.created_at).toLocaleDateString();
  const updated = new Date(post.updated_at).toLocaleDateString();

  return (
    <Layout>
      <Head>
        <title>Blog - {post.title}</title>
      </Head>
      <div className="mb-4">
        <h1 className="font-bold text-xl text-center">{post.title}</h1>
        <span className="flex justify-center text-xs text-gray-700">
          {post.updated_at !== post.created_at
            ? `Updated on: ${updated}`
            : `Published on: ${created}`}
        </span>
      </div>
      <div className="post-html">{require('html-react-parser')(post.html)}</div>
    </Layout>
  );
};

export default Post;
