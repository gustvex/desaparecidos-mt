import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Eye, FileText, Info } from "lucide-react";
import type { PessoaDesaparecidaDTO } from "@/assets/interfaces";
import { Separator } from "../ui/separator";

interface Props {
    person: PessoaDesaparecidaDTO;
}

const DetailsOccurrence = ({ person }: Props) => {

    return (
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
    );
};

export default DetailsOccurrence;
