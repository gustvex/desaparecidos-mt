import { useEffect } from "react";
import { useParams } from "react-router-dom";
import type { PessoaDesaparecidaDTO } from "@/types";
import { fetchPessoaById } from "@/services/api";
import CardPerson from "@/components/details/PersonCardDetails";
import FormMissing from "@/components/details/FormMissing";
import DetailsOccurrence from "@/components/details/DetailsOccurrence";
import Emergency from "@/components/details/Emergency";
import Posters from "@/components/details/Posters";
import PersonDetailsSkeleton from "@/components/details/PersonDetailsSkeleton";
import { useFetchData } from "@/lib/hooks/useFetchData";
import EmptyState from "@/components/shared/EmptyState";
import { calculateDaysMissing } from "@/lib/utils";

const MissingDetails = () => {
    const { id } = useParams<{ id: string }>();

    const {
        data: person,
        loading,
        error,
        fetchData
    } = useFetchData<PessoaDesaparecidaDTO, [number]>(fetchPessoaById, parseInt(id!, 10));

    useEffect(() => {
        if (!id || isNaN(parseInt(id, 10))) return;
        fetchData(parseInt(id, 10));
    }, [id, fetchData]);

    const daysMissing = calculateDaysMissing(person?.ultimaOcorrencia?.dtDesaparecimento);

    return (
        <div className="flex flex-col">
            {loading && <PersonDetailsSkeleton />}

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

            {!loading && error && !person && (
                <EmptyState description="Não foi possível carregar os dados. Tente novamente mais tarde." />
            )}
        </div>
    );
};

export default MissingDetails;
