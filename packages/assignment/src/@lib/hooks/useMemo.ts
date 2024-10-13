import { DependencyList, useRef } from "react";
import { shallowEquals } from "../equalities";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useMemo<T>(
  factory: () => T,
  deps: DependencyList,
  equals = shallowEquals
): T {
  // 이전 의존성과 결과를 저장할 ref 생성
  const cachedResultRef = useRef<T | null>(null); // 재사용할 계산의(함수) 값
  const cachedDepsRef = useRef<DependencyList | null>(null); // 의존성 배열

  // 현재 의존성 배열과 이전 의존성 배열 비교
  // 의존성 배열이 비어있거나, 이전 의존성 배열와 현재의 의존성 배열의 얕은 비교가 false라면 (의존성 업데이트)
  if (cachedDepsRef.current === null || !equals(cachedDepsRef.current, deps)) {
    cachedResultRef.current = factory(); // 함수를 재 실행해서 그 값을 ref에 업데이트 한다.
    cachedDepsRef.current = deps; // 의존성 배열도 ref에 업데이트 한다.
  }

  // 1. 처음 useMemo가 실행되거나, 의존성 배열이 업데이트 되는 위의 조건이 충족하면 ref에 해당 함수 재실행한 값 업데이트 해서 반환.
  // 2. 의존성 배열이 업데이트 되지 않았다면 ref에 저장되어 있는 이전 계산의 값 재활용해서 반환.
  return cachedResultRef.current as T;
}
