import { ArrowLeft, Users } from "lucide-react";
import { Button } from "../ui/button";
import { ModeToggle } from "./mode-toggle";
import { useLocation, useNavigate } from "react-router-dom";

const PageHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    {!isHomePage && (
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => navigate("/")}
                            className="shrink-0"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="hidden sm:inline ml-1">Voltar</span>
                        </Button>
                    )}

                    <div className="flex items-center gap-2 min-w-0">
                        <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary shrink-0" />
                        <h1 className="text-lg sm:text-2xl font-bold text-foreground truncate">
                            Desaparecidos-MT
                        </h1>
                    </div>
                </div>

                <ModeToggle />
            </div>
        </div>
    );
};

export default PageHeader;
