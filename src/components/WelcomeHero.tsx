import { BrandName } from './BrandName'
import { FoxLogo } from './FoxLogo'
import { StoreBenefits } from './StoreBenefits'

const foxIconClass =
  'max-w-none origin-left object-contain object-left drop-shadow-[0_6px_18px_rgba(0,0,0,0.85)] drop-shadow-[0_4px_14px_rgba(232,136,48,0.3)]'

export function WelcomeHero() {
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
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-fox-black/92 via-fox-black/55 to-fox-black/35 md:inset-y-0 md:left-0 md:w-[55%] md:bg-gradient-to-r md:from-fox-black/90 md:via-fox-black/75 md:to-transparent lg:w-[50%]"
        aria-hidden
      />

      <div className="relative z-10 flex min-h-[calc(100dvh-7.5rem)] flex-col justify-end px-5 py-6 sm:px-8 sm:py-8 md:min-h-[calc(100dvh-4.5rem)] md:justify-center lg:px-10 lg:py-10">
        <div className="flex w-full min-w-0 max-w-xl flex-col gap-6 sm:gap-7 md:max-w-2xl md:w-[52%] lg:w-[48%] lg:max-w-[34rem] lg:gap-8">
          <div className="min-w-0 space-y-4 sm:space-y-5">
            <div className="relative min-w-0 md:hidden">
              <FoxLogo
                variant="head"
                className={`pointer-events-none absolute left-0 top-1/2 h-[clamp(7rem,22vw,13rem)] w-[clamp(5.25rem,17vw,9.75rem)] -translate-y-1/2 scale-[1.18] ${foxIconClass}`}
              />
              <h1 className="relative break-words pl-[calc(clamp(5.25rem,17vw,9.75rem)*1.18+1.25rem)] text-[clamp(1.5rem,5vw,3.74rem)] font-bold leading-[1.15] tracking-tight text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.85)]">
                Добро пожаловать в <BrandName tone="orange" />
              </h1>
            </div>

            <div className="hidden min-w-0 items-center gap-5 md:flex lg:gap-6">
              <FoxLogo
                variant="head"
                className={`pointer-events-none h-[6.5rem] w-[5.5rem] shrink-0 scale-[1.12] lg:h-[7.25rem] lg:w-[6.25rem] ${foxIconClass}`}
              />
              <h1 className="min-w-0 flex-1 break-words text-[clamp(1.5rem,2.4vw,2.5rem)] font-bold leading-[1.15] tracking-tight text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.85)]">
                Добро пожаловать в <BrandName tone="orange" />
              </h1>
            </div>

            <p className="text-[clamp(0.95rem,2.8vw,1.75rem)] leading-relaxed text-gray-200/95 [text-shadow:0_2px_14px_rgba(0,0,0,0.85)] md:text-[clamp(0.95rem,1.35vw,1.25rem)]">
              <BrandName tone="orange" className="font-bold" /> — интернет-магазин компьютерной
              техники. Мы занимаемся продажей игровых и рабочих ноутбуков, а также сборкой мощных ПК
              под заказ.
            </p>
          </div>

          <StoreBenefits />
        </div>
      </div>
    </section>
  )
}