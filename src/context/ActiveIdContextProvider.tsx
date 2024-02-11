import { createContext, useEffect, useState } from "react";

type TActiveIdContext = {
  activeId: number | null;
};

export const ActiveIdContext = createContext<TActiveIdContext | null>(null);

type TActiveIdContextProvider = {
  children: React.ReactNode;
};

export default function ActiveIdContextProvider({
  children,
}: TActiveIdContextProvider) {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1);
      setActiveId(id);
    };
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <ActiveIdContext.Provider value={{ activeId }}>
      {children}
    </ActiveIdContext.Provider>
  );
}
