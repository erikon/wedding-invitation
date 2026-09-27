import Image from "next/image";
import { faqs, guestArrivalTime } from "./content";
import { RsvpForm } from "./rsvp-form";

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
        <p>
          The ceremony will be at the NYC City Hall Marriage Bureau, 141 Worth
          St, New York, NY 10007. You’re welcome to come, though it’s completely
          optional.
        </p>
        <p>
          {guestArrivalTime
            ? `Please arrive at ${guestArrivalTime}.`
            : "We’ll share the time once the appointment is set. Plan to arrive 15 minutes after it."}
        </p>
        <p className="text-2xl italic">Love, Vicki + Eric</p>
      </div>

      <section className="mt-12 w-full max-w-sm text-left">
        <h2 className="text-center text-2xl">FAQ</h2>
        <div className="mt-6 border-t border-current/25 text-lg">
          {faqs.map((item) => (
            <details key={item.question} className="group border-b border-current/25">
              <summary className="cursor-pointer list-none py-4 text-xl [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-4">
                  {item.question}
                  <span
                    aria-hidden="true"
                    className="text-2xl leading-none transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="pb-4 leading-8">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-12 w-full max-w-sm">
        <h2 className="text-2xl">RSVP</h2>
        <div className="mt-6">
          <RsvpForm />
        </div>
      </section>

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
