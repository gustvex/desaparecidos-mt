import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, User, Eye, VenusAndMars } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { PessoaDesaparecidaDTO } from '@/assets/interfaces';
import { formatDate, getFieldValue, toTitleCase } from '@/lib/utils';
import PersonPhoto from '@/components/shared/PersonPhoto';

interface CardProps {
    person: PessoaDesaparecidaDTO;
}

const getStatusBadge = (person: PessoaDesaparecidaDTO) => {
    if (person.ultimaOcorrencia?.dataLocalizacao) {
        if (person.vivo) {
            return <Badge className="bg-green-600 hover:bg-green-700 text-white font-bold text-md">Localizada Viva</Badge>;
        }
        return <Badge className="bg-red-600 hover:bg-red-700 text-white font-bold text-md">Localizada Morta</Badge>;
    }
    return <Badge className="bg-red-600 hover:bg-red-700 text-white font-bold text-md">Desaparecida</Badge>;
};

const PersonCard: React.FC<CardProps> = ({ person }) => {
    const navigate = useNavigate();

    return (
        <Card className="flex flex-col justify-center items-center md:flex-row p-4 m-2 w-full sm:w-auto md:m-4">
            <div className="w-[200px] h-[236px] flex-shrink-0">
                <PersonPhoto urlFoto={person.urlFoto} nome={person.nome} />
            </div>
            <CardContent className="w-full md:w-[250px] flex-grow-1 p-0 pl-0 pt-4 md:pl-4 md:pt-0">
                <div className="flex flex-col h-full justify-between">
                    <div className="flex flex-col gap-1">
                        <h3
                            className="text-lg font-semibold text-foreground truncate"
                            title={toTitleCase(person.nome) || "Nome não informado"}
                        >
                            {toTitleCase(person.nome) || "Nome não informado"}
                        </h3>

                        <div className="flex items-center space-x-2 text-lg text-muted-foreground">
                            <User className="w-4 h-4" />
                            <span className="text-foreground font-bold">Idade:</span>
                            <span className="truncate">
                                {person.idade ? `${person.idade} anos` : "Não informada"}
                            </span>
                        </div>

                        <div className="flex items-center space-x-2 text-lg text-muted-foreground">
                            <VenusAndMars className="w-4 h-4" />
                            <span className="text-foreground font-bold">Sexo:</span>
                            <span className="truncate">
                                {toTitleCase(person.sexo) || "Não informado"}
                            </span>
                        </div>

                        <div className="flex items-center space-x-2 text-lg text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span className="text-foreground font-bold whitespace-nowrap">Desde:</span>
                            <span className="truncate">
                                {formatDate(person.ultimaOcorrencia?.dtDesaparecimento)}
                            </span>
                        </div>

                        <div className="flex items-center space-x-2 text-lg text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span className="text-foreground font-bold">Local:</span>
                            <span className="truncate">
                                {toTitleCase(person.ultimaOcorrencia?.localDesaparecimentoConcat) || "Não informado"}
                            </span>
                        </div>

                        <div className="mt-2">
                            {getStatusBadge(person)}
                        </div>
                    </div>

                    <div className="mt-4">
                        <Button
                            onClick={() => navigate(`/details/${person.id}`)}
                            className="w-full font-bold"
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
