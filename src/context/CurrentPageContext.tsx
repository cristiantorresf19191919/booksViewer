"use client";

import { createContext, useContext, ReactNode } from "react";

const CurrentPageContext = createContext<number>(0);

export function CurrentPageProvider({
  pageIndex,
  children,
}: {
  pageIndex: number;
  children: ReactNode;
}) {
  return (
    <CurrentPageContext.Provider value={pageIndex}>
      {children}
    </CurrentPageContext.Provider>
  );
}

export function useCurrentPage() {
  return useContext(CurrentPageContext);
}
