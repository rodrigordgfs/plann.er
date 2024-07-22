import { LockKeyhole, Mail } from "lucide-react";
import { Button } from "../../components/button";
import useAuthContext from "../../hooks/use-auth-context";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type ErrorType = {
  [key: string]: string;
};

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

export function LoginPage() {
  const navigate = useNavigate();
  const { handleLogin, isAuthLoading, token } = useAuthContext();
  const [errors, setErrors] = useState<ErrorType>({});

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const email = data.get("email")?.toString() ?? "";
    const password = data.get("password")?.toString() ?? "";

    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const newErrors = result.error.errors.reduce(
        (acc: ErrorType, err: z.ZodIssue) => {
          const path = err.path[0];
          if (typeof path === "string") {
            acc[path] = err.message;
          }
          return acc;
        },
        {}
      );
      setErrors(newErrors);
      return;
    }

    setErrors({});
    handleLogin(email, password);
  };

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
            <h2 className="text-2xl md:text-4xl font-bold pl-2">Acesse a plataforma</h2>
            <p className="text-base text-zinc-600 pl-2">
              Faça login para começar a construir seus projetos ainda hoje.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 pl-2">
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-sm text-zinc-200">E-mail</p>
                <div
                  className={`h-14 px-4 bg-zinc-900 border border-zinc-800 rounded-lg shadow-shape flex items-center gap-2 ${
                    errors.email ? "ring-2 ring-offset ring-red-400" : ""
                  }`}
                >
                  <Mail className="size-5 text-zinc-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Digite seu e-mail"
                    className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm font-bold">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2 mb-4">
                <div className="flex flex-row justify-between items-center gap-4">
                  <p className="font-semibold text-sm text-zinc-200">Senha</p>
                  <p className="font-semibold text-sm text-lime-300 hover:text-lime-400 transition-all cursor-pointer">
                    Esqueceu a senha?
                  </p>
                </div>
                <div
                  className={`h-14 px-4 bg-zinc-900 border border-zinc-800 rounded-lg shadow-shape flex items-center gap-2 ${
                    errors.password ? "ring-2 ring-offset ring-red-400" : ""
                  }`}
                >
                  <LockKeyhole className="size-5 text-zinc-400" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Digite sua senha"
                    className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm font-bold">
                    {errors.password}
                  </p>
                )}
              </div>

              <Button
                loading={isAuthLoading}
                type="submit"
                variant="primary"
                size="full"
              >
                Entrar
              </Button>
              <Button
                onClick={() => navigate("/register")}
                disabled={isAuthLoading}
                type="button"
                variant="secondary"
                size="full"
              >
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
