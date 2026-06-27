import { getUserInitials } from '../utils/user'

interface UserAvatarProps {
  fullName: string
  size?: 'md' | 'lg'
}

const SIZE_CLASS = {
  md: 'h-16 w-16 text-lg',
  lg: 'h-24 w-24 text-2xl',
} as const

export function UserAvatar({ fullName, size = 'lg' }: UserAvatarProps) {
  const initials = getUserInitials(fullName)

  return (
    <div
      className={`relative shrink-0 rounded-[1.35rem] bg-gradient-to-br from-[#f8ce46] via-[#e18830] to-[#c83c21] p-[3px] shadow-[0_8px_22px_rgba(232,136,48,0.35),0_3px_8px_rgba(0,0,0,0.5)] ${SIZE_CLASS[size]}`}
    >
      <div className="flex h-full w-full items-center justify-center rounded-[1.15rem] bg-fox-dark shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
        <span className="bg-gradient-to-br from-[#f8ce46] via-[#e18830] to-[#c83c21] bg-clip-text font-bold text-transparent">
          {initials}
        </span>
      </div>
    </div>
  )
}