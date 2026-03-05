// Totoro-style susuwatari (soot spirits) — tiny floating orbs
const SPRITES = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    left: `${6 + (i * 7) % 90}%`,
    duration: `${12 + (i * 3.7) % 18}s`,
    delay: `${(i * 2.3) % 14}s`,
    drift: `${((i % 2 === 0 ? 1 : -1) * (20 + (i * 11) % 60))}px`,
    size: `${5 + (i * 1.3) % 6}px`,
}));

export function SootSprites() {
    return (
        <>
            {SPRITES.map((s) => (
                <span
                    key={s.id}
                    className="soot-sprite"
                    aria-hidden="true"
                    style={
                        {
                            left: s.left,
                            "--duration": s.duration,
                            "--delay": s.delay,
                            "--drift": s.drift,
                            width: s.size,
                            height: s.size,
                        } as React.CSSProperties
                    }
                />
            ))}
        </>
    );
}
