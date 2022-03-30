/*
 * @Author: will
 * @Date: 2021-07-30 16:45:39
 * @LastEditTime: 2022-03-30 15:52:50
 * @LastEditors: will
 * @Description:
 */
import './login.less';
import HelloSvg from '@/assets/img/hello.svg';

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
