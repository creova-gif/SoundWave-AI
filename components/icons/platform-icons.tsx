interface PlatformIconProps {
  platform: 'tiktok' | 'instagram' | 'youtube' | 'twitter' | 'facebook' | 'spotify'
  size?: number
  className?: string
}

const iconMap: Record<PlatformIconProps['platform'], string> = {
  tiktok: '/icons/tiktok.svg',
  instagram: '/icons/instagram.svg',
  youtube: '/icons/youtube.svg',
  twitter: '/icons/x.svg',
  facebook: '/icons/facebook.svg',
  spotify: '/icons/spotify.svg',
}

export function PlatformIcon({ platform, size = 20, className }: PlatformIconProps) {
  return (
    <img
      src={iconMap[platform]}
      alt={platform}
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size, objectFit: 'contain', display: 'inline-block' }}
    />
  )
}
