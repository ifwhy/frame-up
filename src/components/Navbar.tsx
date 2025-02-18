import { currentUser } from '@clerk/nextjs/server';
import { syncUser } from '@/utils/user.utils';
import Logo from './Logo';
import DesktopNavbar from './DekstopNavbar';
import MobileNavbar from './MobileNavbar';

async function Navbar() {
  const user = await currentUser();
  if (user) await syncUser(); // POST

  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Logo />
          </div>

          <DesktopNavbar />
          <MobileNavbar />
        </div>
      </div>
    </nav>
  );
}
export default Navbar;