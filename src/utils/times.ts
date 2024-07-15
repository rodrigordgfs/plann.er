const times = (): string[] => {
  const times: string[] = [];

  const formatTime = (hours: number, minutes: number): string => {
    const hourString = hours % 24; // Garante que seja no formato de 0 a 23
    const ampm = hours < 12 ? "AM" : "PM";
    const formattedHour =
      hourString === 0 ? 12 : hourString > 12 ? hourString - 12 : hourString;
    return `${formattedHour}:${minutes === 0 ? "00" : minutes} ${ampm}`;
  };

  // Adiciona horários de 00:30 AM até 11:30 AM
  for (let i = 0; i < 12; i++) {
    times.push(formatTime(i, 30)); // Adiciona a meia hora
    times.push(formatTime(i, 0)); // Adiciona a hora cheia
  }

  // Adiciona o horário 12:00 PM
  times.push(formatTime(12, 0));

  return times.sort((a, b) => {
    const [timeA, periodA] = a.split(" ");
    const [timeB, periodB] = b.split(" ");

    const [hoursA, minutesA] = timeA.split(":").map(Number);
    const [hoursB, minutesB] = timeB.split(":").map(Number);

    const totalMinutesA =
      (periodA === "PM" ? hoursA + 12 : hoursA) * 60 + minutesA;
    const totalMinutesB =
      (periodB === "PM" ? hoursB + 12 : hoursB) * 60 + minutesB;

    return totalMinutesA - totalMinutesB;
  });
};

export default times;
