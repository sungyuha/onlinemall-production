import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { BsFillPencilFill } from 'react-icons/bs';
// import { login,logout, } from '../api/firebase';
import User from './User';
import Button from './UI/Button';
import { useAuthContext } from '../context/AuthContext';

export default function Navbar() {
  // 데이터를 가지고 옴
  const {user, login, logout} = useAuthContext();

  return (
    // className 는 tailwindcss 로 작성
    <header className='flex justify-between border-b border-gary-300 p-4'>
      <Link to='/' className='flex items-conter text-4xl text-brand'>
        <FiShoppingBag />
        <h1>Shoppy</h1>
      </Link>
      <nav className='flex items-center gap-4 font-semiblod'>
        <Link to='/products'>Products</Link>
        {/* 사용자가 있으면(=로그인 했을 때) 쇼핑카트 생성 */}
        {user && <Link to='/carts'>Carts</Link> }
        {/* 어드민 사용자이면 편집 아이콘 보여지기 */}
        {user && user.isAdmin && (
          <Link to='/products/new' className='text-2xl'>
          <BsFillPencilFill />
        </Link>
        )}
        {/* 사용자가 있다면 유저의 객체 정보를 전달 */}
        {user && <User user={user} />}

        {/* 로그인 버튼이 클릭되면 */}
        {/* 사용자가 없다면 로그인 버튼을 보여주고 */}
        {/* {!user && <button onClick={login}>Login</button>} UI 컴포넌트 분리 전 */}
        {!user && <Button text={'Login'} onClick={login}/>}
        {/* 사용자가 있다면 로그아웃 버튼 보여줌 */}
        {/* {user && <button onClick={logout}>Logout</button>} UI 컴포넌트 분리 전 */}
        {user && <Button text={'Logout'} onClick={logout}/>}
      </nav>
    </header>
  );
}
