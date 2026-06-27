import { BrandName } from './BrandName'
import { FoxLogo } from './FoxLogo'

export function AboutHero() {
  return (
    <section className="relative w-full min-w-0 overflow-x-clip overflow-hidden min-h-[calc(100dvh-7.5rem)] md:min-h-[calc(100dvh-4.5rem)]">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-fox-black/75 via-fox-black/50 to-fox-black/85"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.35)_52%,rgba(10,10,10,0.88)_100%)]"
        aria-hidden
      />

      <div className="relative z-10 flex min-h-[calc(100dvh-7.5rem)] flex-col items-center justify-center px-5 py-10 text-center sm:px-8 sm:py-14 md:min-h-[calc(100dvh-4.5rem)]">
        <FoxLogo
          variant="head"
          className="h-[clamp(8rem,42vw,22.95rem)] w-[clamp(8rem,42vw,22.95rem)] object-contain drop-shadow-[0_10px_28px_rgba(0,0,0,0.85)] drop-shadow-[0_4px_16px_rgba(232,136,48,0.35)]"
        />

        <p className="mt-6 w-full max-w-4xl text-[clamp(1.35rem,4.5vw,4.2rem)] font-semibold leading-[1.12] tracking-tight text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.9)] sm:mt-8 lg:max-w-5xl">
          <BrandName tone="orange" className="font-bold" /> — интернет-магазин техники с 2015 года
        </p>

        <div
          className="mt-6 h-1.5 w-32 rounded-full bg-gradient-to-r from-[#f8ce46] via-[#e18830] to-[#c83c21] shadow-[0_2px_10px_rgba(232,136,48,0.45)] sm:mt-8"
          aria-hidden
        />
      </div>
    </section>
  )
}