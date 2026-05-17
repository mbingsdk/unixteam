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
      <path d="M18.54 7.5a5.75 5.75 0 0 1-3.72-1.64v8.73a5.89 5.89 0 1 1-5.88-5.88c.34 0 .67.03.99.09v3.21a2.74 2.74 0 1 0 1.86 2.59V2h3.1a5.8 5.8 0 0 0 3.65 4.16z" />
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

export function XIcon({ size = 24, width, height, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width={width ?? size}
      height={height ?? size}
      {...props}
    >
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932zm-1.292 19.494h2.039L6.486 3.24H4.298z" />
    </svg>
  );
}

export function YouTubeBrandIcon({ size = 24, width, height, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width={width ?? size}
      height={height ?? size}
      {...props}
    >
      <path d="M23.5 6.2a3.02 3.02 0 0 0-2.13-2.14C19.49 3.55 12 3.55 12 3.55s-7.49 0-9.37.51A3.02 3.02 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.13 2.14c1.88.51 9.37.51 9.37.51s7.49 0 9.37-.51a3.02 3.02 0 0 0 2.13-2.14A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8Z" />
      <path fill="#080808" d="m9.6 15.6 6.23-3.6L9.6 8.4z" />
    </svg>
  );
}

export function TwitchBrandIcon({ size = 24, width, height, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width={width ?? size}
      height={height ?? size}
      {...props}
    >
      <path d="M11.57 4.71h1.72v5.15h-1.72zm4.72 0H18v5.15h-1.71zM6 0 1.71 4.29v15.42h5.15V24l4.28-4.29h3.43L22.29 12V0zm14.57 11.14-3.43 3.43h-3.43l-3 3v-3H6.86V1.71h13.71z" />
    </svg>
  );
}
