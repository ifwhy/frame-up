import { currentUser } from '@clerk/nextjs/server';
import { Card, CardContent } from './ui/card';
import { getUserByClerkId } from '@/utils/user.utils';
import { Avatar, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { LinkIcon, MapPinIcon } from 'lucide-react';
import Link from 'next/link';

async function Sidebar() {
  const authUser = await currentUser();
  if (!authUser) return null;

  const user = await getUserByClerkId(authUser.id);
  if (!user) return null;

  return (
    <div className="sticky top-[5.3rem]">
      <Card className="shadow-lg mt-5">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <Link
              href={`/profile/${user.username}`}
              className="flex flex-col items-center justify-center"
            >
              <Avatar className="w-20 h-20 border-2 ">
                <AvatarImage src={authUser.imageUrl || '/avatar.png'} />
              </Avatar>

              <div className="mt-4 space-y-1 flex flex-col items-center justify-center">
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm p-[1px] bg-blue-100 rounded-full text-black w-min px-3 font-semibold text-center hover:bg-blue-200 transition-all duration-300">
                  {user.username}
                </p>
              </div>
            </Link>

            {user.bio && (
              <p className="mt-3 text-sm text-muted-foreground">{user.bio}</p>
            )}

            <div className="w-full">
              <Separator className="my-4" />
              <div className="flex justify-evenly">
                <div>
                  <p className="font-medium">{user._count.following}</p>
                  <p className="text-xs text-muted-foreground">Following</p>
                </div>
                <Separator orientation="vertical" />
                <div>
                  <p className="font-medium">{user._count.followers}</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
              </div>
              <Separator className="my-4" />
            </div>

            <div className="w-full flex flex-col gap-3 items-start text-sm">
              <div className="flex items-center text-muted-foreground">
                <MapPinIcon className="w-4 h-4 mr-2" />
                {user.location || 'No location'}
              </div>
              <div className="flex items-center text-muted-foreground">
                <LinkIcon className="w-4 h-4 mr-2 shrink-0" />
                {user.website ? (
                  <a
                    href={`${user.website}`}
                    className="hover:underline truncate"
                    target="_blank"
                  >
                    {user.website}
                  </a>
                ) : (
                  'No website'
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Sidebar;
