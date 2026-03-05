import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { Copy, Send } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Separator } from "@/components/ui/separator";
import { Toast } from "@/components/shared/Toast";
import { MagneticButton } from "@/components/shared/MagneticButton";

// Replace YOUR_FORM_ID with your Formspree form ID after creating one at formspree.io
const FORMSPREE_ID = "YOUR_FORM_ID";

export function Contact() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useSpring(useTransform(scrollYProgress, [0, 0.3], [40, 0]), { stiffness: 80, damping: 20 });
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("email copied to clipboard!");
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const hideToast = useCallback(() => setToastVisible(false), []);

  const copyEmail = () => {
    navigator.clipboard.writeText(portfolioData.email);
    setToastMessage("email copied to clipboard!");
    setToastVisible(false);
    setTimeout(() => setToastVisible(true), 10);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (FORMSPREE_ID === "YOUR_FORM_ID") {
      setToastMessage("set up formspree.io to enable form submissions!");
      setToastVisible(false);
      setTimeout(() => setToastVisible(true), 10);
      return;
    }
    setFormStatus("sending");
    const form = e.currentTarget;
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setFormStatus("sent");
        form.reset();
        setToastMessage("message sent! i'll get back to you soon.");
        setToastVisible(false);
        setTimeout(() => setToastVisible(true), 10);
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <>
      <Toast message={toastMessage} visible={toastVisible} onHide={hideToast} />
      <motion.section
        id="contact"
        className="py-8 pb-16"
        aria-label="Contact"
        ref={ref}
        style={{ opacity, y }}
      >
        <Separator className="mb-8 opacity-30" />
        <SectionHeading>contact</SectionHeading>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-2 mb-8"
        >
          {portfolioData.socials.map((social, index) => (
            <motion.div
              key={social.label}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.07, ease: "easeOut" }}
              whileHover={{ x: 6, transition: { duration: 0.2 } }}
              className="flex items-center gap-2"
            >
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-baseline gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="text-foreground">{social.label}</span>
                <span className="text-muted-foreground">→</span>
                <span className="group-hover:text-accent-pink transition-colors">
                  {social.label === "email"
                    ? portfolioData.email
                    : social.href.replace(/https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                </span>
              </a>
              {social.label === "email" && (
                <button
                  onClick={copyEmail}
                  className="ml-1 text-muted-foreground/50 hover:text-foreground transition-colors"
                  aria-label="Copy email"
                >
                  <Copy className="h-3 w-3" />
                </button>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Contact form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="space-y-3 max-w-sm"
        >
          <div className="space-y-2">
            <input
              type="text"
              name="name"
              required
              placeholder="your name"
              className="w-full bg-transparent border border-border/50 focus:border-foreground/40 rounded-lg px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground/40"
            />
            <input
              type="email"
              name="email"
              required
              placeholder="your email"
              className="w-full bg-transparent border border-border/50 focus:border-foreground/40 rounded-lg px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground/40"
            />
            <textarea
              name="message"
              required
              rows={4}
              placeholder="your message..."
              className="w-full bg-transparent border border-border/50 focus:border-foreground/40 rounded-lg px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground/40 resize-none"
            />
          </div>
          <MagneticButton
            type="submit"
            disabled={formStatus === "sending" || formStatus === "sent"}
            className="inline-flex items-center gap-2 border border-border/60 hover:border-foreground/40 px-4 py-2 rounded-full text-sm text-muted-foreground hover:text-foreground transition-all duration-200 hover:bg-muted/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-3 w-3" />
            {formStatus === "sending"
              ? "sending..."
              : formStatus === "sent"
                ? "sent!"
                : "send message"}
          </MagneticButton>
          {formStatus === "error" && (
            <p className="text-xs text-red-400">something went wrong. try again?</p>
          )}
        </motion.form>
      </motion.section>
    </>
  );
}
