import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    ArrowLeft,
    Calendar,
    MapPin,
    User,
    Phone,
    Plus,
    Info,
    VenusAndMars,
    Clock,
    AlertTriangle,
    Eye,
    FileText,
    Heart,
    Search,
    Download,
} from "lucide-react";
import type { PessoaDesaparecidaDTO } from "@/assets/interfaces";
import { fetchPessoaById } from "@/assets/api";
import { formatDate, getFieldValue } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import MissingInfo from "./MissingInfo";

const MissingDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [person, setPerson] = useState<PessoaDesaparecidaDTO>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (!id) {
            setError("ID da pessoa não fornecido.");
            setLoading(false);
            return;
        }

        const fetchPerson = async () => {
            try {
                const parsedId = parseInt(id, 10);
                const data = await fetchPessoaById(parsedId);
                setPerson(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Ocorreu um erro desconhecido.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPerson();
    }, [id]);

    const getStatusBadge = () => {
        if (person?.vivo) {
            return (
                <Badge className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-4 py-2">
                    <Heart className="w-4 h-4 mr-2" />
                    ENCONTRADA VIVA
                </Badge>
            );
        }
        return (
            <Badge className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-4 py-2">
                <Search className="w-4 h-4 mr-2" />
                DESAPARECIDA
            </Badge>
        );
    };

    const calculateDaysMissing = () => {
        if (!person?.ultimaOcorrencia?.dtDesaparecimento) return null;
        const disappearanceDate = new Date(person.ultimaOcorrencia.dtDesaparecimento);
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - disappearanceDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="text-muted-foreground">Carregando informações...</p>
                </div>
            </div>
        );
    }

    if (error || !person) {
        return (
            <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
                <div className="max-w-4xl mx-auto">
                    <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Voltar à Lista
                    </Button>
                    <Card className="border-destructive">
                        <CardContent className="p-8 text-center">
                            <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
                            <h2 className="text-xl font-semibold mb-2">Erro ao Carregar</h2>
                            <p className="text-muted-foreground">{error || "Pessoa não encontrada"}</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    const daysMissing = calculateDaysMissing();

    return (
        <div className="min-h-screen bg-background">
            <div>
                <main className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                        <div className="xl:col-span-3 space-y-8">
                            <Card className="border-2">
                                <CardHeader className="pb-4">
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
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
                                    <div className="flex flex-col lg:flex-row gap-8">
                                        <div className="flex-shrink-0">
                                            <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center overflow-hidden border-2 border-border">
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


                            <Card className="border-primary">

                                <CardContent className="space-y-4">
                                    {showForm ? (
                                        <MissingInfo onCancel={() => setShowForm(false)} />
                                    ) : (
                                        <div className="flex flex-col gap-4">

                                            <CardTitle className="text-lg text-primary">Como Você Pode Ajudar</CardTitle>

                                            <p className="text-sm text-muted-foreground">
                                                <strong>Suas informações podem ser cruciais!</strong> Qualquer detalhe, por menor que pareça, pode ajudar a encontrar esta pessoa.
                                            </p>
                                            <Button
                                                className="w-full font-semibold"
                                                onClick={() => setShowForm(true)}
                                            >
                                                <Plus className="w-4 h-4 mr-2" />
                                                Adicionar informações
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2 text-xl">
                                        <Info className="w-6 h-6 text-primary" />
                                        <span>Informações Detalhadas da Ocorrência</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div>
                                        <h4 className="text-lg font-bold text-foreground mb-3 flex items-center">
                                            <FileText className="w-5 h-5 mr-2" />
                                            Descrição da Ocorrência
                                        </h4>
                                        <div className="bg-muted/50 rounded-lg p-4">
                                            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                                                {person.ultimaOcorrencia.ocorrenciaEntrevDesapDTO?.informacao || "Nenhum informação disponível"}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <Separator className="my-4" />
                                        <h4 className="text-lg font-bold text-foreground mb-3 flex items-center">
                                            <Eye className="w-5 h-5 mr-2" />
                                            Roupas Usadas na Última Vez Vista
                                        </h4>
                                        <div className="bg-muted/50 rounded-lg p-4">
                                            <p className="text-foreground">
                                                {person?.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.vestimentasDesaparecido || "Nenhum informação disponível"}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="xl:col-span-1 space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2 text-xl">
                                        <FileText className="w-6 h-6 text-primary" />
                                        <span>Cartazes e Materiais de Divulgação</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {person?.ultimaOcorrencia?.listaCartaz && person.ultimaOcorrencia.listaCartaz.length > 0 ? (
                                            person.ultimaOcorrencia.listaCartaz.map((cartaz, index) => (
                                                <Button
                                                    key={index}
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => window.open(cartaz.urlCartaz, '_blank')}
                                                    className="w-full"
                                                >
                                                    <Download className="w-4 h-4 mr-2" />
                                                    Baixar Cartaz
                                                </Button>
                                            ))
                                        ) : (
                                            <p className="text-sm text-muted-foreground col-span-2">
                                                Nenhum informação disponível
                                            </p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="border-destructive">
                                <CardHeader>
                                    <CardTitle className="text-destructive flex items-center">
                                        <AlertTriangle className="w-5 h-5 mr-2" />
                                        Emergência
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm text-muted-foreground">
                                        <strong>Avistou esta pessoa?</strong> Entre em contato imediatamente com as autoridades:
                                    </p>
                                    <div className="space-y-3">
                                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                            <div className="flex items-center space-x-2 mb-1">
                                                <Phone className="w-4 h-4 text-red-600" />
                                                <span className="font-bold text-red-800">190</span>
                                            </div>
                                            <p className="text-sm text-red-700">Polícia Militar</p>
                                        </div>
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                            <div className="flex items-center space-x-2 mb-1">
                                                <Phone className="w-4 h-4 text-blue-600" />
                                                <span className="font-bold text-blue-800">197</span>
                                            </div>
                                            <p className="text-sm text-blue-700">Polícia Civil</p>
                                        </div>
                                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                            <div className="flex items-center space-x-2 mb-1">
                                                <Phone className="w-4 h-4 text-yellow-600" />
                                                <span className="font-bold text-yellow-800">180</span>
                                            </div>
                                            <p className="text-sm text-yellow-700">Disque Denúncia</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MissingDetails;