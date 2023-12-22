import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthCheck = ({ isAuthenticated, children }) => {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return children;
};

export default AuthCheck;
