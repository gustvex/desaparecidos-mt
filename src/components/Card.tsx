import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, User, Eye, VenusAndMars } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Pessoa } from '@/assets/interfaces';

interface CardProps {
    person: Pessoa;
}

const PersonCard: React.FC<CardProps> = ({ person }) => {
    const [imageError, setImageError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Reseta o estado de erro da imagem quando a pessoa muda
        setImageError(false);
    }, [person.urlFoto]);

    const getStatus = () => {
        if (person.vivo === undefined) return 'DESAPARECIDA';
        return person.vivo ? 'ENCONTRADA VIVA' : 'DESAPARECIDA';
    };

    const getStatusBadge = () => {
        const status = getStatus();
        // A lógica do badge está correta, usando cores fixas que podem ser
        // mantidas se você quiser um destaque que não mude com o tema.
        if (status === 'DESAPARECIDA') {
            return <Badge className="bg-red-600 hover:bg-red-700 text-white font-bold">Desaparecida</Badge>;
        }
        return <Badge className="bg-green-600 hover:bg-green-700 text-white font-bold">Encontrada Viva</Badge>;
    };

    const formatDate = (dateInput?: string | Date) => {
        if (!dateInput) return "Não informada";
        try {
            const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
            return date.toLocaleDateString("pt-BR");
        } catch {
            return "Data inválida";
        }
    };

    const getFieldValue = (value: string, defaultValue: string) => {
        return value || defaultValue;
    };

    const hasValidPhoto = person.urlFoto && !imageError;

    return (
        <Card className="flex flex-row p-4 m-4 ">
            {/* Foto ocupa a parte esquerda em telas maiores e em cima em telas menores */}
            <div className="w-[200px] h-[236px]">
                {hasValidPhoto ? (
                    <img
                        src={person.urlFoto}
                        alt={`Foto de ${getFieldValue(person.nome, "Pessoa desconhecida")}`}
                        className="w-full h-full object-cover"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full bg-muted">
                        <User className="w-1/2 h-1/2 text-muted-foreground" />
                    </div>
                )}
            </div>

            <CardContent className="w-[250px]">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                        <h3
                            className="text-lg font-semibold text-foreground truncate"
                            title={getFieldValue(person.nome, "Nome não informado")}
                        >
                            {getFieldValue(person.nome, "Nome não informado")}
                        </h3>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <User className="w-4 h-4" />
                        <span className="text-foreground font-bold">Idade:</span>
                        <span className="truncate">
                            {person.idade ? `${person.idade} anos` : "Não informada"}
                        </span>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <VenusAndMars className="w-4 h-4" />
                        <span className="text-foreground font-bold">Sexo:</span>
                        <span className="truncate">
                            {getFieldValue(person.sexo, "Não informado")}
                        </span>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span className="text-foreground font-bold whitespace-nowrap">Desde:</span>
                        <span className="truncate">
                            {formatDate(person.ultimaOcorrencia?.dataDesaparecimento)}
                        </span>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span className="text-foreground font-bold">Local:</span>
                        <span
                            className="truncate flex-1"
                            title={getFieldValue(
                                person.ultimaOcorrencia?.localDesaparecimentoConcat,
                                "Não informado"
                            )}
                        >
                            {getFieldValue(
                                person.ultimaOcorrencia?.localDesaparecimentoConcat,
                                "Não informado"
                            )}
                        </span>
                    </div>

                    <div>
                        {getStatusBadge()}
                    </div>

                    <div className="mt-4">
                        <Button
                            onClick={() => navigate(`/details/${person.id}`)}
                            className="mt-auto cursor-pointer"
                        >
                            <Eye className="w-4 h-4 mr-2" />
                            Ver Detalhes
                        </Button>
                    </div>
                </div>

            </CardContent>
        </Card>

    );
};

export default PersonCard;
