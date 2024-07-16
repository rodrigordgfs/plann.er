import { ChevronDown, Clock } from "lucide-react";
import { useState } from "react";
import times from "../utils/times";

interface TimePickerProps {
  handleSelectedTime: (time: string) => void;
  value?: string | "";
}

const dayTimes = times();

export function TimePicker({ handleSelectedTime, value }: TimePickerProps) {
  const [selectedTime, setSelectedTime] = useState<string>(value || "");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const formatTime = (time: string): string => {
    const [hour, rest] = time.split(":");
    const [minute] = rest.split(" ");
    return `${hour.padStart(2, "0")}:${minute}`;
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
    setShowDropdown(false);
    handleSelectedTime(formatTime(time));
  };

  return (
    <div className="relative flex-1 text-left">
      <div>
        <button
          type="button"
          onClick={() => setShowDropdown(!showDropdown)}
          className="inline-flex justify-between w-full h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg items-center flex-1 text-center md:text-left md:justify-start gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-400"
        >
          <span className="flex flex-1 items-center text-lg text-zinc-400 gap-2">
            <Clock className="size-5 text-zinc-400" />
            {selectedTime || "Selecione um horário"}
          </span>
          <ChevronDown className="size-5 text-zinc-400" />
        </button>
      </div>

      {showDropdown && (
        <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-zinc-950 ring-1 ring-black ring-opacity-5 max-h-60 overflow-y-auto custom-time-dropdown-scrollbar">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {dayTimes.map((time) => (
              <button
                key={time}
                onClick={() => handleTimeClick(time)}
                className="block px-4 py-2 text-md text-zinc-400 w-full text-left hover:bg-zinc-700 focus:outline-none focus:bg-zinc-700"
                role="menuitem"
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
