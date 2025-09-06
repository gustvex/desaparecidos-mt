import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { ModeToggle } from "./mode-toggle";
import { useNavigate } from "react-router-dom";
const PageHeader = () => {
    const navigate = useNavigate();
    return (
        <div className="top-0 w-full border border-b">
            <div className="flex container mx-auto justify-between p-4">
                <div className="flex items-center">
                    <Button
                        onClick={() => navigate("/")}
                        className=" "
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Voltar
                    </Button>
                </div>
                <div className="flex items-center">
                    <ModeToggle />
                </div>

            </div>
        </div>
    );
};

export default PageHeader;
