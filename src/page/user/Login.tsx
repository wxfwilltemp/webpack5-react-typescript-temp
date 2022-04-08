import style from './login.less';
import HelloSvg from '@/assets/img/hello.svg';
import { Button } from 'antd';

const Login = () => {
  return (
    <div className={style.login}>
      <div className="inner-content">
        <p>基于 webpack5 + react + typescript + axios 简易脚手架</p>
        <img src={HelloSvg} alt="hello" className="welcome" />
        <Button type="primary">测试按钮</Button>
      </div>
    </div>
  );
};

export default Login;
