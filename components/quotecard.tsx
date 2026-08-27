import Link from "next/link";
import Image from "next/image";

export default function QuoteCard (){
  return(
    <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">

      <div className="space-y-6 grid-text">
        <h1 className="max-w-2xl text-4xl font-semibold leading-[0.95] tracking-tight lg:text-5xl novia-text byc">
          New feel to how blogs are presented
        </h1>
        <p className="max-w-xl text-lg leading-8 text-black/70 dark:text-white/30">
          Discover thoughtful essays, design notes, and clean thinking curated for readers who prefer clarity over noise.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/posts"
            className="rounded-full bg-black px-6 py-3 text-center text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            Start reading
          </Link>
        </div>
      </div>

      <div className="relative h-[420px] overflow-hidden rounded-3xl">
        <Image
          src="/writerpic.jpg"
          alt="Technology"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute bottom-0 p-6 text-white">
          <p className="text-xs uppercase tracking-widest text-blue-300">
            Quote of the day
          </p>

          <h2 className="mt-2 text-1xl font-semibold">
            Any sufficiently advanced technology is indistinguishable from magic.
          </h2>

          <p className="mt-2 text-sm text-white/70">
            — Arthur C. Clarke
          </p>
        </div>
      </div>

    </div>
  )
}