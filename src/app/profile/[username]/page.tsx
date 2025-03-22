import {
  getProfileByUsername,
  getUserLikedPosts,
  getUserPosts,
  isFollowing,
} from '@/utils/profile.utils';
import React from 'react';
import { notFound } from 'next/navigation';
import ProfilePageClient from './ProfilePageClient';
import { currentUser } from '@clerk/nextjs/server';

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}) {
  const userProfile = await getProfileByUsername(params.username);

  if (!userProfile) return null;

  return {
    title: userProfile.name ?? userProfile.username,
    description: userProfile.bio,
  };
}

const Page = async ({ params }: { params: { username: string } }) => {
  const userProfile = await getProfileByUsername(params.username);
  const user = await currentUser();

  if (!userProfile || !user) return notFound();

  const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
    getUserPosts(userProfile.id),
    getUserLikedPosts(userProfile.id),
    isFollowing(userProfile.id),
  ]);

  return (
    <ProfilePageClient
      user={userProfile}
      posts={posts}
      likedPosts={likedPosts}
      isFollowing={isCurrentUserFollowing}
      image={user.imageUrl}
    />
  );
};

export default Page;
