type TSidebarProps = {
  children: React.ReactNode;
};

export default function Sidebar({ children }: TSidebarProps) {
  return <div className="sidebar">{children}</div>;
}

export function SidebarTop({ children }: TSidebarProps) {
  return <div className="sidebar__top">{children}</div>;
}
