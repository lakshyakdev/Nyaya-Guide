import { useEffect } from 'react';
import './App.css'
import { userProfile } from './redux/slices/authSlice';
import AppRoutes from './RouteConfig'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast';

function App() {
  const dispatch = useDispatch();
  async function loginAccount() {
        try {
            const response = await dispatch(userProfile());
            console.log(response.payload);
            if (!response.payload?.success) {
              toast.error("To use all features please login");
            }
        } catch (e) {
          console.log(e);
          toast.error("An unexpected error occurred, Please login again");
        }
  }

  useEffect(() => {
    (async () => {
      await loginAccount();
      })();
    }, []);

  return (
    
      <>
        <AppRoutes />
      </>
    )
}

export default App
