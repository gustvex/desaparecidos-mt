import { Calendar, Clock, Heart, MapPin, User, VenusAndMars } from "lucide-react";
import PersonPhoto from "@/components/shared/PersonPhoto";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { formatDate, toTitleCase } from "@/lib/utils";
import type { PessoaDesaparecidaDTO } from "@/types";
import StatusBadge from "@/components/shared/StatusBadge";
import { cn } from "@/lib/utils";

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
    <div className="flex items-center gap-3 px-4 py-3">
        <span className="text-muted-foreground shrink-0">{icon}</span>
        <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
            <p className={cn("text-sm font-medium text-foreground truncate", valueClassName)}>{value}</p>
        </div>
    </div>
);

const CardPerson = ({ person, daysMissing }: Props) => {
    return (
        <Card>
            <CardHeader className="pb-4">
                <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-1 text-center sm:text-left">
                        <CardTitle className="text-xl sm:text-2xl font-bold">
                            {toTitleCase(person.nome) || "Nome não informado"}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Ocorrência #{person.ultimaOcorrencia?.ocoId || person.id}
                        </p>
                    </div>
                    <StatusBadge vivo={person.vivo} ultimaOcorrencia={person.ultimaOcorrencia} />
                </div>
            </CardHeader>

            <CardContent>
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="shrink-0 mx-auto lg:mx-0">
                        <div className="w-64 h-72 sm:w-72 sm:h-80 overflow-hidden rounded-lg border border-border">
                            <PersonPhoto urlFoto={person.urlFoto} nome={person.nome} />
                        </div>
                    </div>

                    <div className="flex-1 space-y-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1">
                            Informações Básicas
                        </p>
                        <div className="rounded-lg border border-border divide-y divide-border overflow-hidden">
                            <FieldRow
                                icon={<User className="w-4 h-4" />}
                                label="Nome Completo"
                                value={toTitleCase(person.nome) || "Não informado"}
                            />
                            <FieldRow
                                icon={<Calendar className="w-4 h-4" />}
                                label="Idade"
                                value={person.idade ? `${person.idade} anos` : "Não informada"}
                            />
                            <FieldRow
                                icon={<VenusAndMars className="w-4 h-4" />}
                                label="Sexo"
                                value={toTitleCase(person.sexo) || "Não informado"}
                            />
                            <FieldRow
                                icon={<Calendar className="w-4 h-4" />}
                                label="Data do Desaparecimento"
                                value={formatDate(person.ultimaOcorrencia?.dtDesaparecimento) || "Não informada"}
                            />
                            {daysMissing && (
                                <FieldRow
                                    icon={<Clock className="w-4 h-4" />}
                                    label="Dias Desaparecida"
                                    value={`${daysMissing} dias`}
                                    valueClassName="text-red-600"
                                />
                            )}
                            <FieldRow
                                icon={<MapPin className="w-4 h-4" />}
                                label="Local do Desaparecimento"
                                value={toTitleCase(person.ultimaOcorrencia?.localDesaparecimentoConcat) || "Não informado"}
                            />
                        </div>

                        {person.vivo && person.ultimaOcorrencia?.dataLocalizacao && (
                            <div className="rounded-lg border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900 divide-y divide-green-200 dark:divide-green-900 overflow-hidden">
                                <div className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-950/40">
                                    <Heart className="w-4 h-4 text-green-700 dark:text-green-400" />
                                    <p className="text-xs font-semibold uppercase tracking-wider text-green-700 dark:text-green-400">
                                        Pessoa Encontrada
                                    </p>
                                </div>
                                <div className="px-4 py-3">
                                    <p className="text-xs text-muted-foreground mb-0.5">Data de Localização</p>
                                    <p className="text-sm font-medium text-green-700 dark:text-green-400">
                                        {formatDate(person.ultimaOcorrencia.dataLocalizacao)}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CardPerson;
