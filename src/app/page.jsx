'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="h-screen w-full bg-primary-base flex justify-center items-center text-white text-4xl gap-4">
      Bem vindo
      <Link href="/login" className="border p-3 text-3xl rounded">
        Faça Login
      </Link>
    </main>
  );
}
