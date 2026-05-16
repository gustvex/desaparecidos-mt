import { Users } from "lucide-react";

interface EmptyStateProps {
    title?: string;
    description?: string;
}

const EmptyState = ({
    title = "Nenhuma pessoa encontrada",
    description = "Tente ajustar os filtros de busca ou consulte novamente mais tarde.",
}: EmptyStateProps) => {
    return (
        <div className="text-center py-12">
            <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
        </div>
    );
};

export default EmptyState;
