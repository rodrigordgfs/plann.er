import { LockKeyhole, Mail } from "lucide-react";
import { Button } from "../../components/button";

export function LoginPage() {
  return (
    <div className="flex flex-row h-screen">
      <div className="flex-1 flex items-center justify-center">
        <div className="max-h-[650px] max-w-[500px] h-full flex flex-col items-center justify-center gap-20 p-4">
          <div className="flex flex-col gap-4">
            <img
              src="/logo.svg"
              alt="Plann.er logo"
              className="h-12 self-start"
            />
            <h2 className="text-4xl font-bold pl-2">Acesse a plataforma</h2>
            <p className="text-base text-zinc-600 pl-2">
              Faça login ou registre-se para começar a construir seus projetos
              ainda hoje.
            </p>

            <form className="flex flex-col gap-4 pl-2">
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-sm text-zinc-200">E-mail</p>
                <div className="h-14 px-4 bg-zinc-900 border border-zinc-800 rounded-lg shadow-shape flex items-center gap-2">
                  <Mail className="size-5 text-zinc-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Digite seu e-mail"
                    className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-4">
                <div className="flex flex-row justify-between items-center gap-4">
                  <p className="font-semibold text-sm text-zinc-200">E-mail</p>
                  <p className="font-semibold text-sm text-lime-300 hover:text-lime-400 transition-all cursor-pointer">
                    Esqueceu a senha?
                  </p>
                </div>
                <div className="h-14 px-4 bg-zinc-900 border border-zinc-800 rounded-lg shadow-shape flex items-center gap-2">
                  <LockKeyhole className="size-5 text-zinc-400" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Digite sua senha"
                    className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none"
                  />
                </div>
              </div>

              <Button type="submit" variant="primary" size="full">
                Entrar
              </Button>
              <Button type="button" variant="secondary" size="full">
                Crie sua conta
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden md:block flex-1 bg-pattern bg-no-repeat bg-center" />
    </div>
  );
}
