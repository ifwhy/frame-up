'use client';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Logo = () => {
  const { theme, systemTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const currentTheme = theme === 'system' ? systemTheme : theme;
    setIsDarkMode(currentTheme === 'dark');
  }, [theme, systemTheme]);

  return (
    <Link href="/" className="group">
      <p
        className={`text-2xl lg:text-3xl font-bold uppercase transition-all duration-300 font-sans ${
          isDarkMode ? 'text-white group-hover:text-blue-400' : 'text-black group-hover:text-blue-600'
        }`}
      >
        Frame
        <span
          className={`underline transition-all duration-300 ${
            isDarkMode ? 'text-blue-500 group-hover:text-white' : 'text-blue-600 group-hover:text-black'
          }`}
        >
          Up
        </span>
      </p>
      <p className={`hidden lg:block text-sm font-sans font-semibold transition-all duration-300 text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>
        Framing Yourself Up
      </p>
    </Link>
  );
};

export default Logo;
