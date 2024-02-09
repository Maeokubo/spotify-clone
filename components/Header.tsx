import { twMerge } from "tailwind-merge";


interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  children,
  className,
}) => {
  return (
    <div className={twMerge(`h-fit bg-gradient-to-b from-emerald-900 p-6`, className )}>
      Header Header
    </div>
  )
}

export default Header
