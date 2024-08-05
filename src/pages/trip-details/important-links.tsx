import { Link2, LoaderCircle, Plus, X } from "lucide-react";
import { Button } from "../../components/button";
import useTripContext from "../../hooks/use-trip-context";

export function ImportantLinks() {
  const {
    links,
    handleLinkModalOpen,
    isParticipantUnconfirmed,
    handleDeleteLink,
    loadingLinkId,
  } = useTripContext();

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>
      <div className="space-y-5">
        {links && links.length > 0 ? (
          links?.map((link) => {
            return (
              <div
                key={link.id}
                className="flex items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <span className="block font-medium text-zinc-100">
                    {link.title}
                  </span>
                  <a
                    href={link.url}
                    target="_blank"
                    className="block text-sm text-zinc-400 truncate hover:text-zinc-200 transition-all"
                  >
                    {link.url}
                  </a>
                </div>
                <div className="group">
                  {loadingLinkId === link.id ? (
                    <LoaderCircle className="size-5 text-zinc-400 animate-spin" />
                  ) : (
                    <>
                      <Link2 className="size-5 text-zinc-400 shrink-0 group-hover:hidden" />
                      <X
                        onClick={() => handleDeleteLink(link.id)}
                        className="size-5 text-zinc-400 shrink-0 hidden group-hover:block cursor-pointer"
                      />
                    </>
                  )}
                </div>
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
      {!isParticipantUnconfirmed() && (
        <Button
          onClick={() => handleLinkModalOpen(true)}
          variant="secondary"
          size="full"
        >
          <Plus className="size-5 text-zinc-200" />
          Cadastrar novo link
        </Button>
      )}
    </div>
  );
}
