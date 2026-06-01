'use client';

import dynamic from 'next/dynamic';

const SignOutButtonFallback = () => (
  <div className="w-full py-3 px-4 rounded-lg bg-zinc-800 animate-pulse" />
);

const DynamicSignOutButton = dynamic(
  () => import('@clerk/nextjs').then((mod) => mod.SignOutButton),
  {
    loading: () => <SignOutButtonFallback />,
    ssr: true,
  }
);

interface DynamicSignOutButtonWrapperProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function DynamicSignOutButtonWrapper({
  children,
  onClick,
  className,
}: DynamicSignOutButtonWrapperProps) {
  return (
    <DynamicSignOutButton>
      <button onClick={onClick} className={className}>
        {children}
      </button>
    </DynamicSignOutButton>
  );
}
