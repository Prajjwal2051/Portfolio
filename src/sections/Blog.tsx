import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Separator } from "@/components/ui/separator";
import { ExternalLink } from "lucide-react";

interface Post {
    id: string;
    title: string;
    brief: string;
    slug: string;
    publishedAt: string;
    readTimeInMinutes?: number;
    coverImage?: { url: string };
}

const HASHNODE_HOST = "why-i-switched-to-fedora-and-hyprland.hashnode.dev";

async function fetchHashnodePosts(): Promise<Post[]> {
    const query = `
    query {
      publication(host: "${HASHNODE_HOST}") {
        posts(first: 10) {
          edges {
            node {
              id
              title
              brief
              slug
              publishedAt
              readTimeInMinutes
              coverImage { url }
            }
          }
        }
      }
    }
  `;
    const res = await fetch("https://gql.hashnode.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
    });
    const json = await res.json();
    const edges: { node: Post }[] = json?.data?.publication?.posts?.edges ?? [];
    return edges.map((e) => e.node);
}

export function Blog() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useSpring(useTransform(scrollYProgress, [0, 0.3], [40, 0]), { stiffness: 80, damping: 20 });
    const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    useEffect(() => {
        fetchHashnodePosts()
            .then(setPosts)
            .catch(() => setPosts([]))
            .finally(() => setLoading(false));
    }, []);

    if (!loading && posts.length === 0) return null;

    return (
        <motion.section
            id="blog"
            className="py-8"
            aria-label="Blog"
            ref={ref}
            style={{ opacity, y }}
        >
            <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <Separator className="mb-8 opacity-30" />
            </motion.div>
            <SectionHeading>writing</SectionHeading>

            {loading ? (
                <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-10 bg-muted/40 rounded animate-pulse" />
                    ))}
                </div>
            ) : (
                <motion.div
                    className="space-y-0"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
                >
                    {posts.slice(0, 5).map((post) => (
                        <motion.a
                            key={post.id}
                            href={`https://${HASHNODE_HOST}/${post.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            variants={{
                                hidden: { opacity: 0, y: 14 },
                                show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
                            }}
                            whileHover={{ x: 4, transition: { duration: 0.2 } }}
                            className="flex items-baseline justify-between gap-4 py-3 border-b border-border/30 last:border-0 group"
                        >
                            <div className="min-w-0">
                                <p className="text-sm font-medium group-hover:text-accent-pink transition-colors truncate">
                                    {post.title}{" "}
                                    <ExternalLink className="inline h-2.5 w-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </p>
                                {post.brief && (
                                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                                        {post.brief}
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center gap-2 shrink-0 text-[10px] text-muted-foreground/50">
                                {post.readTimeInMinutes && <span>{post.readTimeInMinutes} min</span>}
                                <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
                            </div>
                        </motion.a>
                    ))}
                </motion.div>
            )}
        </motion.section>
    );
}
