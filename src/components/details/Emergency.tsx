import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { AlertTriangle, Phone } from "lucide-react";
import { Typography } from "@/components/ui/typography";

const Emergency = () => {

    return (
        <Card className="border-destructive">
            <CardHeader>
                <CardTitle className="text-destructive flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Emergência
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Typography variant="body" color="muted" as="p">
                    <strong>Avistou esta pessoa?</strong> Entre em contato imediatamente com as autoridades:
                </Typography>
                <div className="space-y-3">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                            <Phone className="w-4 h-4 text-red-600" />
                            <Typography variant="label" as="span" className="text-red-800">190</Typography>
                        </div>
                        <Typography variant="small" as="p" className="text-red-700">Polícia Militar</Typography>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                            <Phone className="w-4 h-4 text-blue-600" />
                            <Typography variant="label" as="span" className="text-blue-800">197</Typography>
                        </div>
                        <Typography variant="small" as="p" className="text-blue-700">Polícia Civil</Typography>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                            <Phone className="w-4 h-4 text-yellow-600" />
                            <Typography variant="label" as="span" className="text-yellow-800">180</Typography>
                        </div>
                        <Typography variant="small" as="p" className="text-yellow-700">Disque Denúncia</Typography>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default Emergency;
