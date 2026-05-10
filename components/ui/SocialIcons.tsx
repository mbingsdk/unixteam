import { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number | string };

export function RobloxIcon({ size = 24, width, height, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width={width ?? size}
      height={height ?? size}
      {...props}
    >
      <path d="M4.547 0L0 19.453 19.453 24 24 4.547zm10.638 14.41l-5.89-1.498 1.499-5.89 5.89 1.498z" />
    </svg>
  );
}

export function InstagramIcon({ size = 24, width, height, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={width ?? size}
      height={height ?? size}
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon({ size = 24, width, height, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width={width ?? size}
      height={height ?? size}
      {...props}
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
    </svg>
  );
}

export function DiscordIcon({ size = 24, width, height, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 127.14 96.36"
      fill="currentColor"
      width={width ?? size}
      height={height ?? size}
      {...props}
    >
      <path d="M107.7 8.07A105.15 105.15 0 0 0 81.47 0a72.06 72.06 0 0 0-3.36 6.83 97.68 97.68 0 0 0-29.11 0A72.37 72.37 0 0 0 45.64 0 105.89 105.89 0 0 0 19.39 8.09C2.79 32.65-1.7 56.6.54 80.21a105.73 105.73 0 0 0 32.17 16.15 77.7 77.7 0 0 0 6.89-11.31 68.42 68.42 0 0 1-10.84-5.18c.91-.66 1.8-1.34 2.66-2.04a75.35 75.35 0 0 0 64.32 0c.87.71 1.76 1.39 2.66 2.04a68.68 68.68 0 0 1-10.85 5.19 77 77 0 0 0 6.89 11.3 105.25 105.25 0 0 0 32.19-16.14c2.63-27.38-4.49-51.12-18.93-72.15ZM42.45 65.69C36.18 65.69 31 59.98 31 52.95s5-12.74 11.43-12.74c6.48 0 11.57 5.76 11.46 12.74 0 7.03-5.03 12.74-11.44 12.74Zm42.24 0c-6.27 0-11.43-5.71-11.43-12.74s5-12.74 11.43-12.74c6.48 0 11.57 5.76 11.46 12.74 0 7.03-5.02 12.74-11.46 12.74Z" />
    </svg>
  );
}
