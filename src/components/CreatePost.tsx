'use client';

import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Loader2Icon, SendIcon } from 'lucide-react';
import { Button } from './ui/button';
import toast from 'react-hot-toast';
import { createPost } from '@/utils/post.utils';
import { Separator } from './ui/separator';

function CreatePost() {
  const { user } = useUser();
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim() && !imageUrl) return;

    setIsPosting(true);
    try {
      const result = await createPost(content);
      if (result?.success) {
        // mereset form
        setContent('');
        setImageUrl('');

        toast.success('Post created successfully');
      }
    } catch (error) {
      console.error('Failed to create post:', error);
      toast.error('Failed to create post');
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <Card className="mb-6 mt-5">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.imageUrl || '/avatar.png'} />
            </Avatar>
            <Textarea
              placeholder="Apa yang ada di pikiranmu?"
              className="min-h-[100px] resize-none border-none focus-visible:ring-0 p-2 text-base"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isPosting}
            />
          </div>

          <Separator className="my-4 border border-gray-300" />

          <div className="flex items-center justify-between pt-4">
            <Button
              className="flex items-center"
              onClick={handleSubmit}
              disabled={(!content.trim() && !imageUrl) || isPosting}
            >
              {isPosting ? (
                <>
                  <Loader2Icon className="size-4 mr-2 animate-spin" />
                  Mengunggah...
                </>
              ) : (
                <>
                  <SendIcon className="size-4 mr-2" />
                  Unggah
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
export default CreatePost;
