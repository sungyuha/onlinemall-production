import React from 'react';
import { Navigate } from 'react-router-dom';
import {useAuthContext} from '../context/AuthContext';

export default function ProtectedRoute(children, requireAdmin) {
  // 로그인 한 사용자가 있는지 확인
  const { user } = useAuthContext();

  // 만약에 사용자가 없거나 requireAdmin이 필요한데 사용자가 어드민이 아닌 경우
  if (!user || (requireAdmin && !user.isAdmin)) {
    // 조건에 맞지 않으면 / 상위 경로 home으로 이동
    return <Navigate to="/" replace />; // replace는 경로 흔적 캐시, 흔적 남는거 원치 않으므로 true 
  }
  
  // 그 사용자가 어드민 권한이 있는지 확인
  return children;


  // requireAdmin 이 true 인 경우에는 로그인도 되어 있어야 하고, 어드민 권한도 가지고 있음

  // 조건에 맞는 경우에만 전달 된 chilren 컴포넌트를 보여줌
  /*return (
    <div>
      ProtectedRoute
    </div>
  );*/
};