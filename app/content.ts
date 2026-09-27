/** Guest arrival time: the ceremony appointment plus 15 minutes. */
export const guestArrivalTime: string | null = null;

export const faqs = [
  {
    question: "What should I wear?",
    answer: "Cool and comfy.",
  },
  {
    question: "Do I need to come to the ceremony?",
    answer:
      "No. The ceremony is very optional, but we would love for you to make the evening dinner.",
  },
  {
    question: "When will we know all the details?",
    answer: "Fingers crossed, the week of October 19th.",
  },
] as const;

export const guests = [
  "Lauren",
  "Richard",
  "Leah",
  "Winner",
  "Danielle",
  "Dave",
  "Shirley",
  "Jack",
  "Ed",
  "Carolyn",
  "Lucia",
  "Sam",
] as const;

export type Guest = (typeof guests)[number];

export function isGuest(name: string): name is Guest {
  return (guests as readonly string[]).includes(name);
}
