import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import useTripContext from "../../hooks/use-trip-context";

interface ImportantLinksProps {
  handleCreateLinkModalOpen: (value: boolean) => void;
}

export function ImportantLinks({
  handleCreateLinkModalOpen,
}: ImportantLinksProps) {
  const { links } = useTripContext();

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>
      <div className="space-y-5">
        {links && links.length > 0 ? (
          links?.map((link) => {
            return (
              <div
                key={link.title}
                className="flex items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <span className="block font-medium text-zinc-100">
                    {link.title}
                  </span>
                  <a
                    href={link.url}
                    target="_blank"
                    className="block text-xs text-zinc-400 truncate hover:text-zinc-200 transition-all"
                  >
                    {link.url}
                  </a>
                </div>
                <Link2 className="size-5 text-zinc-400 shrink-0" />
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1.5">
              <span className="block text-zinc-500 text-sm">
                Nenhum link cadastrado
              </span>
            </div>
          </div>
        )}
      </div>
      <Button
        onClick={() => handleCreateLinkModalOpen(true)}
        variant="secondary"
        size="full"
      >
        <Plus className="size-5 text-zinc-200" />
        Cadastrar novo link
      </Button>
    </div>
  );
}
