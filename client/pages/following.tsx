import { useQuery } from "@apollo/client";
import Head from "next/head";

// Components
import Layout from "../components/wrapper/Layout";
import FeedLayout from "../components/wrapper/FeedLayout";
import Post from "../components/post/Post";

// Hooks
import useInfiniteScroll from "../hooks/useInfiniteScroll";

// GraphQL
import { FOLLOWING_POSTS } from "../graphql/post";

// GraphQL Types
import { Me_me } from "../graphql/__generated__/Me";
import {
  FollowingPosts as FP,
  FollowingPostsVariables as FPV,
} from "../graphql/__generated__/FollowingPosts";

// Constants
import { HOME_POSTS_LIMIT } from "../constants/dataLimits";

const Following = ({ auth }: { auth: Me_me | null }) => {
  if (!auth) return null;

  const { loading, data, fetchMore } = useQuery<FP, FPV>(FOLLOWING_POSTS, {
    variables: { limit: HOME_POSTS_LIMIT },
  });

  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreCallback);

  function fetchMoreCallback() {
    if (hasMore) {
      fetchMore({
        variables: {
          cursor: result[result.length - 1].createdAt,
        },
      }).then(() => {
        setIsFetching(false);
      });
    }
  }

  if (loading) {
    return <p>Loading posts...</p>;
  }

  const { result, hasMore } = data.followingPosts;

  if (result.length === 0) {
    return <p>No post yet</p>;
  }

  return (
    <Layout>
      <Head>
        <title>Following</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeedLayout title="Following">
        {result.map((post) => (
          <Post key={post.id} post={post} />
        ))}
        {isFetching && hasMore && <p>Loading...</p>}
      </FeedLayout>
    </Layout>
  );
};

export default Following;
