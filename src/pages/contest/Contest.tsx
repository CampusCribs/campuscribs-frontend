import { useState } from "react";
import { Gift, Sparkles, Ghost, CheckCircle2, ArrowRight } from "lucide-react";
import HatHouseBlack from "@/components/ui/HatHouseBlack";
import { useNavigate } from "react-router";

// Tailwind is assumed. All components are accessible and mobile-first.
// Replace the placeholder handlers (onSubmit, onCTA) with your app routes/APIs.

export default function Contest() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const form = new FormData(e.currentTarget);
      const payload = Object.fromEntries(form.entries());

      // Turn payload into URL-encoded body
      const body = new URLSearchParams(payload as Record<string, string>);

      await fetch(import.meta.env.VITE_APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // prevents CORS errors; response will be opaque
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });

      // Don't check res.ok/res.status — it's opaque in no-cors mode.
      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function onCTA() {
    const el = document.getElementById("enter-form");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-50 via-white to-white text-slate-900">
      {/* Header */}

      <div className="flex justify-between items-center p-4 sticky top-0 bg-white border-b border-slate-200 z-10">
        <div className="flex items-center gap-2">
          <div
            className="flex items-center text-2xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="flex items-center mr-2">
              <HatHouseBlack />
            </div>
            Campus Cribs
          </div>
        </div>

        <nav className="hidden sm:flex items-center gap-6 text-sm text-slate-600">
          <a href="#how" className="hover:text-slate-900">
            How it works
          </a>
          <a href="#enter-form" className="hover:text-slate-900">
            Enter
          </a>
          <a href="#rules" className="hover:text-slate-900">
            Rules
          </a>
        </nav>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28 grid md:grid-cols-2 items-center gap-10">
          <div>
            <div className="inline-flex items-center gap-2 text-sm font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
              <Sparkles className="h-4 w-4" aria-hidden />
              Halloween Contest — Limited Time
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
              Win <span className="text-amber-600">$75</span> this Halloween
            </h1>
            <p className="mt-4 text-slate-600 text-lg leading-relaxed">
              Join our campus-wide contest for student subletters. Enter your
              info and show off your Halloween-decorated listing on CampusCribs
              for a chance to win.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={onCTA}
                className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition shadow-md"
              >
                Enter Now <ArrowRight className="h-5 w-5" aria-hidden />
              </button>
              <div className="flex items-center text-sm text-slate-500">
                <Gift className="h-4 w-4 mr-2" aria-hidden />
                Prize: $75 gift card
              </div>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-slate-600" id="how">
              <li className="flex items-start gap-2">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 text-emerald-600"
                  aria-hidden
                />
                Student-focused, simple entry in under 60 seconds
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 text-emerald-600"
                  aria-hidden
                />
                Clear, transparent rules and eligibility
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 text-emerald-600"
                  aria-hidden
                />
                Verified campus listings build community trust
              </li>
            </ul>
          </div>

          <div className="relative">
            <div className="relative mx-auto max-w-md rounded-3xl border border-slate-200 bg-white shadow-xl p-6">
              <div className="flex items-center gap-3">
                <Ghost className="h-6 w-6 text-amber-600" aria-hidden />
                <p className="text-sm font-medium text-slate-700">
                  CampusCribs Halloween Showcase
                </p>
              </div>
              <div className="mt-4 h-auto rounded-2xl bg-[linear-gradient(135deg,_#FFEDD5,_#FFF7ED)] border border-amber-200 flex items-center justify-center">
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src={
                      import.meta.env.VITE_MINIO_FRONTEND_MEDIA_ENDPOINT +
                      "/HauntedHouse.png"
                    }
                    alt="Halloween decorated house"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>
              <ul className="mt-5 text-sm text-slate-600 space-y-2">
                <li className="flex gap-2">
                  <CheckCircle2
                    className="h-5 w-5 text-emerald-600"
                    aria-hidden
                  />
                  Stand out on the homepage
                </li>
                <li className="flex gap-2">
                  <CheckCircle2
                    className="h-5 w-5 text-emerald-600"
                    aria-hidden
                  />
                  Eligible for $75 contest
                </li>
                <li className="flex gap-2">
                  <CheckCircle2
                    className="h-5 w-5 text-emerald-600"
                    aria-hidden
                  />
                  It’s free to enter
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Steps / Rules */}
      <section
        id="rules"
        className="py-14 md:py-20 bg-slate-50 border-t border-b border-slate-200"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            How to Enter
          </h2>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="text-sm font-medium text-slate-500">Step 1</div>
              <p className="mt-1 text-lg font-semibold">
                Enter your information
              </p>
              <p className="mt-2 text-slate-600">
                Fill out the form below with your name, email, and listing link
                to be included in the contest.
              </p>
            </div>
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="text-sm font-medium text-slate-500">Step 2</div>
              <p className="mt-1 text-lg font-semibold">
                Sign up & post your decorated house
              </p>
              <p className="mt-2 text-slate-600">
                Create your CampusCribs account and publish a listing featuring
                your Halloween decorations.
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            No purchase necessary. One entry per student account. Student with
            the best decorated house will be chosen as the winner.
          </p>
        </div>
      </section>

      {/* Entry Form */}
      <section id="enter-form" className="py-16">
        <div className="mx-auto max-w-3xl px-4">
          <div className="rounded-3xl border border-slate-200 bg-white shadow-xl p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight">
              Enter the $75 Halloween Contest
            </h3>
            <p className="mt-2 text-slate-600">
              We’ll use your info to verify your entry and contact you if you
              win.
            </p>

            {success ? (
              <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
                Thanks! Your entry was received. Remember to sign up and post
                your decorated listing to be eligible.
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-6 grid gap-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Full name
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      required
                      className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                      placeholder="Name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Student email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                      placeholder="you@uc.edu"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="listingUrl"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Listing URL (CampusCribs)
                  </label>
                  <input
                    id="listingUrl"
                    name="listingUrl"
                    type="url"
                    required
                    className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    placeholder="https://campuscribs.org/cribs/123"
                  />
                </div>
                <div>
                  <label
                    htmlFor="notes"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Notes (optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    placeholder="Tell us about your decorations (optional)"
                  ></textarea>
                </div>
                <div className="flex items-start gap-3">
                  <input
                    id="agree"
                    name="agree"
                    type="checkbox"
                    required
                    className="mt-1 h-4 w-4 rounded border-slate-300"
                  />
                  <label htmlFor="agree" className="text-sm text-slate-600">
                    I agree to the official rules and consent to be contacted if
                    I win.
                  </label>
                </div>
                <div className="flex items-start gap-3">
                  <input id="marketing" name="marketing" type="checkbox" />
                  <label htmlFor="marketing" className="text-sm">
                    Yes, I’d like to receive updates and promotions from
                    CampusCribs.
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition shadow-md disabled:opacity-70"
                    aria-busy={submitting}
                  >
                    {submitting ? "Submitting…" : "Submit Entry"}
                  </button>
                  <a
                    href="/campus-cribs-halloween-contest-terms.pdf"
                    className="text-sm text-slate-600 hover:text-slate-900 underline underline-offset-4"
                  >
                    View full terms
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} CampusCribs. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a
              href="/campus-cribs-privacy-policy.pdf"
              className="hover:text-slate-900"
            >
              Privacy
            </a>
            <a
              href="/campus-cribs-terms-and-conditions.pdf"
              className="hover:text-slate-900"
            >
              Terms
            </a>
            <a
              href="mailto:support@campuscribs.org"
              className="hover:text-slate-900"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
