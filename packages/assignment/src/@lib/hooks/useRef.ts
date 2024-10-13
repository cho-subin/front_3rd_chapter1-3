import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  // set을 하지 않기 때문에, 언제나 동일한 state로 존재
  const [ref] = useState<{ current: typeof initialValue }>({
    current: initialValue,
  });
  return ref;
}
