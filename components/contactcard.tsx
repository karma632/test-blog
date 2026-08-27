"use client"

export default function ContactCard(){
    return(
    <div className="contactcard relative overflow-hidden rounded-3xl border border-black/10 bg-white p-7 text-black transition-colors sm:p-10 lg:p-12 dark:border-white/10 dark:bg-black dark:text-white">

        <div className="">

            <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.25em]">
                APPNOVIA
            </span>

            <span className="hidden text-xs text-black/40 dark:text-white/40 sm:block">
                LET&apos;S BUILD →
            </span>
            </div>

            <div className="mt-12 max-w-3xl">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Have an idea worth{" "}
                <span className="italic">building?</span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-black/60 dark:text-white/60 sm:text-base">
                Have an idea or a complex operation? Let&apos;s turn your concept
                into a practical digital solution that works.
            </p>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">

            <a
                href="/contact"
                className="inline-flex w-fit items-center rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80"
            >
                Let&apos;s talk
                <span className="ml-2 transition-transform group-hover:translate-x-1">
                →
                </span>
            </a>

            <span className="text-xs text-black/40 dark:text-white/40">
                Ideas · Strategy · Technology
            </span>

            </div>

        </div>

    </div>
    )
}