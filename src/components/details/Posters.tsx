import type { PessoaDesaparecidaDTO } from "@/types";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Download, FileText } from "lucide-react";

interface Props {
    person: PessoaDesaparecidaDTO;
}

const Posters = ({ person }: Props) => {

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-xl">
                    <FileText className="w-6 h-6 text-primary" />
                    <span>Cartazes</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-2">
                    {person?.ultimaOcorrencia?.listaCartaz && person.ultimaOcorrencia.listaCartaz.length > 0 ? (
                        person.ultimaOcorrencia.listaCartaz.map((cartaz, index) => (
                            <Button
                                key={index}
                                variant="outline"
                                size="lg"
                                onClick={() => window.open(cartaz.urlCartaz, '_blank')}
                                className="w-full justify-center"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Baixar Cartaz
                            </Button>
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            Nenhum informação disponível
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default Posters;
