import { DependencyList } from "react";
import { useMemo } from "./useMemo";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any
export function useCallback<T extends (...args: any[]) => any>(
  factory: T,
  deps: DependencyList
): T {
  // useMemo에 함수와 deps를 인자로 넣어서 호출함.
  const cachedFunc = useMemo(() => factory, deps);

  // 결과값 반환. (useMemo의 cachedResultRef.current)
  return cachedFunc;
}

/** 내가 헷갈린 부분:
 * useCallback 함수에서 useMemo를 호출할때 함수인 factory를 인자로 보냄.
 * 근데 내가 만든 useMemo 안에서는 함수를 실행해서 계산 값을 저장하는거 아니었나?
 * 근데 어떻게 useMemo를 사용해서 useCallback에선 factory 계산 값이 아닌
 * factory 함수 자체를 재활용 할수있는거지?
 *
 * useMemo 훅 사용에만 너무 익숙했다.. 앞에 ()=>를 보고도 그냥 지나감..ㅎㅎ
 * useMemo에 넘기는건 factory 함수만 넘기는게 아니라 풀어쓰면
 *
 * useMemo(function() {
 *    return factory;
 * }, deps);
 *
 * 그렇기 때문에 useMemo에서 cachedResultRef.current = factory();
 * 하면 결과값인 factory 함수가 그대로 남기 때문에 함수 자체가
 * useMemo의 cachedResultRef.current에 저장됨.
 * */
