import { Link2, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useTripContext from "../../hooks/use-trip-context";

export function CreateLinkModal() {
  const { tripId } = useParams();
  const { handleLinkModalOpen, handleAddNewLink } = useTripContext();

  const [savingLink, setSavingLink] = useState(false);

  const createLink = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const title = data.get("title")?.toString();
    const url = data.get("url")?.toString();

    if (!title || title.length < 4) {
      return toast.warning(
        "Adicione um título para a atividade com no mínimo 4 caracteres"
      );
    } else if (!url) {
      return toast.warning("Adicione uma url para a atividade");
    }

    setSavingLink(true);

    api
      .post(`/trips/${tripId}/links`, {
        title,
        url,
      })
      .then(({ data }) => {
        handleAddNewLink(data);
        handleLinkModalOpen(false);
        toast.success("Link adicionado com sucesso");
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      })
      .finally(() => {
        setSavingLink(false);
      });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-4">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar link</h2>
            <button onClick={() => handleLinkModalOpen(false)}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar os links importantes.
          </p>
        </div>

        <form onSubmit={createLink} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg shadow-shape flex items-center gap-2">
            <Tag className="size-5 text-zinc-400" />
            <input
              type="text"
              name="title"
              placeholder="Título do link"
              className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none"
            />
          </div>
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg shadow-shape flex items-center gap-2">
            <Link2 className="size-5 text-zinc-400" />
            <input
              type="url"
              name="url"
              placeholder="URL"
              className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none"
            />
          </div>
          <Button
            loading={savingLink}
            type="submit"
            variant="primary"
            size="full"
          >
            Salvar link
          </Button>
        </form>
      </div>
    </div>
  );
}
