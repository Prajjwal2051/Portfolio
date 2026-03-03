import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GitHubContributions } from "@/components/shared/GitHubContributions";
import { Separator } from "@/components/ui/separator";

export function GitHub() {
    return (
        <section id="github" className="py-8" aria-label="GitHub Contributions">
            <Separator className="mb-8 opacity-30" />
            <SectionHeading>github</SectionHeading>

            <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <GitHubContributions username="Prajjwal2051" />
            </motion.div>
        </section>
    );
}
