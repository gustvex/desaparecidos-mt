import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Eye, VenusAndMars } from "lucide-react";
import { Link } from "react-router-dom";
import type { PessoaDesaparecidaDTO } from '@/assets/interfaces';
import { formatDate, toTitleCase } from '@/lib/utils';
import PersonPhoto from '@/components/shared/PersonPhoto';

interface CardProps {
    person: PessoaDesaparecidaDTO;
}

const getStatusBadge = (person: PessoaDesaparecidaDTO) => {
    if (person.ultimaOcorrencia?.dataLocalizacao) {
        if (person.vivo) {
            return <Badge className="bg-green-600 hover:bg-green-700 text-white font-bold">Localizada Viva</Badge>;
        }
        return <Badge className="bg-red-600 hover:bg-red-700 text-white font-bold">Localizada Morta</Badge>;
    }
    return <Badge className="bg-red-600 hover:bg-red-700 text-white font-bold">Desaparecida</Badge>;
};

interface InfoRowProps {
    icon: React.ReactNode;
    label: string;
    value: string;
}

const InfoRow = ({ icon, label, value }: InfoRowProps) => (
    <div className="flex items-center gap-2 text-sm min-w-0">
        <span className="flex-shrink-0 text-muted-foreground">{icon}</span>
        <span className="font-bold text-foreground flex-shrink-0">{label}</span>
        <span className=" text-muted-foreground" title={value}>{value}</span>
    </div>
);

const PersonCard: React.FC<CardProps> = ({ person }) => {
    return (
        <Card className="flex flex-col items-center md:flex-row p-4 m-2 w-full sm:w-auto md:m-4 md:h-[268px]">
            <div className="w-[200px] h-[236px] flex-shrink-0">
                <PersonPhoto urlFoto={person.urlFoto} nome={person.nome} />
            </div>

            <CardContent className="w-full md:w-[250px] min-w-0 p-0 pl-0 pt-4 md:pl-4 md:pt-0 flex flex-col justify-between h-[236px]">
                <div className="flex flex-col gap-2 min-w-0">
                    <h3
                        className="text-sm font-semibold text-foreground truncate"
                        title={toTitleCase(person.nome) || "Nome não informado"}
                    >
                        {toTitleCase(person.nome) || "Nome não informado"}
                    </h3>

                    <InfoRow
                        icon={<User className="w-4 h-4" />}
                        label="Idade:"
                        value={person.idade ? `${person.idade} anos` : "Não informada"}
                    />
                    <InfoRow
                        icon={<VenusAndMars className="w-4 h-4" />}
                        label="Sexo:"
                        value={toTitleCase(person.sexo) || "Não informado"}
                    />
                    <InfoRow
                        icon={<Calendar className="w-4 h-4" />}
                        label="Desde:"
                        value={formatDate(person.ultimaOcorrencia?.dtDesaparecimento)}
                    />

                    <div className="mt-1">
                        {getStatusBadge(person)}
                    </div>
                </div>

                <Button asChild size="sm" className="w-full font-bold mt-4">
                    <Link to={`/details/${person.id}`}>
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Detalhes
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
};

export default PersonCard;
