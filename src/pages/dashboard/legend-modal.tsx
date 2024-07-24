import { X } from "lucide-react";

interface LegendModalProps {
  handleLegendOpen: (value: boolean) => void;
}

export function LegendModal({ handleLegendOpen }: LegendModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Legenda</h2>
            <button onClick={() => handleLegendOpen(false)}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full" />
            <span>Futuras viagens</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full" />
            <span>Viagens passadas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full" />
            <span>Viagens em andamento</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-amber-500 rounded-full" />
            <span>Viagem não confirmada</span>
          </div>
        </div>
      </div>
    </div>
  );
}
