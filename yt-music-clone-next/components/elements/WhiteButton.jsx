'use client';
import React from 'react';
import { cn } from '@/lib/utils';

const WhiteButton = ({
  icon = <></>,
  label,
  className = '',
  onClick = () => {},
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'cursor-pointer bg-white text-black hover:bg-neutral-200 rounded-2xl flex flex-row items-center min-w-[80px] h-[36px] p-4 gap-2',
        className
      )}
      {...props}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
};

export default WhiteButton;
