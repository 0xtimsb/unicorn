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
import {
  FollowingPosts as FP,
  FollowingPostsVariables as FPV,
} from "../graphql/__generated__/FollowingPosts";

// Constants
import { HOME_POSTS_LIMIT } from "../constants/dataLimits";

// Context
import { useAuth } from "../store/AuthContext";

// Components
import Sidebar from "../components/Sidebar";
import ContentWrapper from "../components/ContentWrapper";

const Home = () => {
  const { auth } = useAuth();

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

  if (!auth) return <p>Nope</p>;

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
        <title>Home</title>
      </Head>
      <div className="flex-1 flex flex-col space-y-4 max-w-lg">
        {result.map((post) => (
          <Post key={post.id} post={post} />
        ))}
        {isFetching && hasMore && <p>Loading...</p>}
      </div>
      <div className="flex flex-col w-72">
        <div className="border bg-white rounded">New tab</div>
      </div>
    </Layout>
  );
};

export default Home;
