import { Mail, Code2, Briefcase } from "lucide-react";
import { navLinks } from "@/data/navigation.data";
import { Divider } from "@/components/ui/Divider";
import { IconButton } from "@/components/ui/IconButton";

export function Footer() {
  return (
    <footer className="mt-24">
      <Divider />
      <div className="mx-auto flex flex-col items-center gap-6 px-4 py-12 sm:px-6 lg:px-8 max-w-7xl">
        <nav
          className="flex flex-wrap justify-center gap-x-8 gap-y-2"
          aria-label="Footer navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <IconButton icon={<Mail size={16} />} label="Send email" />
          <IconButton icon={<Code2 size={16} />} label="GitHub profile" />
          <IconButton icon={<Briefcase size={16} />} label="LinkedIn profile" />
        </div>

        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          &copy; {new Date().getFullYear()} Jonad. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
