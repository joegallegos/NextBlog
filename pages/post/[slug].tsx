import { Button, Spinner } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../../components/Layout';

const { GHOST_CONTENT_API_KEY, BLOG_URL } = process.env;

type Post = {
  title: string;
  html: string;
  slug: string;
  created_at: string;
  updated_at: string;
};

async function getPost(slug: string) {
  const baseUrl = process.env.BLOG_URL;
  const key = process.env.GHOST_CONTENT_API_KEY;

  const res = await fetch(
    baseUrl +
      '/ghost/api/v3/content/posts/slug/' +
      slug +
      '/?key=' +
      key +
      '&fields=title,slug,html,created_at,updated_at',
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
  const [enableLoadComments, setEnableLoadComments] = useState<boolean>(true);
  const router = useRouter();

  function loadComments() {
    setEnableLoadComments(false);
    (window as any).disqus_config = function () {
      this.page.url = window.location.href;
      this.page.identifier = post.slug;
    };

    const script = document.createElement('script');
    script.src = 'https://blog-joegallegos-dev.disqus.com/embed.js';
    script.setAttribute('data-timestamp', Date.now().toString());

    document.body.appendChild(script);
  }

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
      <div className="mb-4">
        <Link href="/">
          <a>
            <Button colorScheme="blue" size="sm" variant="solid">
              ← Back to home
            </Button>
          </a>
        </Link>
        <h1 className="font-bold text-xl text-center">{post.title}</h1>
        <span className="flex justify-center text-xs text-gray-600">
          {post.updated_at !== post.created_at
            ? `Updated on: ${updated}`
            : `Published on: ${created}`}
        </span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />

      <div className="mt-8">
        {enableLoadComments && (
          <Button colorScheme="blue" variant="solid" onClick={loadComments}>
            Load Comments
          </Button>
        )}
        <div className="mt-4" id="disqus_thread"></div>
      </div>
    </Layout>
  );
};

export default Post;
