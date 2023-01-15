import React,{useState,useEffect} from 'react';
import { Link} from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { BsFillPencilFill } from 'react-icons/bs';
import { login,logout,onUserStateChange } from '../api/firebase';

export default function Navbar() {
  // 처음에는 사용자가 없으므로 아무것도 설정하지 않음 -> useState();
  const [user, setUser] = useState();

  useEffect(() => {
    // firebase에 있는 콜백함수 호출
    // 로그안한 사용자의 세션이 남아있으면 정상적인 유저의 객체가 전달 됨
    onUserStateChange((user) => {
      // user의 정보를 전달 받음
      console.log(user);
      // 유저의 객체가 남아있으면 우리의 컴포넌트에 상태를 업데이트
      setUser(user);
      // 로그아웃 하면 사용자 정보가 없어서 null 값이 전달 됨
    })
  }, []);
  const handleLogin = () => {
    // firebase에 있는 로그인 함수 호출
    login().then(setUser);
  };

  const handleLogout = () => {
    // firebase에 있는 로그아웃 함수 호출
    logout().then(setUser);
  };

  return (
    <header className='flex justify-between border-b border-gary-300 p-4'>
      <Link to='/' className='flex items-conter text-4xl text-brand'>
        <FiShoppingBag />
        <h1>Shoppy</h1>
      </Link>
      <nav className='flex items-center gap-4 font-semiblod'>
        <Link to='/products'>Products</Link>
        <Link to='/carts'>Carts</Link>
        <Link to='/products/new' className='text-2xl'>
          <BsFillPencilFill />
        </Link>
        {/* 로그인 버튼이 클릭되면 */}
        {/* 사용자가 없다면 로그인 버튼을 보여주고 */}
        {!user && <button onClick={handleLogin}>Login</button>}
        {/* 사용자가 있다묜 로그아웃 버튼 보여줌 */}
        {user && <button onClick={handleLogout}>Logout</button>}
      </nav>
    </header>
  );
}
