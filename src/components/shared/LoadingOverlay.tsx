import { Spinner } from "@/components/ui/shadcn-io/spinner";

const LoadingOverlay = () => (
    <div className="fixed inset-0 flex items-center justify-center">
        <Spinner variant="default" size={32} />
    </div>
);

export default LoadingOverlay;
