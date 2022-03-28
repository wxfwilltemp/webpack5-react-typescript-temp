/*
 * @Author: will
 * @Date: 2021-07-30 16:45:39
 * @LastEditTime: 2022-03-28 10:28:47
 * @LastEditors: will
 * @Description:
 */
import './login.less';
import HelloSvg from '@/assets/img/hello.svg';
console.log(2);

const Login = () => {
  return (
    <div className="login">
      <div className="inner-content">
        <p>基于 webpack5 + react + typescript + axios 简易脚手架</p>
        <img src={HelloSvg} alt="hello" className="welcome" />
      </div>
    </div>
  );
};

export default Login;
