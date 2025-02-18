'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { VelocityScroll } from './magicui/scroll-based-velocity';
import { BackgroundLines } from './ui/background-lines';
import { AnimatedTooltip } from './ui/animated-tooltip';
import { people } from '../../constant';
import { SignInButton } from '@clerk/nextjs';
import { InteractiveHoverButton } from './ui/interactive-hover-button';
import { Testimonials } from './Testimonials';
import { FAQ } from './FAQ';

const LandingPage = () => {
  const { theme, systemTheme } = useTheme();

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const currentTheme = theme === 'system' ? systemTheme : theme;
    setIsDarkMode(currentTheme === 'dark');
  }, [theme, systemTheme]);

  return (
    <div className="w-full">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <BackgroundLines className="flex mt-5 sm:mt-0 items-center justify-center w-full flex-col">
          <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
            FRAME<span className='text-blue-500 underline'>UP</span> <br /> Sambat Sosial, Level Up!
          </h2>
          <div className="flex flex-row items-center justify-center my-5 w-full">
            <AnimatedTooltip items={people} />
          </div>
          <p className="max-w-3xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center px-3 sm:px-5">
          &quot;FrameUp 📸✨ Tempat nongkrong virtual bersama mereka buat ngepost, nge-like, dan nge-stalk tanpa malu 😆👍 Yuk, masuk untuk sambat sosial bareng! 🚀🔥&rdquo;
          </p>
          <SignInButton mode="modal">
            <InteractiveHoverButton className={isDarkMode ? 'h-10 border-2 border-white mt-5' : 'h-10 border-2 border-black mt-5'}>
            Sign In 🚀
            </InteractiveHoverButton>
          </SignInButton>
        </BackgroundLines>
        <VelocityScroll
          defaultVelocity={2.5}
          className='my-10 md:my-0 uppercase text-lg overflow-hidden'
        >
          Frame<span className='text-blue-500 underline'>Up</span>
        </VelocityScroll>

        <div className="flex justify-center flex-wrap w-full flex-row mt-5">
          <div className='md:w-1/2 w-full'>
            <h2 className='text-center font-bold my-5 text-3xl'>Apa Kata Mereka?</h2>
            <Testimonials/>
          </div>
          <div className='md:w-1/2 w-full mt-12 sm:mt-0 px-10'>
            <h2 className='text-center font-bold my-5 text-3xl'>Pertanyaan yang Sering Ditanyakan</h2>
            <div className='mt-10'>
              <FAQ/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;