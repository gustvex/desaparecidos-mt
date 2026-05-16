import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPessoaById } from "@/services/api";
import CardPerson from "@/components/details/PersonCardDetails";
import FormMissing from "@/components/details/FormMissing";
import DetailsOccurrence from "@/components/details/DetailsOccurrence";
import Emergency from "@/components/details/Emergency";
import Posters from "@/components/details/Posters";
import PersonDetailsSkeleton from "@/components/details/PersonDetailsSkeleton";
import EmptyState from "@/components/shared/EmptyState";
import { calculateDaysMissing } from "@/lib/utils";

const MissingDetails = () => {
    const { id } = useParams<{ id: string }>();
    const personId = id ? parseInt(id, 10) : NaN;
    const enabled = Number.isInteger(personId) && personId > 0;

    const { data: person, isLoading, isError } = useQuery({
        queryKey: ["pessoa", personId],
        queryFn: () => fetchPessoaById(personId),
        enabled,
    });

    const daysMissing = calculateDaysMissing(person?.ultimaOcorrencia?.dtDesaparecimento);

    if (isLoading) return <PersonDetailsSkeleton />;

    if (isError || !person) {
        return <EmptyState description="Não foi possível carregar os dados. Tente novamente mais tarde." />;
    }

    return (
        <div className="flex flex-col">
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
        </div>
    );
};

export default MissingDetails;
