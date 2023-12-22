'use client';

import Image from 'next/image';
import { InputMask } from 'input-mask-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export default function Home() {
  const { register, handleSubmit } = useForm();
  const { login, user } = useContext(AuthContext);

  async function handleLogin(data) {
    try {
      console.log(login)
      await login(data);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <main className="md:bg-gradient-to-r md:from-primary-base md:from-50% md:to-white md:to-50%">
      <div className="md:bg-[url('/background.svg')] bg-cover">
        <div className="xl:container grid grid-cols-1 md:grid-cols-2 md:h-screen w-screen">
          <div className="p-6 mb-20">
            <Link href="/">
              <Image
                src="/logo-white.svg"
                className="hidden md:block"
                width="100"
                height="32"
                alt="Logo do sistema toda branca"
              />
              <Image
                src="/logo.svg"
                className="md:hidden"
                width="100"
                height="32"
                alt="Logo padrão do sistema"
              />
            </Link>
          </div>
          <div className="p-8 flex items-center justify-center bg-white">
            <form
              action=""
              className="w-full max-w-[412px]"
              onSubmit={handleSubmit(handleLogin)}
            >
              <h1 className="text-2xl font-semibold text-dark-1 text-center mb-4">
                Bem vindo de volta!
              </h1>
              <p className="text-dark-2 text-base text-center mb-4">
                Ficamos muito felizes em tê-lo novamente.
              </p>
              {/* <div className="flex flex-col gap-2 mb-4">
                <label
                  htmlFor="login_cpf"
                  className="block text-dark-1 font-bold text-xs uppercase"
                >
                  CPF
                </label>
                <InputMask
                  {...register('cpf')}
                  id="login_cpf"
                  maxLength={14}
                  placeholder="000.000.000-00"
                  masks={[
                    { index: 3, character: '.' },
                    { index: 7, character: '.' },
                    { index: 11, character: '-' },
                  ]}
                  className="border border-dark-3 rounded-lg px-4 py-2 w-full"
                />
              </div> */}
              <div className="flex flex-col gap-2 mb-4">
                <label
                  htmlFor="login_cpf"
                  className="block text-dark-1 font-bold text-xs uppercase"
                >
                  Email
                </label>
                <input
                  {...register('email')}
                  id="login_email"
                  placeholder="Digite seu email"
                  className="border border-dark-3 rounded-lg px-4 py-2 w-full text-black"
                />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label
                  htmlFor="login_password"
                  className="block text-dark-1 font-bold text-xs uppercase"
                >
                  Senha
                </label>
                <input
                  {...register('password')}
                  type="password"
                  id="login_password"
                  placeholder="Digite sua senha"
                  className="border border-dark-3 rounded-lg px-4 py-2 text-black"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 rounded-lg text-sm text-white bg-primary-base hover:bg-primary-dark transition-all duration-150"
              >
                Entrar na conta
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
