type TContainerProps = {
  children: React.ReactNode;
};

export default function Container({ children }: TContainerProps) {
  return <div className="container">{children}</div>;
}
