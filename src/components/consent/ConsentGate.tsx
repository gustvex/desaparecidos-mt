import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, GraduationCap } from "lucide-react";

const CONSENT_KEY = "lgpd-consent-v1";

const hasConsent = (): boolean => {
    try {
        return localStorage.getItem(CONSENT_KEY) !== null;
    } catch {
        return false;
    }
};

interface ConsentGateProps {
    children: React.ReactNode;
}

const ConsentGate = ({ children }: ConsentGateProps) => {
    const [accepted, setAccepted] = useState<boolean>(() => hasConsent());

    useEffect(() => {
        if (accepted) {
            document.documentElement.style.overflow = "";
        } else {
            document.documentElement.style.overflow = "hidden";
        }
        return () => {
            document.documentElement.style.overflow = "";
        };
    }, [accepted]);

    const handleAccept = () => {
        try {
            localStorage.setItem(CONSENT_KEY, new Date().toISOString());
        } catch {
            // storage indisponível (modo privado): segue em sessão
        }
        setAccepted(true);
    };

    if (accepted) return <>{children}</>;

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="consent-title"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background p-4"
        >
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <ShieldCheck className="w-8 h-8 text-primary shrink-0" aria-hidden="true" />
                        <CardTitle id="consent-title" className="text-xl sm:text-2xl">
                            Aviso de Privacidade e Finalidade Educacional
                        </CardTitle>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4 text-sm sm:text-base text-foreground">
                    <div className="flex items-start gap-2">
                        <GraduationCap className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                        <p>
                            Este site é um <strong>projeto educacional</strong> de portfólio, sem fins
                            comerciais, criado para fins de estudo e demonstração de habilidades em
                            desenvolvimento web. Os dados exibidos são consumidos da{" "}
                            <a
                                href="https://abitus-api.geia.vip"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline text-primary"
                            >
                                API pública da Polícia Judiciária Civil de Mato Grosso
                            </a>
                            .
                        </p>
                    </div>

                    <div className="space-y-2">
                        <p className="font-semibold">O que NÃO é coletado nem armazenado:</p>
                        <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                            <li>Dados pessoais do visitante (nome, e-mail, telefone, CPF, IP, etc.)</li>
                            <li>Cookies de rastreamento, analytics ou marketing</li>
                            <li>Identificadores de sessão ou fingerprinting</li>
                        </ul>
                    </div>

                    <div className="space-y-2">
                        <p className="font-semibold">O que é armazenado localmente no seu navegador:</p>
                        <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                            <li>
                                <code>lgpd-consent-v1</code> — registro deste aceite, para não exibir
                                este aviso a cada visita
                            </li>
                            <li>
                                <code>vite-ui-theme</code> — sua preferência de tema (claro / escuro)
                            </li>
                            <li>
                                <code>desaparecidos-mt-cache</code> — cache dos dados públicos da API
                                para melhorar a performance da navegação
                            </li>
                        </ul>
                        <p className="text-muted-foreground">
                            Todos esses itens ficam exclusivamente no seu dispositivo e podem ser
                            apagados a qualquer momento limpando o armazenamento do navegador.
                        </p>
                    </div>

                    <p className="text-muted-foreground">
                        Ao clicar em <strong>Aceitar e continuar</strong>, você concorda com o uso
                        descrito acima. O site só carrega seus dados públicos após o aceite.
                    </p>

                    <div className="flex justify-end pt-2">
                        <Button onClick={handleAccept} size="lg" className="font-semibold">
                            Aceitar e continuar
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ConsentGate;
