import { Outlet, useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import axios from './util/axios.customize';
import { useContext, useEffect } from 'react';
import { AuthContext } from './components/context/auth.context';
import HeaderAdmin from './components/layout/headerAdmin';


function AppAdmin() {
  const { setAuth, appLoading, setAppLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAccount = async () => {
      setAppLoading(true);
      try {
        const res = await axios.get(`/v1/api/account`);
        if (res && !res.message && res.role == 'MINHNHI') {
          setAuth({
            isAuthenticated: true,
            user: {
              email: res.email,
              name: res.name,
              role: res.role
            },
          });
        } 
        // nếu không có account thì chuyển hướng đến trang login
        else {
          navigate('/admin/login');
        }
      } catch (error) {
        console.error("Error fetching account data:", error);
        setAuth({
          isAuthenticated: false,
          user: null,
        });
      } finally {
        setAppLoading(false);
      }
    };

    fetchAccount();
  }, [setAuth, setAppLoading]);

  return (
    <div>
      {appLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <HeaderAdmin />
          <Outlet />
        </>
      )}
    </div>
  );
}

const LoadingSpinner = () => (
  <div style={loadingSpinnerStyle}>
    <Spin size="large" />
  </div>
);

const loadingSpinnerStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

export default AppAdmin;
