import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registry",
  robots: { index: false, follow: false },
};

export default function RegistryPage() {
  return (
    <main className="mx-auto flex w-full min-w-0 max-w-md flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="text-4xl">Registry</h1>
      <p className="mt-6 text-lg leading-8">Nothing is listed yet.</p>
    </main>
  );
}
