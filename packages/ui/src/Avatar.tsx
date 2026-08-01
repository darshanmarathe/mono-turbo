import './Avatar.css';

export interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .filter((char): char is string => char !== undefined)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function Avatar({ name, size = 'md' }: AvatarProps) {
  const className = size === 'md' ? 'avatar' : `avatar avatar--${size}`;
  return <span className={className}>{initials(name)}</span>;
}
