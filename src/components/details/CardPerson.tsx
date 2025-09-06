import { Calendar, Clock, Heart, MapPin, User, VenusAndMars } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { formatDate, getFieldValue } from "@/lib/utils";
import { Badge } from "../ui/badge";
import type { PessoaDesaparecidaDTO } from "@/assets/interfaces";

interface Props {
    person: PessoaDesaparecidaDTO;
    daysMissing: number | null
}

const CardPerson = ({ person, daysMissing }: Props) => {
    const getStatusBadge = () => {
        if (person) {
            return (
                <Badge className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-4 py-2">
                    ENCONTRADA VIVA
                </Badge>
            );
        }
        return (
            <Badge className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-4 py-2">
                DESAPARECIDA
            </Badge>
        );
    };
    return (
        <Card className="flex">
            <CardHeader className="pb-4">
                <div className="flex flex-col justify-center  items-center sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="space-y-2">
                        <CardTitle className="text-3xl font-bold text-foreground">
                            {getFieldValue(person.nome, "Nome não informado")}
                        </CardTitle>
                        <p className="text-muted-foreground text-sm">
                            <strong>ID da Ocorrência:</strong> #{person.ultimaOcorrencia?.ocoId || person.id}
                        </p>
                    </div>
                    {getStatusBadge()}
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex justify-center  items-center flex-col lg:flex-row gap-8">
                    <div className="flex-shrink-0">
                        <div className="w-80 h-80 bg-muted rounded-lg flex items-center justify-center overflow-hidden border-2 border-border">
                            {person.urlFoto ? (
                                <img
                                    src={person.urlFoto}
                                    alt={`Foto de ${person.nome}`}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="text-center">
                                    <User className="w-16 h-16 text-muted-foreground mx-auto mb-2" />
                                    <p className="text-sm text-muted-foreground">
                                        Foto não disponível
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex-1 space-y-6">
                        <div>
                            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
                                Informações Básicas
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <User className="w-4 h-4 text-muted-foreground" />
                                        <div>
                                            <span className="text-sm font-bold text-foreground">Nome Completo:</span>
                                            <p className="text-sm">
                                                {getFieldValue(person.nome, "Não informado")}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Calendar className="w-4 h-4 text-muted-foreground" />
                                        <div>
                                            <span className="text-sm font-bold text-foreground">Idade:</span>
                                            <p className="text-sm">
                                                {person.idade ? `${person.idade} anos` : "Não informada"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <VenusAndMars className="w-4 h-4 text-muted-foreground" />
                                        <div>
                                            <span className="text-sm font-bold text-foreground">Sexo:</span>
                                            <p className="text-sm">
                                                {getFieldValue(person.sexo, "Não informado")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <Calendar className="w-4 h-4 text-muted-foreground" />
                                        <div>
                                            <span className="text-sm font-bold text-foreground">Data do Desaparecimento:</span>
                                            <p className="text-sm">
                                                {formatDate(person.ultimaOcorrencia?.dtDesaparecimento) || "Não informada"}
                                            </p>
                                        </div>
                                    </div>
                                    {daysMissing && (
                                        <div className="flex items-center space-x-3">
                                            <Clock className="w-4 h-4 text-muted-foreground" />
                                            <div>
                                                <span className="text-sm font-bold text-foreground">Dias Desaparecida:</span>
                                                <p className="text-sm font-bold text-red-600">
                                                    {daysMissing} dias
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex items-center space-x-3">
                                        <MapPin className="w-4 h-4 text-muted-foreground" />
                                        <div>
                                            <span className="text-sm font-bold text-foreground">Local do Desaparecimento:</span>
                                            <p className="text-sm">
                                                {getFieldValue(person.ultimaOcorrencia?.localDesaparecimentoConcat, "Não informado")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {person.vivo && person.ultimaOcorrencia?.dataLocalizacao && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <h4 className="text-lg font-bold text-green-800 mb-2 flex items-center">
                                    <Heart className="w-5 h-5 mr-2" />
                                    Pessoa Encontrada
                                </h4>
                                <p className="text-sm text-green-700">
                                    <strong>Data de Localização:</strong> {formatDate(person.ultimaOcorrencia.dataLocalizacao)}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CardPerson;
