import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import {
  contactSchema,
  type ContactFormValues,
} from "@/types/contact.types";

type SubmitState = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async () => {
    setSubmitState("loading");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // For now, always succeed
    setSubmitState("success");
    reset();
  };

  if (submitState === "success") {
    return (
      <GlassPanel className="flex flex-col items-center gap-4 p-8 text-center">
        <CheckCircle size={48} className="text-green-500" />
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Message Sent!
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Thank you for reaching out. I&apos;ll get back to you as soon as
          possible.
        </p>
        <Button
          variant="glass"
          onClick={() => setSubmitState("idle")}
        >
          Send Another Message
        </Button>
      </GlassPanel>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <Input
        label="Name"
        placeholder="Your name"
        error={errors.name?.message}
        {...register("name")}
      />
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register("email")}
      />
      <TextArea
        label="Message"
        placeholder="Tell me about your project or just say hi..."
        error={errors.message?.message}
        {...register("message")}
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={submitState === "loading"}
        icon={<Send size={16} />}
        iconPosition="right"
      >
        Send Message
      </Button>

      <AnimatePresence>
        {submitState === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-2 rounded-xl bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-600 dark:text-red-400"
          >
            <AlertCircle size={16} />
            Something went wrong. Please try again later.
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
