export function NoiseOverlay() {
    return (
        <div
            aria-hidden="true"
            className="fixed inset-0 pointer-events-none z-[1] opacity-[0.035] dark:opacity-[0.06]"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                backgroundRepeat: "repeat",
            }}
        />
    );
}
