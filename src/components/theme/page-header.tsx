import { ArrowLeft, Users } from "lucide-react";
import { Button } from "../ui/button";
import { ModeToggle } from "./mode-toggle";
import { useLocation, useNavigate } from "react-router-dom";

const PageHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    return (
        <div className="top-0 w-full border-b">
            <div className="container mx-auto p-4 flex items-center justify-between">
                {!isHomePage &&
                    <div className="flex gap-4">
                        <Button
                            onClick={() => navigate("/")}
                            className="flex items-center"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Voltar
                        </Button>

                        <div className="flex items-center gap-4">
                            <Users className="w-8 h-8 text-primary" />
                            <h1 className="text-3xl font-bold text-foreground">
                                Desaparecidos-MT
                            </h1>
                        </div>

                    </div>
                }

                {isHomePage && <div className="flex items-center gap-4">
                    <Users className="w-8 h-8 text-primary" />
                    <h1 className="text-3xl font-bold text-foreground">
                        Desaparecidos-MT
                    </h1>
                </div>}



                <ModeToggle />
            </div>
        </div>
    );
};

export default PageHeader;