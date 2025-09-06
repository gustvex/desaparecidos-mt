import { ModeToggle } from "@/components/theme/mode-toggle";
import { Users } from "lucide-react";

const PageHeader = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between">
                <div className="flex items-center gap-4">
                    <Users className="w-8 h-8 text-primary" />
                    <h1 className="text-3xl font-bold text-foreground">Pessoas Desaparecidas</h1>
                </div>
                <div className="flex items-center">
                    <ModeToggle />
                </div>
            </div>
            <p className="text-foreground">
                Consulte informações sobre pessoas desaparecidas ou já localizadas.
            </p>
        </div>
    );
};

export default PageHeader;
