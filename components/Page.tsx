import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import MetaTags from '@/components/MetaTags';

type Props = {
  title?: string;
  className?: string;
  children: ReactNode;
};

export default function Page({
  title,
  className = '',
  children,
}: Props) {
  return (
    <>
      <MetaTags title={title} />
      <main
        className={twMerge(
          'mx-auto relative',
          'min-h-screen max-w-screen-2xl',
          className
        )}
      >
        {children}
      </main>
    </>
  );
}
