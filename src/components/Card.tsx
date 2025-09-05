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
        <Card className="flex flex-col sm:flex-row w-full p-4 m-2 overflow-hidden transition-shadow duration-300 hover:shadow-xl bg-white sm:max-w-md md:max-w-lg lg:max-w-xl">
            {/* Foto ocupa a parte esquerda do card em telas maiores e em cima em telas menores */}
            <div className="relative w-full sm:w-1/2 h-[300px] overflow-hidden rounded-md sm:mr-4 mb-4 sm:mb-0 flex-shrink-0 flex items-center justify-center bg-gray-200">
                {hasValidPhoto ? (
                    <img
                        src={person.urlFoto}
                        alt={`Foto de ${getFieldValue(person.nome, 'Pessoa desconhecida')}`}
                        className="w-full h-full object-cover"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <User className="w-1/2 h-1/2 text-gray-500" />
                )}
            </div>

            <CardContent className="flex flex-col justify-between flex-grow p-0 w-[200px]">
                <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                        <h3
                            className="text-lg font-semibold text-foreground"
                            title={getFieldValue(person.nome, "Nome não informado")}
                        >
                            {getFieldValue(person.nome, "Nome não informado")}
                        </h3>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700 font-bold">Idade:</span>
                        <span className="truncate">
                            {person.idade ? `${person.idade} anos` : "Não informada"}
                        </span>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <VenusAndMars className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700 font-bold">Sexo:</span>
                        <span className="truncate">
                            {getFieldValue(person.sexo, "Não informado")}
                        </span>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700 font-bold whitespace-nowrap">Desde:</span>
                        <span className="truncate">
                            {formatDate(person.ultimaOcorrencia?.dataDesaparecimento)}
                        </span>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700 font-bold">Local:</span>
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

                    {getStatusBadge()}
                </div>

                <div>
                    <Button
                        onClick={() => navigate(`/details/${person.id}`)}
                        className="mt-auto cursor-pointer"
                        variant="outline"
                    >
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Detalhes
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default PersonCard;
