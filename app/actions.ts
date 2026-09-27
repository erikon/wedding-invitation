"use server";

import { isGuest } from "./content";

export type RsvpState = {
  status: "idle" | "success" | "error";
  message: string;
};

function answer(value: FormDataEntryValue | null) {
  return value === "yes" || value === "no" ? value : null;
}

export async function submitRsvp(
  _previous: RsvpState,
  formData: FormData,
): Promise<RsvpState> {
  const name = String(formData.get("name") ?? "");
  const dinner = answer(formData.get("dinner"));
  const ceremony = answer(formData.get("ceremony"));

  if (!isGuest(name)) {
    return {
      status: "error",
      message: "Please choose your name from the list.",
    };
  }

  if (!dinner) {
    return {
      status: "error",
      message: "Please tell us if you can make dinner.",
    };
  }

  if (!ceremony) {
    return {
      status: "error",
      message: "Please tell us if you will come to the ceremony.",
    };
  }

  const url = process.env.RSVP_SHEET_URL;
  if (!url) {
    return {
      status: "error",
      message: "Replies are not connected yet. Please try again later.",
    };
  }

  try {
    const response = await postRsvp(url, { name, dinner, ceremony });
    if (!response.ok) {
      return {
        status: "error",
        message: "We could not save your reply. Please try again.",
      };
    }
  } catch {
    return {
      status: "error",
      message: "We could not save your reply. Please try again.",
    };
  }

  return { status: "success", message: "Thank you. We have your reply." };
}

async function postRsvp(url: string, body: Record<string, string>) {
  const payload = JSON.stringify(body);
  const init = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
  } as const;

  const first = await fetch(url, { ...init, redirect: "manual" });
  if (first.status === 301 || first.status === 302) {
    // The reply is saved when Apps Script redirects. Following that redirect
    // only waits on a slow result page, so treat the redirect as success.
    return new Response(null, { status: 200 });
  }

  return first;
}
