import { useQuery } from "@apollo/client";
import Head from "next/head";
import { useRouter } from "next/router";

// Components
import FeedLayout from "../../components/wrapper/FeedLayout";
import Post from "../../components/post/Post";
import Layout from "../../components/wrapper/Layout";
import CommentSection from "../../components/comment/CommentSection";

// GraphQL
import { POST } from "../../graphql/post";
import {
  Post as P,
  PostVariables as PV,
} from "../../graphql/__generated__/Post";

const PostPage = () => {
  const router = useRouter();

  const postId = parseInt(router.query.post as string);

  console.log(postId);

  const { data, loading } = useQuery<P, PV>(POST, {
    variables: { id: postId },
  });

  if (loading) return <Layout>Loading...</Layout>;

  return (
    <Layout>
      <Head>
        <title>Post</title>
      </Head>
      <FeedLayout title="Post">
        <Post post={data.post} />
        <CommentSection postId={postId} />
      </FeedLayout>
    </Layout>
  );
};

export default PostPage;
