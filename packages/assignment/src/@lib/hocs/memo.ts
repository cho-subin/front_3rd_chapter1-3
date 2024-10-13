import { shallowEquals } from "../equalities";
import { ComponentType, createElement, useMemo, useRef } from "react";

// memo HOC는 컴포넌트의 props를 얕은 비교하여 불필요한 리렌더링을 방지합니다.
export function memo<P extends object>(
  Component: ComponentType<P>,
  equals = shallowEquals
) {
  return function MemorizedComponent(props: P) {
    // 1. 이전 props를 저장할 ref 생성
    const prevPropsRef = useRef<P | undefined>(undefined);
    // 2. 메모이제이션된 컴포넌트 생성
    const prevComponentRef = useRef<JSX.Element | null>(null);

    // 복잡한 계산의 값을 저장(equals로 비교한 결과를 메모제이션)
    const renderComponent = useMemo(() => {
      // 이미 메모제이션 props 있으면(prev) 새로운 props와 얕은 비교
      if (prevPropsRef.current && prevComponentRef.current) {
        // true라면 (이전 props와 지금의 props가 같다면)
        if (equals(prevPropsRef.current, props)) {
          return prevComponentRef.current; // prev 컴포넌트 재사용.
        }
      }

      // 메모제이션 된게 없으면 (초기 상태) 뒤에 메모제이션을 위해 ref 객체에 React.createElemnet로 만든
      // js 객체로 된 react element 추가
      const newComponent = createElement(Component, props);
      prevPropsRef.current = props;
      prevComponentRef.current = newComponent;

      // React.createElemnet로 만든 js 객체로 된 react element return
      return newComponent;
    }, [props]);

    return renderComponent;
  };
}
