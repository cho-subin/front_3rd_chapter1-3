// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function shallowEquals(objA: any, objB: any): boolean {
  // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (typeof objA === typeof objB && objA === objB) {
    return true;
  }

  // 2. 둘 중 하나라도 객체가 아닌 경우 처리
  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  // 3. 객체의 키 개수가 다른 경우 처리
  const objAKeys = Object.keys(objA);
  const objBKeys = Object.keys(objB);

  if (objAKeys.length !== objBKeys.length) {
    return false;
  }

  // 4. 모든 키에 대해 얕은 비교 수행
  for (const key of objAKeys) {
    if (
      !Object.prototype.hasOwnProperty.call(objB, key) ||
      objA[key] !== objB[key]
    ) {
      return false;
    }
  }

  return true;
}

/** objB.hasOwnProperty(key) => error : Do not access Object.prototype method 'hasOwnProperty' from target object.
 * (대상 개체에서 Object.prototype 메서드 'hasOwnProperty'에 액세스하지 마세요.)
 * 변경 : Object.prototype.hasOwnProperty.call(objB, key)
 * 이유 : call을 사용해서 this에 objB가 명시적으로 bind 되고 즉시실행 하면서 결국엔 objB에
 *       hasOwnProperty를 검사. 더 안전하게 호출하기 위한 방법인데, objB가 hasOwnProperty이름의 속성을
 *       가지고 있을 수 있는 경우 때문.
 */
