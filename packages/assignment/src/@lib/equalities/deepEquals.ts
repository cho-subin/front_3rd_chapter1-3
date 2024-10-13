// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function deepEquals(objA: any, objB: any): boolean {
  // 1. 기본 타입이거나 null인 경우 처리
  if (Object.is(objA, objB)) return true;

  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  // 2. 둘 다 객체인 경우:
  //    - 배열인지 확인
  //    - 객체의 키 개수가 다른 경우 처리 - v
  //    - 재귀적으로 각 속성에 대해 deepEquals 호출

  // objA과 objB가 모두 배열이고, 길이가 같은 경우 각 요소를 비교
  if (
    Array.isArray(objA) &&
    Array.isArray(objB) &&
    objA.length === objB.length
  ) {
    return objA.every((v, i) => deepEquals(v, objB[i]));
  }

  // objA과 objB가 모두 객체이고, 객체 참조 주소가 같고, keys의 갯수가 같을때 재귀적으로 각 속성의 object도 같다면 true
  if (typeof objA === "object" && typeof objB === "object") {
    const objAKeys = Object.keys(objA);
    const objBKeys = Object.keys(objB);

    return (
      objA === objB ||
      (objAKeys.length === objBKeys.length &&
        objAKeys.every((key) => deepEquals(objA[key], objB[key])))
    );
  }

  return false;
}
