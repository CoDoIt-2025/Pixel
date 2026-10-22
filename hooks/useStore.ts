"use client";

import { useEffect, useState } from "react";
import { useAdminStore } from "@/lib/store";

export function useStore<T>(selector: (state: ReturnType<typeof useAdminStore.getState>) => T): T | undefined {
  const result = useAdminStore(selector);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? result : undefined;
}

export function useIsHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}
