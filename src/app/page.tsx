import CreatePost from '@/components/CreatePost';
import Hero from '@/components/LandingPage';
import PostCard from '@/components/PostCard';
import WhoToFollow from '@/components/WhoToFollow';
import { getAllPosts } from '@/utils/post.utils';
import { getDbUserId } from '@/utils/user.utils';
import { currentUser } from '@clerk/nextjs/server';
import toast from 'react-hot-toast';

export default async function Home() {
  const user = await currentUser();
  const posts = await getAllPosts();
  const dbUserId = await getDbUserId();

  if (!posts) {
    toast.error('Failed to get posts');
    return null;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="col-span-1 lg:col-span-8">
        {user ? (
          <div>
            <CreatePost />
            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} dbUserId={dbUserId} />
              ))}
            </div>
          </div>
        ) : (
          <Hero />
        )}
      </div>

      {user ? (
        <div className="hidden lg:block lg:col-span-4 w-full mt-5">
          <WhoToFollow />
        </div>
      ) : null}
    </div>
  );
}
