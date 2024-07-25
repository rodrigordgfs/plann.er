import { LoaderCircleIcon } from "lucide-react";
import { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "rounded-lg px-5 py-2 font-medium flex items-center justify-center gap-2 transition-all",
  variants: {
    variant: {
      primary: "bg-lime-300 hover:bg-lime-400 text-lime-950",
      secondary: "bg-zinc-800 hover:bg-zinc-700 text-zinc-200",
      tertiary: "bg-zinc-950 hover:bg-zinc-800 text-zinc-200",
      negative: "bg-red-800 hover:bg-red-700 text-red-200",
    },

    size: {
      default: "h-11 py-2",
      full: "w-full h-11",
      icon: "w-11 h-11 p-0",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
  loading?: boolean;
}

export function Button({
  children,
  variant,
  size,
  loading,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={loading}
      {...props}
      className={buttonVariants({ variant, size })}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <LoaderCircleIcon className="size-5 animate-spin" />
          Por favor, aguarde!
        </div>
      ) : (
        children
      )}
    </button>
  );
}
