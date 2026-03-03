import { portfolioData } from "@/data/portfolio";

export function CoverHeader() {
    const src = portfolioData.coverImage ?? null;

    if (!src) return null;

    return (
        <div className="w-full px-4 pt-4">
            <img
                src={src}
                alt="Cover"
                className="w-full h-48 object-cover rounded-xl select-none pointer-events-none"
                draggable={false}
            />
        </div>
    );
}
