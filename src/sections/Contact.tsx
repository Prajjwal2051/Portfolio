import { motion, useReducedMotion } from "framer-motion";
import { useState, useCallback } from "react";
import { Copy, Send } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Separator } from "@/components/ui/separator";
import { Toast } from "@/components/shared/Toast";
import { MagneticButton } from "@/components/shared/MagneticButton";

export function Contact() {
  const shouldReduce = useReducedMotion();
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState(
    "email copied to clipboard!",
  );
  const hideToast = useCallback(() => setToastVisible(false), []);

  const copyEmail = () => {
    navigator.clipboard.writeText(portfolioData.email);
    setToastMessage("email copied to clipboard!");
    setToastVisible(false);
    setTimeout(() => setToastVisible(true), 10);
  };

  return (
    <>
      <Toast message={toastMessage} visible={toastVisible} onHide={hideToast} />
      <motion.section
        id="contact"
        className="py-8 pb-16"
        aria-label="Contact"
        {...(!shouldReduce && {
          initial:     { clipPath: "inset(0 0 100% 0)" },
          whileInView: { clipPath: "inset(0 0 0% 0)" },
          viewport:    { once: true, margin: "-60px" },
          transition:  { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
        })}
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
              transition={{
                duration: 0.35,
                delay: index * 0.07,
                ease: "easeOut",
              }}
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
                    : social.href
                        .replace(/https?:\/\/(www\.)?/, "")
                        .replace(/\/$/, "")}
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

        {/* Direct email CTA */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <MagneticButton
            onClick={() =>
              window.open(
                `mailto:${portfolioData.email}?subject=Hello`,
                "_blank",
                "noopener,noreferrer",
              )
            }
            className="inline-flex items-center gap-2 border border-border/60 hover:border-foreground/40 px-4 py-2 rounded-full text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 hover:bg-muted/30"
          >
            <Send className="h-3 w-3" />
            send me an email
          </MagneticButton>
        </motion.div>
      </motion.section>
    </>
  );
}
