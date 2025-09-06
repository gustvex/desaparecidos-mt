import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { AlertTriangle, Phone } from "lucide-react";

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
                <p className="text-sm text-muted-foreground">
                    <strong>Avistou esta pessoa?</strong> Entre em contato imediatamente com as autoridades:
                </p>
                <div className="space-y-3">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                            <Phone className="w-4 h-4 text-red-600" />
                            <span className="font-bold text-red-800">190</span>
                        </div>
                        <p className="text-sm text-red-700">Polícia Militar</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                            <Phone className="w-4 h-4 text-blue-600" />
                            <span className="font-bold text-blue-800">197</span>
                        </div>
                        <p className="text-sm text-blue-700">Polícia Civil</p>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                            <Phone className="w-4 h-4 text-yellow-600" />
                            <span className="font-bold text-yellow-800">180</span>
                        </div>
                        <p className="text-sm text-yellow-700">Disque Denúncia</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default Emergency;
