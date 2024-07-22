import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button";
import useTripContext from "../../hooks/use-trip-context";

export function AccountCreatedModal() {
  const navigate = useNavigate();
  const { handleLinkModalOpen } = useTripContext();

  const handleCloseModal = () => {
    handleLinkModalOpen(false);
    navigate("/login");
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-4">
      <div className="w-[380px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center">
            <h2 className="text-lg font-semibold">
              🎉 Conta criada com sucesso!
            </h2>
          </div>
          <p className="text-sm text-zinc-400 text-center">
            Sua conta foi criada com sucesso! Para acessar a aplicação, por
            favor, verifique seu e-mail cadastrado e confirme sua conta.
            <br />
            Se o e-mail não aparecer na caixa de entrada, verifique a pasta de
            spam. Após a confirmação, você poderá começar a planejar suas
            viagens.
          </p>
          <Button
            onClick={handleCloseModal}
            type="submit"
            variant="primary"
            size="full"
          >
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
}
