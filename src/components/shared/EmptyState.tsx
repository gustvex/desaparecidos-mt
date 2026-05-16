import { Users } from "lucide-react";
import { Typography } from "@/components/ui/typography";

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
            <Typography variant="h3" className="mb-2">{title}</Typography>
            <Typography variant="body" color="muted">{description}</Typography>
        </div>
    );
};

export default EmptyState;
