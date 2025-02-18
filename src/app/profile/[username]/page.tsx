import {
  getProfileByUsername,
  getUserLikedPosts,
  getUserPosts,
  isFollowing,
} from '@/utils/profile.utils';
import React from 'react';
import { notFound } from 'next/navigation';
import ProfilePageClient from './ProfilePageClient';

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}) {
  const { username } = await params;
  const userProfile = await getProfileByUsername(username);

  if (!userProfile) return;

  return {
    title: userProfile.name ?? userProfile.username,
    description: userProfile.bio,
  };
}

const page = async ({ params }: { params: { username: string } }) => {
  const { username } = await params;
  const userProfile = await getProfileByUsername(username);
  if (!userProfile) return notFound();

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
    />
  );
};

export default page;
