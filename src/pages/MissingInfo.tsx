import { submitInformacao } from '@/assets/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "sonner"

export default function MissingInfo() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [informacao, setInformacao] = useState('');
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState('');
    const [files, setFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!id || !informacao || !data || !descricao) {
            toast.error('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        setIsSubmitting(true);
        try {
            const payload = {
                ocorrenciaId: Number(id),
                informacao,
                descricao,
                data: new Date(data),
                files,
            };

            await submitInformacao(payload);

            toast.success('Informação enviada com sucesso!');
            navigate(`/pessoa/${id}`);
        } catch (error) {
            console.error(error);
            toast.error('Falha ao enviar a informação. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    return (
        <div className="min-h-screen bg-background">
         
            <div className="p-4 md:p-8 lg:p-12 max-w-2xl mx-auto">
                <Card className="border-primary">
                    <CardHeader>
                        <CardTitle className="text-xl text-primary">Adicionar Novas Informações</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <p className="text-sm text-muted-foreground">
                            Sua contribuição é muito importante. Utilize o formulário abaixo para enviar qualquer informação sobre a pessoa desaparecida.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="informacao">Localização e Detalhes da Avistagem *</Label>
                                <Textarea
                                    id="informacao"
                                    value={informacao}
                                    onChange={(e) => setInformacao(e.target.value)}
                                    placeholder="Ex: Vi a pessoa no parque central, usando uma camisa azul e parecia estar bem."
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="data">Data da Avistagem *</Label>
                                    <Input
                                        id="data"
                                        type="date"
                                        value={data}
                                        onChange={(e) => setData(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="anexos">Anexar Fotos</Label>
                                    <Input
                                        id="anexos"
                                        type="file"
                                        multiple
                                        onChange={handleFileChange}
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">Anexe fotos da pessoa ou do local. (Opcional)</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="descricao">Descrição do Anexo *</Label>
                                <Input
                                    id="descricao"
                                    type="text"
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                    placeholder="Ex: Fotos tiradas no parque em 20/03/2024"
                                    required
                                />
                            </div>

                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? 'Enviando...' : 'Enviar Informações'}
                            </Button>
                        </form>
                       
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
