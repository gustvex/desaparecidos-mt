import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Users,
} from "lucide-react";
import type { PessoaDesaparecidaDTO } from "@/assets/interfaces";
import { fetchPessoaById } from "@/assets/api";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import CardPerson from "@/components/details/CardPerson";
import FormMissing from "@/components/details/MissingInfo";
import DetailsOccurrence from "@/components/details/DetailsOccurrence";
import Emergency from "@/components/details/Emergency";
import Posters from "@/components/details/Posters";
import { useFetchData } from "@/lib/hooks/useFetchData";


const MissingDetails = () => {
    const { id } = useParams<{ id: string }>();

    const {
        data: person,
        loading,
        error,
        fetchData
    } = useFetchData<PessoaDesaparecidaDTO, [number]>(fetchPessoaById, parseInt(id!, 10));

    useEffect(() => {
        if (!id || isNaN(parseInt(id, 10))) {
            return;
        }
        fetchData(parseInt(id, 10));
    }, [id, fetchData]);

    const calculateDaysMissing = () => {
        if (!person?.ultimaOcorrencia?.dtDesaparecimento) return null;
        const disappearanceDate = new Date(person.ultimaOcorrencia.dtDesaparecimento);
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - disappearanceDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const daysMissing = calculateDaysMissing();

    return (
        <div className="flex flex-col ">
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <Spinner variant="default" size={32} />
                </div>
            )}

            {!loading && !error && person && (
                <div className="container mx-auto grid grid-cols-1 xl:grid-cols-4 gap-6">
                    <div className="xl:col-span-3 space-y-8">
                        <CardPerson person={person} daysMissing={daysMissing} />
                        <FormMissing ocoId={person.ultimaOcorrencia.ocoId} />
                        <DetailsOccurrence person={person} />
                    </div>

                    <div className="xl:col-span-1 space-y-6">
                        <Posters person={person} />
                        <Emergency />
                    </div>
                </div>
            )}

            {!loading && !error && !person && (
                <div className="text-center py-12">
                    <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                        Nenhuma pessoa encontrada
                    </h3>
                    <p className="text-muted-foreground">
                        Tente ajustar os filtros de busca ou consulte novamente mais tarde.
                    </p>
                </div>
            )}
        </div>
    );
};

export default MissingDetails;
