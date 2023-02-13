import React from 'react';

export default function ProtectedRoute(chilren, requireAdmin) {
  // 로그인 한 사용자가 있는지 확인
  // const { user } = useAuthContext();
  // 그 사용자가 어드민 권한이 있는지 확인

  // requireAdmin 이 true 인 경우에는 로그인도 되어 있어야 하고, 어드민 권한도 가지고 있음

  // 조건에 맞지 않으면 / 상위 경로로 이동

  // 조건에 맞는 경우에만 전달 된 chilren 컴포넌트를 보여줌
  return (
    <div>
      ProtectedRoute
    </div>
  );
}