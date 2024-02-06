type THeaderProps = {
  children: React.ReactNode;
};

export default function Header({ children }: THeaderProps) {
  return <header className="header">{children}</header>;
}

export function HeaderTop({ children }: THeaderProps) {
  return <div className="header__top">{children}</div>;
}
