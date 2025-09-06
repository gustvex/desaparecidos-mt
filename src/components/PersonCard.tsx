import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, User, Eye, VenusAndMars } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { PessoaDesaparecidaDTO } from '@/assets/interfaces';
import { formatDate, getFieldValue } from '@/lib/utils';

interface CardProps {
    person: PessoaDesaparecidaDTO;
}

const PersonCard: React.FC<CardProps> = ({ person }) => {
    const [imageError, setImageError] = useState(false);
    const navigate = useNavigate();



    const getStatusBadge = () => {
        if (person.vivo) {
            return <Badge className="bg-green-600 hover:bg-green-700 text-white font-bold">Encontrada Viva</Badge>;
        }
        return <Badge className="bg-red-600 hover:bg-red-700 text-white font-bold">Desaparecida</Badge>;
    };



    return (
        <Card className="flex flex-col justify-center items-center md:flex-row  p-4 m-4">
            <div className="w-[200px] h-[236px] flex-shrink-0">
                {person.urlFoto && !imageError ? (
                    <img
                        src={person.urlFoto}
                        alt={`Foto de ${getFieldValue(person.nome, "Pessoa desconhecida")}`}
                        className="w-full h-full object-cover rounded-md"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full bg-muted rounded-md">
                        <User className="w-1/2 h-1/2 text-muted-foreground" />
                    </div>
                )}
            </div>
            <CardContent className="w-[250px] flex-grow-1 p-0 pl-4">
                <div className="flex flex-col h-full justify-between">
                    <div className="flex flex-col gap-1">
                        <h3
                            className="text-lg font-semibold text-foreground truncate"
                            title={getFieldValue(person.nome, "Nome não informado")}
                        >
                            {getFieldValue(person.nome, "Nome não informado")}
                        </h3>

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
                                {formatDate(person.ultimaOcorrencia?.dtDesaparecimento)}
                            </span>
                        </div>

                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span className="text-foreground font-bold">Local:</span>
                            <span className="truncate">
                                {getFieldValue(person.ultimaOcorrencia?.localDesaparecimentoConcat, "Não informado")}
                            </span>
                        </div>

                        <div className="mt-2">
                            {getStatusBadge()}
                        </div>
                    </div>

                    <div className="mt-4">
                        <Button
                            onClick={() => navigate(`/details/${person.id}`)}
                            className="w-full  "
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