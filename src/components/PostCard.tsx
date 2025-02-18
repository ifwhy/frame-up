'use client';

import {
  createComment,
  deletePost,
  getAllPosts,
  toggleLike,
} from '@/utils/post.utils';
import { SignInButton, useUser } from '@clerk/nextjs';
import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import Link from 'next/link';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Button } from './ui/button';
import {
  HeartIcon,
  LogInIcon,
  MessageCircleIcon,
  SendIcon,
} from 'lucide-react';
import { Textarea } from './ui/textarea';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { DeleteAlertDialog } from './DeleteAlertDialog';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/id';

type Posts = Awaited<ReturnType<typeof getAllPosts>>;
type Post = Posts[number];

const PostCard = ({
  post,
  dbUserId,
}: {
  post: Post;
  dbUserId: string | null;
}) => {
  const { user } = useUser();
  const [newComment, setNewComment] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasLiked, setHasLiked] = useState(
    post.likes.some((like) => like.userId === dbUserId)
  );
  const [optimisticLikes, setOptmisticLikes] = useState(post._count.likes);
  const [showComments, setShowComments] = useState(false);

  const handleLike = async () => {
    if (isLiking) return;
    try {
      setIsLiking(true);
      setHasLiked((prev) => !prev);
      setOptmisticLikes((prev) => (hasLiked ? prev - 1 : prev + 1));
      await toggleLike(post.id);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setOptmisticLikes(post._count.likes);
      setHasLiked(post.likes.some((like) => like.userId === dbUserId));
      toast.error('Failed to like post');
    } finally {
      setIsLiking(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || isCommenting) return;
    try {
      setIsCommenting(true);
      const result = await createComment(post.id, newComment);
      if (result?.success) {
        setNewComment('');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error('Failed to add comment: ', error);
    } finally {
      setIsCommenting(false);
    }
  };

  const handleDeletePost = async () => {
    if (isDeleting) return;

    try {
      setIsDeleting(true);
      const result = await deletePost(post.id);
      if (result?.success) {
        toast.success('Post deleted');
      } else {
        toast.error('Failed to delete post');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error('Failed to delete post: ', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDistanceToNow = (date: Date) => {
    dayjs().format();
    dayjs.extend(relativeTime);
    return dayjs(date).locale('id').fromNow();
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4">
          <div className="flex space-x-3 sm:space-x-4">
            <Link href={`/profile/${post.author.username}`}>
              <Avatar className="size-8 sm:w-10 sm:h-10">
                <AvatarImage
                  src={post.author.image ?? '/avatar.png'}
                  className="size-11 rounded-full object-center"
                />
              </Avatar>
            </Link>

            {/* POST HEADER & TEXT CONTENT */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-2 truncate">
                  <div className="flex flex-col text-sm justify-center">
                    <Link
                      href={`/profile/${post.author.username}`}
                      className="font-semibold text-base truncate"
                    >
                      {post.author.name}
                    </Link>
                    <Link
                      className="text-muted-foreground"
                      href={`/profile/${post.author.username}`}
                    >
                      @{post.author.username}
                    </Link>
                  </div>
                </div>
                {/* Check if current user is the post author */}
                {dbUserId === post.author.id && (
                  <DeleteAlertDialog
                    isDeleting={isDeleting}
                    onDelete={handleDeletePost}
                  />
                )}
              </div>
              <p className="mt-2 text-sm text-foreground break-words">
                {post.content}
              </p>
            </div>
          </div>

          {/* POST IMAGE */}
          {post.image && (
            <div className="rounded-lg overflow-hidden">
              <Image
                src={post.image}
                alt="Post content"
                className="w-full max-w-8 h-auto object-cover"
              />
            </div>
          )}

          {/* LIKE & COMMENT BUTTONS */}
          <div className="flex items-center pt-2 space-x-4">
            {user ? (
              <Button
                variant="ghost"
                size="sm"
                className={`text-muted-foreground gap-2 ${
                  hasLiked
                    ? 'text-red-500 hover:text-red-600'
                    : 'hover:text-red-500'
                }`}
                onClick={handleLike}
              >
                {hasLiked ? (
                  <HeartIcon className="size-5 fill-current" />
                ) : (
                  <HeartIcon className="size-5" />
                )}
                <span>{optimisticLikes}</span>
              </Button>
            ) : (
              <SignInButton mode="modal">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground gap-2"
                >
                  <HeartIcon className="size-5" />
                  <span>{optimisticLikes}</span>
                </Button>
              </SignInButton>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground gap-2 hover:text-blue-500"
              onClick={() => setShowComments((prev) => !prev)}
            >
              <MessageCircleIcon
                className={`size-5 ${showComments ? 'fill-blue-500 text-blue-500' : ''}`}
              />
              <span>{post.comments.length}</span>
            </Button>

            <div className="flex items-center space-x-2 w-full mx-auto text-sm text-right text-muted-foreground">
              <span>Diunggah {formatDistanceToNow(post.createdAt)}</span>
            </div>
          </div>

          {/* COMMENTS SECTION */}
          {showComments && (
            <div className="space-y-4 pt-4 border-t">
              <div className="space-y-4">
                {/* DISPLAY COMMENTS */}
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3">
                    <Avatar className="size-8 flex-shrink-0">
                      <AvatarImage
                        src={comment.author.image ?? '/avatar.png'}
                      />
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="font-medium text-sm">
                          {comment.author.name}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          @{comment.author.username}
                        </span>
                        <span className="text-sm text-muted-foreground">·</span>
                        <span className="text-sm text-muted-foreground">
                          {formatDistanceToNow(comment.createdAt)} ago
                        </span>
                      </div>
                      <p className="text-sm break-words">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {user ? (
                <div className="flex space-x-3">
                  <Avatar className="size-8 flex-shrink-0">
                    <AvatarImage src={user?.imageUrl || '/avatar.png'} />
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Write a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-[80px] resize-none"
                    />
                    <div className="flex justify-end mt-2">
                      <Button
                        size="sm"
                        onClick={handleAddComment}
                        className="flex items-center gap-2"
                        disabled={!newComment.trim() || isCommenting}
                      >
                        {isCommenting ? (
                          'Posting...'
                        ) : (
                          <>
                            <SendIcon className="size-4" />
                            Komentar
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center p-4 border rounded-lg bg-muted/50">
                  <SignInButton mode="modal">
                    <Button variant="outline" className="gap-2">
                      <LogInIcon className="size-4" />
                      Masuk untuk berkomentar
                    </Button>
                  </SignInButton>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
