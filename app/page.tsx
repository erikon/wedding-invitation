import Image from "next/image";

export default function Home() {
  return (
    <main className="mx-auto flex w-full min-w-0 max-w-md flex-1 flex-col items-center px-6 py-12 text-center sm:py-16">
      <h1 className="sr-only">Eric and Vicki</h1>
      <Image
        src="/invitation-front.jpg"
        alt="Illustration of Eric and Vicki sharing pizza, titled Eric and Vicki, November 2026."
        width={732}
        height={1024}
        priority
        className="h-auto w-full max-w-full"
        sizes="(max-width: 28rem) 100vw, 28rem"
      />
      <div className="mt-12 max-w-sm space-y-6 text-lg leading-8">
        <p className="text-2xl leading-snug sm:text-3xl">
          We would love to have you join us for our tiny wedding.
        </p>
        <p>
          We’re getting married in November 2026. The exact day, and the dinner
          afterward, are still being set. We’ll share them here as soon as we
          know.
        </p>
        <p className="text-2xl italic">Love, Vicki + Eric</p>
      </div>
      <Image
        src="/invitation-babies.jpg"
        alt="Childhood photo of Vicki and Eric. Speech bubbles say Please come and See you there."
        width={732}
        height={464}
        className="mt-12 h-auto w-full max-w-full"
      />
    </main>
  );
}
