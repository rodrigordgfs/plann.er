type SkeletonProps = {
  type: "text" | "image" | "button";
  width?: string;
  height?: string;
};

export function Skeleton({
  type,
  width = "100%",
  height = "20px",
}: SkeletonProps) {
  const skeletonType = (type: string) => {
    switch (type) {
      case "text":
        return "bg-zinc-600 rounded-md";
      case "image":
        return "bg-zinc-600 rounded-full";
      case "button":
        return "bg-zinc-600 rounded-lg";
      default:
        return "bg-zinc-600";
    }
  };

  return (
    <div
      className={`animate-pulse ${skeletonType(type)}`}
      style={{ width, height }}
    />
  );
}
