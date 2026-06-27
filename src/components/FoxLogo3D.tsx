interface FoxLogo3DProps {
  className?: string
}

const DEPTH_LAYERS = 9
const DEPTH_STEP = 2.4
const FRONT_Z = 22

const LOGO_MASK_CLASS =
  "[mask-image:url('/fox-logo-gradient.png')] [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center] [-webkit-mask-image:url('/fox-logo-gradient.png')] [-webkit-mask-size:contain] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center]"

function getDepthGradient(index: number): string {
  if (index < 3) {
    return 'bg-gradient-to-br from-[#ffd080] via-[#d4822a] to-[#6b3212]'
  }

  if (index < 6) {
    return 'bg-gradient-to-br from-[#a85820] via-[#4a220c] to-[#1f0c04]'
  }

  return 'bg-gradient-to-br from-[#3a1808] via-[#120604] to-[#020101]'
}

export function FoxLogo3D({ className = '' }: FoxLogo3DProps) {
  const backZ = -(DEPTH_LAYERS + 1) * DEPTH_STEP

  return (
    <div
      className={`relative mx-auto aspect-square w-[clamp(7rem,24vw,10rem)] sm:w-36 lg:w-[clamp(9rem,16vw,13rem)] ${className}`}
    >
      <div
        className="pointer-events-none absolute -left-[18%] -top-[22%] z-0 h-[58%] w-[58%] rounded-full bg-[radial-gradient(circle,rgba(255,250,230,1)_0%,rgba(255,198,90,0.55)_38%,transparent_72%)] blur-lg [animation:fox-light-pulse_10.5s_ease-in-out_infinite]"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute left-1/2 top-[94%] h-[14%] w-[72%] -translate-x-1/2 rounded-[50%] bg-black/75 blur-2xl [animation:fox-shadow-pulse_10.5s_ease-in-out_infinite]"
        aria-hidden
      />

      <div className="relative z-10 h-full w-full overflow-hidden [perspective:520px]">
        <div
          className={`relative h-full w-full drop-shadow-[0_20px_44px_rgba(0,0,0,0.92)] drop-shadow-[0_8px_20px_rgba(232,136,48,0.5)] [transform-style:preserve-3d] [animation:fox-spin-3d_10.5s_ease-in-out_infinite] will-change-transform ${LOGO_MASK_CLASS}`}
        >
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#120604] via-[#050201] to-black"
            style={{ transform: `translateZ(${backZ}px) scale(0.94)` }}
            aria-hidden
          />

          {Array.from({ length: DEPTH_LAYERS }, (_, index) => (
            <div
              key={index}
              className={`pointer-events-none absolute inset-0 ${getDepthGradient(index)}`}
              style={{
                transform: `translateZ(${-(index + 1) * DEPTH_STEP}px) scale(${1 - index * 0.006})`,
                opacity: 0.55 + index * 0.04,
              }}
              aria-hidden
            />
          ))}

          <div
            className="pointer-events-none absolute inset-[1.5%] bg-gradient-to-br from-white/85 via-[#ffd080]/35 to-transparent"
            style={{ transform: `translateZ(${FRONT_Z - 6}px)` }}
            aria-hidden
          />

          <div
            className="absolute inset-0 [backface-visibility:hidden]"
            style={{ transform: `translateZ(${FRONT_Z}px)` }}
          >
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,#fffef5_0%,#f5c842_20%,#c97a28_50%,#4a1c08_78%,#0a0402_100%)]"
              aria-hidden
            />

            <img
              src="/fox-logo-gradient.png"
              alt="Lisa Gaming"
              className="relative z-10 h-full w-full object-contain brightness-[1.15] contrast-[1.3] saturate-[1.15]"
              draggable={false}
            />

            <div
              className="pointer-events-none absolute inset-0 z-20 opacity-40 bg-[repeating-linear-gradient(100deg,transparent_0px,transparent_3px,rgba(255,255,255,0.08)_3px,rgba(255,255,255,0.08)_4px)]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-br from-white/80 via-white/15 via-30% to-transparent to-50%"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-tl from-black/70 via-black/20 via-35% to-transparent"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 z-20 mix-blend-overlay opacity-75 bg-gradient-to-br from-[#fff8dc] via-transparent to-[#4a1c08]"
              aria-hidden
            />

            <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden" aria-hidden>
              <div className="absolute -inset-[40%] bg-[linear-gradient(115deg,transparent_38%,rgba(255,255,255,0.95)_50%,transparent_62%)] opacity-0 mix-blend-screen [animation:fox-metallic-glint_10.5s_ease-in-out_infinite]" />
            </div>

            <div
              className="pointer-events-none absolute inset-0 z-40 [filter:drop-shadow(0_2px_0_rgba(255,255,255,0.55))_drop-shadow(0_-3px_5px_rgba(0,0,0,0.65))]"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </div>
  )
}