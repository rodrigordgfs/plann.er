import { useState, useRef, useEffect, FormEvent } from "react";
import { Camera, Edit, User2 } from "lucide-react";
import { Button } from "../../components/button";
import { Skeleton } from "../../components/skeleton";
import useAuthContext from "../../hooks/use-auth-context";
import { z } from "zod";

type ErrorType = {
  [key: string]: string;
};

const userSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
});

export function ProfilePage() {
  const {
    isLoadingUser,
    handelGetUser,
    userId,
    user,
    handleUpdateUserData,
    isLaodingUpdateUser,
  } = useAuthContext();

  const [photo, setPhoto] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(user?.image || ""); // Add state for photo URL
  const [name, setName] = useState<string>(user?.name || "");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [errors, setErrors] = useState<ErrorType>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoto(e.target.files?.[0] || null);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = userSchema.safeParse({
      name,
    });

    if (!result.success) {
      const newErrors = result.error.errors.reduce(
        (acc: ErrorType, err: z.ZodIssue) => {
          const path = err.path[0];
          if (typeof path === "string") {
            acc[path] = err.message;
          }
          return acc;
        },
        {}
      );
      setErrors(newErrors);
      return;
    }

    setErrors({});

    let base64Image = null;
    if (photo) {
      try {
        base64Image = await convertToBase64(photo);
      } catch (error) {
        setErrors({ photo: "Erro ao processar a imagem" });
        return;
      }
    }

    handleUpdateUserData(name, base64Image);
  };

  useEffect(() => {
    handelGetUser(userId);
  }, [userId, handelGetUser]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhotoUrl(user.image); // Set the photo URL
    }
  }, [user]);

  return (
    <main className="flex flex-col gap-8 px-4 py-8">
      <h2 className="text-3xl font-semibold">Perfil</h2>

      {isLoadingUser ? (
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
            ) : photoUrl ? (
              <img
                src={photoUrl}
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

          <form
            onSubmit={handleSubmit}
            className="flex max-w-[500px] w-full flex-col gap-5"
          >
            <div className="flex flex-col gap-2">
              <div
                className={`h-14 px-4 bg-zinc-900 border border-zinc-800 rounded-lg shadow-shape flex items-center gap-2 ${
                  errors.name ? "ring-2 ring-offset ring-red-400" : ""
                }`}
              >
                <User2 className="size-5 text-zinc-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm font-bold">{errors.name}</p>
              )}
            </div>

            <Button
              loading={isLaodingUpdateUser}
              type="submit"
              variant="primary"
            >
              <Edit className="size-5" />
              Editar perfil
            </Button>
          </form>
        </div>
      )}
    </main>
  );
}
