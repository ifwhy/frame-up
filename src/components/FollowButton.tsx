'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Loader2Icon } from 'lucide-react';
import toast from 'react-hot-toast';
import { hasFollowed, toggleFollow } from '@/utils/user.utils';

function FollowButton({ userId }: { userId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowed, setIsFollowed] = useState<boolean | null>(null);

  // Cek apakah user sudah di-follow atau belum saat komponen dimount
  useEffect(() => {
    const checkFollowStatus = async () => {
      try {
        const result = await hasFollowed(userId);
        setIsFollowed(result);
      } catch (error) {
        console.error('Error checking follow status', error);
      }
    };

    checkFollowStatus();
  }, [userId]);

  const handleFollow = async () => {
    if (isFollowed === null) return; // Jika status belum diketahui, jangan lakukan apa-apa

    setIsLoading(true);

    try {
      await toggleFollow(userId);
      setIsFollowed((prev) => !prev); // Toggle status follow secara lokal
      toast.success(
        isFollowed ? 'Pengguna batal diikuti' : 'Pengguna berhasil diikuti'
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Error updating follow status');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size="sm"
      variant="secondary"
      onClick={handleFollow}
      disabled={isLoading || isFollowed === null} // Disable jika masih loading atau belum tahu statusnya
      className="w-20"
    >
      {isLoading ? (
        <Loader2Icon className="size-4 animate-spin" />
      ) : isFollowed ? (
        'Batal ikuti'
      ) : (
        'Ikuti'
      )}
    </Button>
  );
}

export default FollowButton;
