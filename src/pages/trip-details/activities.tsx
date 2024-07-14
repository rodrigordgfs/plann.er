import { CircleCheck } from "lucide-react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ActivitiesProps {
  activities: Activities;
}

interface Activities {
  [date: string]: {
    id: string;
    title: string;
    occurs_at: string;
    trip_id: string;
  }[];
}

export function Activities({ activities }: ActivitiesProps) {
  return (
    <div className="space-y-8">
      {activities &&
        Object.keys(activities).map((date) => {
          const parsedDate = parseISO(date);
          return (
            <div key={date} className="space-y-2.5">
              <div className="flex gap-2 items-baseline">
                <span className="text-xl text-zinc-300 font-semibold">
                  {format(parsedDate, "'Dia' d")}
                </span>
                <span className="text-xs text-zinc-500">
                  {format(parsedDate, "EEEE", { locale: ptBR })}
                </span>
              </div>
              {Array.isArray(activities[date]) &&
              activities[date].length > 0 ? (
                <div>
                  {activities[date].map((activity) => {
                    return (
                      <div key={activity.id} className="space-y-2.5">
                        <div className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 transition-all cursor-pointer rounded-xl shadow-shape flex items-center gap-3">
                          <CircleCheck className="size-5 text-lime-300" />
                          <span className="text-zinc-100">
                            {activity.title}
                          </span>
                          <span className="text-zinc-400 text-sm ml-auto">
                            {format(parseISO(activity.occurs_at), "HH:mm'h'")}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-zinc-500 text-sm">
                  Nenhuma atividade cadastrada nessa data.
                </p>
              )}
            </div>
          );
        })}
    </div>
  );
}
