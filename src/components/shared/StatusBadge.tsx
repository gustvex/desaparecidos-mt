import { Badge } from "@/components/ui/badge";
import type { UltimaOcorrenciaDTO } from "@/assets/interfaces";

interface StatusBadgeProps {
    vivo: boolean;
    ultimaOcorrencia?: UltimaOcorrenciaDTO;
}

const StatusBadge = ({ vivo, ultimaOcorrencia }: StatusBadgeProps) => {
    if (ultimaOcorrencia?.dataLocalizacao) {
        if (vivo) {
            return <Badge className="bg-green-600 hover:bg-green-700 text-white font-bold text-md">Localizada Viva</Badge>;
        }
        return <Badge className="bg-red-600 hover:bg-red-700 text-white font-bold text-md">Localizada Morta</Badge>;
    }
    return <Badge className="bg-red-600 hover:bg-red-700 text-white font-bold text-md">Desaparecida</Badge>;
};

export default StatusBadge;
