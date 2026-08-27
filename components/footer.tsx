export default function FooterCard(){
    return(
        <footer className="border-t border-black/10 text-black pt-5">
            <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            <div>
                <p className="text-sm font-semibold tracking-tight dark:text-white">
                    APPNOVIA
                </p>
                  <p className="mt-1 text-xs text-black dark:text-white">
                    Technology, ideas &amp; perspectives for what&apos;s next.
                  </p>
            </div>

            </div>

            <div className="mx-auto mt- max-w-7xl border-t border-black/5 pt-5 dark:border-white/5 text-end">
                <p className="text-xs text-black dark:text-white">
                © 2026 AppNovia. All rights reserved.
                </p>
            </div>  
    </footer>
    )
}