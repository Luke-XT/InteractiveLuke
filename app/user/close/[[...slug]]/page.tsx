'use client';
import { useEffect } from 'react';

export default function ClosePage(props: any) {
  useEffect(() => {
    window.close();
  }, []);

  return null;
}
