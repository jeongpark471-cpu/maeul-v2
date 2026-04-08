interface AvatarProps {
  src: string | null | undefined
  name: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-lg',
}

export default function Avatar({ src, name, size = 'md' }: AvatarProps) {
  const initials = name.slice(0, 2)

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${sizeMap[size]} rounded-full object-cover`}
      />
    )
  }

  return (
    <div
      className={`${sizeMap[size]} flex items-center justify-center rounded-full bg-orange-100 font-semibold text-orange-600`}
    >
      {initials}
    </div>
  )
}
