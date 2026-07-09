import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function HeroCTA() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Button
        variant="primary"
        size="lg"
        icon={<ArrowRight size={18} />}
        iconPosition="right"
      >
        View My Work
      </Button>
      <Button
        variant="glass"
        size="lg"
        icon={<Download size={18} />}
      >
        Download Resume
      </Button>
    </div>
  );
}
