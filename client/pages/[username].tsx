import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import Head from "next/head";
import { useRouter } from "next/router";

// Components
import Layout from "../components/wrapper/Layout";
import FeedLayout from "../components/wrapper/FeedLayout";
import Post from "../components/post/Post";
import Button from "../components/Button";

// Hooks
import useInfiniteScroll from "../hooks/useInfiniteScroll";

// GraphQL
import { USER_POSTS } from "../graphql/post";
import { USER } from "../graphql/user";
import { FOLLOW, UNFOLLOW } from "../graphql/follow";

// GraphQL Types
import { Me_me } from "../graphql/__generated__/Me";
import {
  UserPosts as UP,
  UserPostsVariables as UPV,
} from "../graphql/__generated__/UserPosts";
import { User, UserVariables } from "../graphql/__generated__/User";

// Constants
import { USERNAME_POSTS_LIMIT } from "../constants/dataLimits";

const Username = ({ auth }: { auth: Me_me | null }) => {
  if (!auth) return null;

  const client = useApolloClient();

  const router = useRouter();
  const username = router.query.username as string;

  const { loading: userLoading, data: userData } = useQuery<
    User,
    UserVariables
  >(USER, { variables: { username } });

  const { loading, data, fetchMore } = useQuery<UP, UPV>(USER_POSTS, {
    variables: { username, limit: USERNAME_POSTS_LIMIT },
  });

  const [follow] = useMutation(FOLLOW);
  const [unfollow] = useMutation(UNFOLLOW);

  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreCallback);

  if (loading) {
    return <p>Loading posts...</p>;
  }

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

  const handleFollowUnfollow = () => {
    if (userData.user.followed) {
      unfollow({ variables: { id: userData.user.id } });
    } else {
      follow({ variables: { id: userData.user.id } });
    }
    // Updating cache
    client.writeFragment({
      id: "User:" + userData.user.id,
      fragment: gql`
        fragment MyUser on User {
          followed
        }
      `,
      data: {
        followed: !userData.user.followed,
      },
    });
  };

  const { result, hasMore } = data.userPosts;

  if (result.length === 0) {
    return <p>No post yet</p>;
  }

  if (!userData) {
    return <p>User loading...</p>;
  }

  return (
    <Layout>
      <Head>
        <title>{username}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeedLayout title={username}>
        <div className="flex items-center py-10 space-x-4">
          <div className="text-4xl font-bold">{username}</div>
          {userData.user.username !== auth.username && (
            <Button active={true} onClick={handleFollowUnfollow}>
              {userData.user.followed ? "Unfollow" : "Follow"}
            </Button>
          )}
        </div>
        {result.map((post) => (
          <Post key={post.id} post={post} />
        ))}
        {isFetching && hasMore && <p>Loading...</p>}
      </FeedLayout>
    </Layout>
  );
};

export default Username;
