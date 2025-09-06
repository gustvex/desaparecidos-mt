
import { Card, CardContent, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import FormMissing from "./FormMissing";

interface Props {
    ocoId: number | undefined
}


const MissingInfo = ({ ocoId }: Props) => {

    const [showForm, setShowForm] = useState(false);

    return (
        <Card>
            <CardContent className="flex flex-col gap-4">
                {showForm ? (
                    <FormMissing onCancel={() => setShowForm(false)} ocoId={ocoId} />
                ) : (
                    <div className="flex flex-col gap-4">

                        <CardTitle className="text-lg text-primary">Como Você Pode Ajudar</CardTitle>

                        <p className="text-sm text-muted-foreground">
                            <strong>Suas informações podem ser cruciais!</strong> Qualquer detalhe, por menor que pareça, pode ajudar a encontrar esta pessoa.
                        </p>
                            <div>
                                <Button
                                    className="font-semibold"
                                    onClick={() => setShowForm(true)}
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Adicionar informações
                                </Button>
                       </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default MissingInfo;
