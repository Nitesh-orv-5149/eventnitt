'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  children: ReactNode;
}

export default function HosterLayout({ children }: Props) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const session = localStorage.getItem('session');
    if (!session) {
      router.replace('/auth/signin');
      return;
    }

    try {
        const parsed = JSON.parse(session);
        const role = parsed.user?.role || parsed.role;
        if (role === 'hoster') {
          setAuthorized(true);
        } else {
          router.replace('/unauthorized');
        }
      } catch {
        router.replace('/login');
      }
  }, [router]);

  if (authorized === null) {
    return <p>Checking authorization...</p>;
  }

  if (!authorized) {
    return null; 
  }

  return <>{children}</>;
}
