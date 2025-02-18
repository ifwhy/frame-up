'use client';
import { Github, Instagram } from 'lucide-react';
import Logo from './Logo';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Separator } from './ui/separator';

const Footer = () => {

  const { theme, systemTheme } = useTheme();

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const currentTheme = theme === 'system' ? systemTheme : theme;
    setIsDarkMode(currentTheme === 'dark');
  }, [theme, systemTheme]);

  return (
    <footer className="w-full bg-inherit text-white py-8 px-6 md:px-12 mt-10">
      <Separator className="mb-5 text-black" />
      <div className="max-w-7xl gap-5 sm:gap-0 mx-auto flex flex-col md:flex-row justify-around items-center">
        {/* Logo & Copyright */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Logo />
        </div>

        {/* Social Media */}
        <div className="mt-4 md:mt-0 flex gap-3 items-center">
          <Link
            href="https://github.com/ifwhy"
            target="_blank"
            rel="noopener noreferrer"
            className={`${isDarkMode ? 'text-gray-500 hover:text-gray-300': 'text-gray-700 hover:text-gray-900'} transition-all duration-300`}
          >
            <Github size={28} />
          </Link>
          <Link
            href="https://instagram.com/ifwhy._"
            target="_blank"
            rel="noopener noreferrer"
            className={`${isDarkMode ? 'text-gray-500 hover:text-gray-300': 'text-gray-700 hover:text-gray-900'} transition-all duration-300`}
          >
            <Instagram size={28} />
          </Link>
        </div>

        <div>
          <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400': 'text-gray-900'}`}>
            © {new Date().getFullYear()} FrameUp. <br /> All rights reserved.
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className={`mt-6 text-center text-xs px-2 ${isDarkMode ? 'text-gray-400': 'text-gray-900'}`}>
        <p>Disclaimer: Website ini dibuat hanya untuk keperluan portofolio semata.</p>
        <p>Semua tokoh dalam website ini adalah fiksi. Jika terdapat kesamaan dengan tokoh atau kejadian nyata, hal itu adalah murni ketidaksengajaan.</p>
      </div>
    </footer>
  );
};

export default Footer;
