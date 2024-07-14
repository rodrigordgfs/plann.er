import { Calendar, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface CreateActivityModalProps {
  handleCreateActivityModalOpen: (value: boolean) => void;
}

export function CreateActivityModal({
  handleCreateActivityModalOpen,
}: CreateActivityModalProps) {
  const { tripId } = useParams();

  const [savingActivity, setSavingActivity] = useState(false);

  const createActivity = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const title = data.get("title")?.toString();
    const occurs_at = data.get("occurs_at")?.toString();

    if (!title) {
      return toast.warning("Adicione um titulo para a atividade");
    } else if (!occurs_at) {
      return toast.warning("Adicione uma data e hora para a atividade");
    }

    setSavingActivity(true);

    api
      .post(`/trips/${tripId}/activities`, {
        title,
        occurs_at,
      })
      .then(() => {
        window.document.location.reload();
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      })
      .finally(() => {
        setSavingActivity(false);
      });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-4">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Confirmar criação de viagem
            </h2>
            <button onClick={() => handleCreateActivityModalOpen(false)}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar as atividades.
          </p>
        </div>

        <form onSubmit={createActivity} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="size-5 text-zinc-400" />
            <input
              type="text"
              name="title"
              placeholder="Qual a atividade?"
              className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-14 w-full px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <Calendar className="size-5 text-zinc-400" />
              <input
                type="datetime-local"
                name="occurs_at"
                placeholder="Data e Horário"
                className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none"
              />
            </div>
          </div>
          <Button
            loading={savingActivity}
            type="submit"
            variant="primary"
            size="full"
          >
            Salvar atividade
          </Button>
        </form>
      </div>
    </div>
  );
}
