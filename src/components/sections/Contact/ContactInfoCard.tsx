import { Mail, Code2, Briefcase, MapPin } from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { IconButton } from "@/components/ui/IconButton";

export function ContactInfoCard() {
  return (
    <GlassPanel className="flex flex-col items-center gap-6 p-8 text-center lg:items-start lg:text-left">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        Get In Touch
      </h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        I&apos;m always open to new opportunities, collaborations, or just a
        friendly chat. Feel free to reach out!
      </p>

      <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
        <MapPin size={16} className="text-brand-500 shrink-0" />
        <span>Available for remote work worldwide</span>
      </div>

      <div className="flex gap-3">
        <IconButton
          icon={<Mail size={18} />}
          label="Send email"
        />
        <IconButton
          icon={<Code2 size={18} />}
          label="GitHub profile"
        />
        <IconButton
          icon={<Briefcase size={18} />}
          label="LinkedIn profile"
        />
      </div>

      <div className="w-full border-t border-glass-light-border dark:border-glass-dark-border pt-4">
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          Email: hello@jonad.dev
        </p>
      </div>
    </GlassPanel>
  );
}
