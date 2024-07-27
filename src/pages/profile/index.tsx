import { useState, useRef } from "react";
import { Camera, Edit, User2 } from "lucide-react";
import { Button } from "../../components/button";
import { Skeleton } from "../../components/skeleton";

export function ProfilePage() {
  const [photo, setPhoto] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoto(e.target.files?.[0] || null);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <main className="flex flex-col gap-8 px-4 py-8">
      <h2 className="text-3xl font-semibold">Perfil</h2>

      {loading ? (
        <div className="flex flex-col items-center space-y-6">
          <div className="flex flex-col items-center gap-2">
            <Skeleton height="128px" width="128px" type="image" />
            <Skeleton height="44px" width="185px" type="button" />
          </div>
          <div className="flex flex-col items-center gap-5">
            <Skeleton height="56px" width="500px" type="text" />
            <Skeleton height="44px" width="500px" type="button" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-6">
          <div className="flex flex-col items-center gap-2">
            {photo ? (
              <img
                src={URL.createObjectURL(photo)}
                alt="Foto do usuário"
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center">
                <Camera className="size-6 text-gray-500" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />
            <Button
              onClick={handleButtonClick}
              variant="primary"
              className="mt-2"
            >
              Selecionar Imagem
            </Button>
          </div>

          <form className="flex max-w-[500px] w-full flex-col gap-5">
            <div className="h-14 px-4 bg-zinc-900 border border-zinc-800 rounded-lg shadow-shape flex items-center gap-2">
              <User2 className="size-5 text-zinc-400" />
              <input
                type="text"
                name="name"
                placeholder="Nome completo"
                className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none"
              />
            </div>

            <Button type="submit" variant="primary">
              <Edit className="size-5" />
              Editar perfil
            </Button>
          </form>
        </div>
      )}
    </main>
  );
}
