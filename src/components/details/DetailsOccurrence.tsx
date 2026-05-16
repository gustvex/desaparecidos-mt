import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Eye, FileText, Info } from "lucide-react";
import type { PessoaDesaparecidaDTO } from "@/types";
import { Separator } from "../ui/separator";
import { toTitleCase } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";

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
                    <Typography variant="h3" as="h4" className="mb-3 flex items-center">
                        <FileText className="w-5 h-5 mr-2" />
                        Descrição da Ocorrência
                    </Typography>
                    <div className="bg-muted/50 rounded-lg p-4">
                        <Typography variant="body" as="p" className="leading-relaxed whitespace-pre-wrap">
                            {toTitleCase(person.ultimaOcorrencia.ocorrenciaEntrevDesapDTO?.informacao) || "Nenhuma informação disponível"}
                        </Typography>
                    </div>
                </div>
                <div>
                    <Separator className="my-4" />
                    <Typography variant="h3" as="h4" className="mb-3 flex items-center">
                        <Eye className="w-5 h-5 mr-2" />
                        Roupas Usadas na Última Vez Vista
                    </Typography>
                    <div className="bg-muted/50 rounded-lg p-4">
                        <Typography variant="body" as="p">
                            {toTitleCase(person.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.vestimentasDesaparecido) || "Nenhuma informação disponível"}
                        </Typography>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default DetailsOccurrence;
