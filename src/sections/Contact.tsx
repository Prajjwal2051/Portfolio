import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Separator } from "@/components/ui/separator";

export function Contact() {
  return (
    <section id="contact" className="py-8 pb-16" aria-label="Contact">
      <Separator className="mb-8 opacity-30" />
      <SectionHeading>contact</SectionHeading>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        {portfolioData.socials.map((social, index) => (
          <motion.div
            key={social.label}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.06 }}
          >
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-baseline gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="text-foreground">{social.label}</span>
              <span className="text-muted-foreground">-&gt;</span>
              <span className="group-hover:text-accent-pink transition-colors">
                {social.label === "email"
                  ? portfolioData.email
                  : social.href.replace(/https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
              </span>
            </a>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
