import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { toSecureUrl } from "@/lib/utils";

interface PersonPhotoProps {
    urlFoto?: string;
    nome?: string;
    className?: string;
}

const PLACEHOLDER_COLORS = [
    "bg-blue-200 text-blue-800",
    "bg-purple-200 text-purple-800",
    "bg-green-200 text-green-800",
    "bg-orange-200 text-orange-800",
    "bg-pink-200 text-pink-800",
    "bg-teal-200 text-teal-800",
];

const getInitials = (nome?: string): string => {
    if (!nome?.trim()) return "?";
    const parts = nome.trim().split(/\s+/);
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const getColorClass = (nome?: string): string => {
    if (!nome) return PLACEHOLDER_COLORS[0];
    const index = nome.charCodeAt(0) % PLACEHOLDER_COLORS.length;
    return PLACEHOLDER_COLORS[index];
};

const PersonPhoto = ({ urlFoto, nome, className = "w-full h-full" }: PersonPhotoProps) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const secureUrl = toSecureUrl(urlFoto);
    const showImage = secureUrl && !error;

    if (showImage) {
        return (
            <div className={`relative ${className}`}>
                {!loaded && <Skeleton className="absolute inset-0 rounded-md" />}
                <img
                    src={secureUrl}
                    alt={nome ? `Foto de ${nome}` : "Foto da pessoa"}
                    className={`w-full h-full object-cover rounded-md transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
                    onLoad={() => setLoaded(true)}
                    onError={() => setError(true)}
                />
            </div>
        );
    }

    return (
        <div className={`flex flex-col items-center justify-center rounded-md bg-muted gap-1 ${className}`}>
            <div className={`flex items-center justify-center rounded-full w-16 h-16 text-2xl font-bold ${getColorClass(nome)}`}>
                {getInitials(nome)}
            </div>
            <span className="text-xs text-muted-foreground">Foto não disponível</span>
        </div>
    );
};

export default PersonPhoto;
