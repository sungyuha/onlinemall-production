import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { BsFillPencilFill } from 'react-icons/bs';
import { login,logout,onUserStateChange } from '../api/firebase';
import User from './User';
import Button from './UI/Button';

export default function Navbar() {
  // 처음에는 사용자가 없으므로 아무것도 설정하지 않음 -> useState();
  const [user, setUser] = useState();

  useEffect(() => {
    // // firebase에 있는 콜백함수 호출
    // // 로그안한 사용자의 세션이 남아있으면 정상적인 유저의 객체가 전달 됨
    // onUserStateChange((user) => {
    //   // user의 정보를 전달 받음
    //   console.log(user);
    //   // 유저의 객체가 남아있으면 우리의 컴포넌트에 상태를 업데이트
    //   setUser(user);
    //   // 로그아웃 하면 사용자 정보가 없어서 null 값이 전달 됨
    // })

    // 인자가 동일해서 참조값만 전달
    onUserStateChange(user => {
      console.log(user);
      setUser(user);
    });
  }, []);

  // const handleLogin = () => {
  //   // firebase에 있는 로그인 함수 호출
  //   login();
  // };

  // const handleLogout = () => {
  //   // firebase에 있는 로그아웃 함수 호출
  //   logout();
  // };

  return (
    // className 는 tailwindcss 로 작성
    <header className='flex justify-between border-b border-gary-300 p-4'>
      <Link to='/' className='flex items-conter text-4xl text-brand'>
        <FiShoppingBag />
        <h1>Shoppy</h1>
      </Link>
      <nav className='flex items-center gap-4 font-semiblod'>
        <Link to='/products'>Products</Link>
        <Link to='/carts'>Carts</Link>
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
