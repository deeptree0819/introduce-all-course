## 라우팅 제어 훅 모음

**파일명**: `app/libs/auth.ts`

이 파일은 사용자의 인증 상태에 따라 다양한 라우트 리다이렉션 로직을 제공하는 훅들의 모음입니다. 이 훅들은 Next.js에서 제공하는 쿠키 관리 메소드와 `redirect` 메소드를 활용하여 작동합니다.

---

### 1. `useOnlyAdminPublicRoute`

**Default Redirect URL**: `/admin/users`

이 훅은 관리자만 접근할 수 있는 public 라우트를 제어합니다.

```tsx
export const useOnlyAdminPublicRoute = (redirectUrl = "/admin/users") => {
  const cookiesList = cookies();
  const hasCookie = cookiesList.has("adminToken");
  if (hasCookie) {
    redirect(redirectUrl);
  }
};
```

#### 동작:

- 페이지나 컴포넌트가 로드될 때 `adminToken` 쿠키의 존재 여부를 확인합니다.
- `adminToken`이 존재할 경우, 주어진 `redirectUrl`(기본값은 `/admin/users`)로 리다이렉트합니다.

---

### 2. `useOnlyAdminRoute`

**Default Redirect URL**: `/admin/login`

이 훅은 관리자만 접근할 수 있는 라우트를 제어합니다.

```tsx
export const useOnlyAdminRoute = (redirectUrl = "/admin/login") => {
  const cookiesList = cookies();
  const hasCookie = cookiesList.has("adminToken");
  if (!hasCookie) {
    redirect(redirectUrl);
  }
};
```

#### 동작:

- 페이지나 컴포넌트가 로드될 때 `adminToken` 쿠키의 존재 여부를 확인합니다.
- `adminToken`이 존재하지 않을 경우, 주어진 `redirectUrl`(기본값은 `/admin/login`)로 리다이렉트합니다.

---

### 3. `useOnlyPublicRoute`

**Default Redirect URL**: `/home`

이 훅은 일반 사용자만 접근할 수 있는 public 라우트를 제어합니다.

```tsx
export const useOnlyPublicRoute = (redirectUrl = "/home") => {
  const cookiesList = cookies();
  const hasCookie = cookiesList.has("token");
  if (hasCookie) {
    redirect(redirectUrl);
  }
};
```

#### 동작:

- 페이지나 컴포넌트가 로드될 때 `token` 쿠키의 존재 여부를 확인합니다.
- `token`이 존재할 경우, 주어진 `redirectUrl`(기본값은 `/home`)로 리다이렉트합니다.

---

### 4. `useOnlyUserRoute`

**Default Redirect URL**: `/login`

이 훅은 인증된 사용자만 접근할 수 있는 라우트를 제어합니다.

```tsx
export const useOnlyUserRoute = (redirectUrl = "/login") => {
  const cookiesList = cookies();
  const hasCookie = cookiesList.has("token");
  if (!hasCookie) {
    redirect(redirectUrl);
  }
};
```

#### 동작:

- 페이지나 컴포넌트가 로드될 때 `token` 쿠키의 존재 여부를 확인합니다.
- `token`이 존재하지 않을 경우, 주어진 `redirectUrl`(기본값은 `/login`)로 리다이렉트합니다.

---

각 훅은 해당 기능에 맞는 리다이렉션 로직을 제공하므로, 필요한 페이지나 컴포넌트에서 적절한 훅을 사용하여 접근 제어를 구현할 수 있습니다.
