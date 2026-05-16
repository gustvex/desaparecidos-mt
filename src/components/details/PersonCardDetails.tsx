import { Calendar, Clock, Heart, MapPin, User, VenusAndMars } from "lucide-react";
import PersonPhoto from "@/components/shared/PersonPhoto";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { formatDate, getFieldValue, toTitleCase } from "@/lib/utils";
import type { PessoaDesaparecidaDTO } from "@/types";
import StatusBadge from "@/components/shared/StatusBadge";
import { Typography } from "@/components/ui/typography";

interface Props {
    person: PessoaDesaparecidaDTO;
    daysMissing: number | null;
}

interface FieldRowProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    valueClassName?: string;
}

const FieldRow = ({ icon, label, value, valueClassName }: FieldRowProps) => (
    <div className="flex items-center space-x-3">
        <span className="text-muted-foreground flex-shrink-0">{icon}</span>
        <div>
            <Typography variant="label" as="span">{label}</Typography>
            <Typography variant="body" color="muted" as="p" className={valueClassName}>{value}</Typography>
        </div>
    </div>
);

const CardPerson = ({ person, daysMissing }: Props) => {
    return (
        <Card className="flex">
            <CardHeader className="pb-4">
                <div className="flex flex-col justify-center items-center sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="space-y-2">
                        <CardTitle className="text-xl sm:text-3xl font-bold text-foreground">
                            {toTitleCase(person.nome) || "Nome não informado"}
                        </CardTitle>
                        <Typography variant="body" color="muted" as="p">
                            <strong>ID da Ocorrência:</strong> #{person.ultimaOcorrencia?.ocoId || person.id}
                        </Typography>
                    </div>
                    <StatusBadge vivo={person.vivo} ultimaOcorrencia={person.ultimaOcorrencia} />
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex justify-center items-center flex-col lg:flex-row gap-8">
                    <div className="flex-shrink-0">
                        <div className="w-full max-w-xs sm:w-80 h-64 sm:h-80 overflow-hidden border-2 border-border rounded-lg">
                            <PersonPhoto urlFoto={person.urlFoto} nome={person.nome} />
                        </div>
                    </div>
                    <div className="flex-1 space-y-6">
                        <div>
                            <Typography variant="h3" className="mb-4 flex items-center">
                                Informações Básicas
                            </Typography>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <FieldRow
                                        icon={<User className="w-4 h-4" />}
                                        label="Nome Completo:"
                                        value={toTitleCase(person.nome) || "Não informado"}
                                    />
                                    <FieldRow
                                        icon={<Calendar className="w-4 h-4" />}
                                        label="Idade:"
                                        value={person.idade ? `${person.idade} anos` : "Não informada"}
                                    />
                                    <FieldRow
                                        icon={<VenusAndMars className="w-4 h-4" />}
                                        label="Sexo:"
                                        value={toTitleCase(person.sexo) || "Não informado"}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <FieldRow
                                        icon={<Calendar className="w-4 h-4" />}
                                        label="Data do Desaparecimento:"
                                        value={formatDate(person.ultimaOcorrencia?.dtDesaparecimento) || "Não informada"}
                                    />
                                    {daysMissing && (
                                        <FieldRow
                                            icon={<Clock className="w-4 h-4" />}
                                            label="Dias Desaparecida:"
                                            value={`${daysMissing} dias`}
                                            valueClassName="font-bold text-red-600"
                                        />
                                    )}
                                    <FieldRow
                                        icon={<MapPin className="w-4 h-4" />}
                                        label="Local do Desaparecimento:"
                                        value={toTitleCase(person.ultimaOcorrencia?.localDesaparecimentoConcat) || "Não informado"}
                                    />
                                </div>
                            </div>
                        </div>
                        {person.vivo && person.ultimaOcorrencia?.dataLocalizacao && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <Typography variant="h3" as="h4" className="text-green-800 mb-2 flex items-center">
                                    <Heart className="w-5 h-5 mr-2" />
                                    Pessoa Encontrada
                                </Typography>
                                <Typography variant="body" as="p" className="text-green-700">
                                    <strong>Data de Localização:</strong> {formatDate(person.ultimaOcorrencia.dataLocalizacao)}
                                </Typography>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CardPerson;
