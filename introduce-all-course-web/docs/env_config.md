## README.md 내용 추가

---

### 설정 관리: `app/config.ts`

`app` 디렉토리에 위치한 `config.ts` 파일은 애플리케이션의 환경별 구성 값을 관리하는 중앙화된 장소입니다. 이 파일은 애플리케이션 빌드와 런타임 단계에서 제공되는 환경 변수를 활용하여 구조적이고 일관된 방식으로 올바른 값을 액세스할 수 있게 해줍니다.

#### **1. `CLIENT_ENVS` 딕셔너리**

```typescript
const CLIENT_ENVS: { [key: string]: string | undefined } = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_ROBOT_SERIAL: process.env.NEXT_PUBLIC_ROBOT_SERIAL,
};
```

- 클라이언트 측 사용을 위한 환경 변수의 매핑을 보유한 딕셔너리입니다. 이는 Next.js 프레임워크의 규칙에 따라 클라이언트 측 JavaScript 번들에 포함되도록 `NEXT_PUBLIC_` 접두사가 붙어 있습니다.

#### **2. `getEnvironmentVariable` 함수**

```typescript
const getEnvironmentVariable = (environmentVariable: string): string => {
  ...
};
```

- 지정된 환경 변수의 값을 가져오기 위해 설계된 유틸리티 함수입니다.
- 먼저 `process.env`에서 값을 가져오려고 시도하고, 그곳에서 찾을 수 없으면 `CLIENT_ENVS` 딕셔너리를 조회합니다.
- 지정된 환경 변수가 두 위치 모두에 없으면 함수는 오류를 발생시키며, 중요한 구성 값의 부재를 알립니다.

#### **3. `config` 객체**

```typescript
const config = {
  apiUrl: getEnvironmentVariable("NEXT_PUBLIC_API_URL"),
  adminApiUrl: getEnvironmentVariable("NEXT_PUBLIC_ADMIN_API_URL"),
};
```

- 애플리케이션이 필요로하는 핵심 구성 값을 구조화하고 노출하기 위해 `getEnvironmentVariable` 함수를 사용하는 구성 객체입니다.
- `apiUrl`: 애플리케이션에서 사용하는 주 API 엔드포인트입니다.
- `adminApiUrl`: 관리자 전용 API 엔드포인트입니다.

---

`config` 객체를 사용할 때, 개발자들은 이러한 키를 자신 있게 참조하고 환경별 값들을 얻고 있다는 것을 확신할 수 있습니다. 이 시스템은 또한 애플리케이션이 시작되기 전에 모든 필요한 환경 변수가 존재하는지 확인하는 메커니즘을 제공하여, 잘못된 구성으로 인한 런타임 오류를 줄입니다.

애플리케이션을 배포하거나 시작하기 전에 모든 필요한 환경 변수를 설정해야 하므로 시작 오류를 피하십시오.
