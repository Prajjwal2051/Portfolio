import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
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

const HASHNODE_HOST = "prajjwalsahuu.hashnode.dev";

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

const CARD_ROTATIONS = [-0.7, 0.5, -0.4, 0.8, -0.6, 0.4];

function NoteCard({
  post,
  index,
  shouldReduce,
}: {
  post: Post;
  index: number;
  shouldReduce: boolean | null;
}) {
  const rot = CARD_ROTATIONS[index % CARD_ROTATIONS.length] ?? 0;
  const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <motion.a
      href={`https://${HASHNODE_HOST}/${post.slug}`}
      target="_blank"
      rel="noreferrer"
      variants={{
        hidden: { opacity: 0, y: 20, rotate: rot * 2.5 },
        show: {
          opacity: 1,
          y: 0,
          rotate: rot,
          transition: { duration: 0.45, ease: "easeOut" },
        },
      }}
      {...(!shouldReduce && {
        whileHover: {
          rotate: 0,
          y: -5,
          boxShadow:
            "4px 8px 22px hsl(var(--foreground) / 0.11), 0 2px 4px hsl(var(--foreground) / 0.06)",
          transition: { duration: 0.2, ease: "easeOut" },
        },
      })}
      className="group relative block rounded-lg cursor-pointer select-none overflow-hidden"
      style={{
        backgroundColor: "hsl(var(--card))",
        backgroundImage: `repeating-linear-gradient(
          to bottom,
          transparent,
          transparent 23px,
          hsl(var(--border) / 0.38) 23px,
          hsl(var(--border) / 0.38) 24px
        )`,
        boxShadow:
          "2px 3px 10px hsl(var(--foreground) / 0.06), 0 1px 2px hsl(var(--foreground) / 0.03)",
        border: "1px solid hsl(var(--border) / 0.45)",
      }}
    >
      {/* Margin line */}
      <div
        className="absolute top-0 bottom-0 w-px"
        style={{ left: "36px", background: "var(--accent-pink)", opacity: 0.28 }}
      />
      {/* Hole punches */}
      <div
        className="absolute w-[11px] h-[11px] rounded-full"
        style={{
          left: "10px",
          top: "11px",
          background: "hsl(var(--background))",
          border: "1px solid hsl(var(--border) / 0.5)",
          boxShadow: "inset 0 1px 2px hsl(var(--foreground) / 0.07)",
        }}
      />
      <div
        className="absolute w-[11px] h-[11px] rounded-full"
        style={{
          left: "10px",
          top: "30px",
          background: "hsl(var(--background))",
          border: "1px solid hsl(var(--border) / 0.5)",
          boxShadow: "inset 0 1px 2px hsl(var(--foreground) / 0.07)",
        }}
      />
      {/* Content */}
      <div className="relative pl-12 pr-4 pt-3.5 pb-4">
        <p className="text-[10px] font-medium text-muted-foreground/55 uppercase tracking-widest mb-1.5">
          {date}
          {post.readTimeInMinutes ? ` · ${post.readTimeInMinutes} min` : ""}
        </p>
        <p className="text-sm font-medium leading-snug group-hover:text-accent-pink transition-colors duration-200 line-clamp-2">
          {post.title}
          <ExternalLink className="inline ml-1 h-[10px] w-[10px] opacity-0 group-hover:opacity-50 transition-opacity align-baseline" />
        </p>
        {post.brief && (
          <p className="text-xs text-muted-foreground/70 mt-1.5 line-clamp-2 leading-relaxed">
            {post.brief}
          </p>
        )}
      </div>
    </motion.a>
  );
}

export function Blog() {
  const shouldReduce = useReducedMotion();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

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
      {...(!shouldReduce && {
        initial: { clipPath: "inset(0 0 100% 0)" },
        whileInView: { clipPath: "inset(0 0 0% 0)" },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
      })}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-muted/40 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.09 } },
          }}
        >
          {posts.slice(0, 6).map((post, index) => (
            <NoteCard
              key={post.id}
              post={post}
              index={index}
              shouldReduce={shouldReduce}
            />
          ))}
        </motion.div>
      )}
    </motion.section>
  );
}
