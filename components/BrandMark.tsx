'use client';

import Image from 'next/image';

type Props = {
  size?: 'sm' | 'md' | 'lg' | 'hub';
  className?: string;
  priority?: boolean;
};

const sizes = {
  sm: 'h-10 w-10',
  md: 'h-14 w-14',
  lg: 'h-20 w-20',
  hub: 'h-20 w-20 sm:h-28 sm:w-28 lg:h-36 lg:w-36',
};

export default function BrandMark({ size='md', className='', priority=false }: Props) {
  return (
    <div className={`unix-brand-mark ${sizes[size]} ${className}`}>
      <div className="relative h-[72%] w-[72%]">
        <Image
          src="/apple-icon.png"
          alt="UNIX-TEAM"
          fill
          sizes={size === 'hub' ? '144px' : '80px'}
          className="object-contain"
          priority={priority}
        />
      </div>
    </div>
  );
}
