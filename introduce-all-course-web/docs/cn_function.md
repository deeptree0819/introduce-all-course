## CN함수

위치: `app/utils/common.ts`

해당 함수 `cn`은 두 개의 유명한 라이브러리를 활용하여 스타일 클래스 문자열을 생성하고 병합하는 역할을 합니다: `clsx`와 `tailwind-merge`.

1. **clsx**: 클래스 이름을 동적으로 생성하고 결합하는 유용한 라이브러리입니다. 여러 입력을 받아 하나의 문자열로 조합합니다. 조건부로 클래스 이름을 추가하는 데 유용합니다.

2. **tailwind-merge**: Tailwind CSS 클래스를 병합하는 라이브러리입니다. 동일한 유틸리티 타입의 두 클래스가 있을 때 마지막 클래스가 이전 클래스를 오버라이드합니다.

`cn` 함수는 두 라이브러리의 기능을 조합하여, 입력받은 클래스 값을 동적으로 병합하고 Tailwind CSS 클래스를 최적화하여 문자열로 반환합니다.

### 예시:

1. clsx의 동작:

```javascript
const isActive = true;
clsx("bg-white", isActive && "text-black"); // 'bg-white text-black'
```

2. tailwind-merge의 동작:

```javascript
twMerge("bg-red-500 bg-green-500"); // 'bg-green-500' (뒤에 오는 bg-green-500가 bg-red-500을 오버라이드)
```

3. `cn` 함수의 동작:

```javascript
const isActive = true;
cn("bg-white", isActive && "text-black", "p-4 p-2"); // 'bg-white text-black p-2'
```

이 경우, `cn` 함수는 먼저 `clsx`를 사용하여 'bg-white text-black' 문자열을 생성하고, 그 다음 `tailwind-merge`로 'bg-white text-black p-2'로 병합합니다. 'p-4'와 'p-2'는 동일한 패딩 유틸리티이기 때문에 'p-2'가 'p-4'를 오버라이드 합니다.

이 함수를 사용하면 여러 조건부 클래스와 함께 Tailwind CSS 클래스를 효과적으로 관리할 수 있습니다.
