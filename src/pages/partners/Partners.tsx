import {
  Building2,
  GraduationCap,
  Handshake,
  TrendingUp,
  ShieldCheck,
  Users,
  ArrowRight,
  CheckCircle2,
  Mail,
  MapPin,
} from "lucide-react";
import HatHouseBlack from "@/components/ui/HatHouseBlack";
import { useNavigate } from "react-router";
import Footer from "@/components/layout/Footer";

// Static Partners page for a student subleasing platform
// TailwindCSS assumed. Replace CTA routes with your app's actual routes.

export default function Partners() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-white to-white text-slate-900">
      {/* Header */}
      <header className="flex justify-between items-center p-4 sticky top-0 bg-white/90 backdrop-blur border-b border-slate-200 z-10">
        <div
          className="flex items-center text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="mr-2 flex items-center">
            <HatHouseBlack />
          </span>
          Campus Cribs
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-slate-600">
          <a href="#why" className="hover:text-slate-900">
            Why partner
          </a>
          <a href="#types" className="hover:text-slate-900">
            Partner types
          </a>
          <a href="#how" className="hover:text-slate-900">
            How it works
          </a>
          <a href="#impact" className="hover:text-slate-900">
            Impact
          </a>
          <a href="#apply" className="hover:text-slate-900">
            Apply
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-sm font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-full px-3 py-1">
              <Handshake className="h-4 w-4" aria-hidden />
              Partner with Campus Communities
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
              Help students find housing. Grow your impact.
            </h1>
            <p className="mt-4 text-slate-600 text-lg leading-relaxed">
              Join universities, student organizations, landlords, and local
              businesses building a safer, more affordable subleasing ecosystem.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  const el = document.getElementById("apply");
                  el?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition shadow-md"
              >
                Apply to partner <ArrowRight className="h-5 w-5" aria-hidden />
              </button>
              <button
                onClick={() => navigate("/browse")}
                className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-slate-900 border border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-300 transition"
              >
                Explore listings
              </button>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-slate-600" id="why">
              <li className="flex items-start gap-2">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 text-emerald-600"
                  aria-hidden
                />
                Student-first housing marketplace built for off-cycle needs
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 text-emerald-600"
                  aria-hidden
                />
                Verified accounts, content moderation, and privacy by design
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 text-emerald-600"
                  aria-hidden
                />
                Analytics & insights to support planning and outreach
              </li>
            </ul>
          </div>

          <div className="relative">
            <div className="relative mx-auto max-w-md rounded-3xl border border-slate-200 bg-white shadow-xl p-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-indigo-600" aria-hidden />
                <p className="text-sm font-medium text-slate-700">
                  Win–Win Partnerships
                </p>
              </div>
              <div className="mt-4 aspect-video rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200 flex items-center justify-center">
                <div className="text-sm text-slate-500">
                  Showcase your brand to local students
                </div>
              </div>
              <ul className="mt-5 text-sm text-slate-600 space-y-2">
                <li className="flex gap-2">
                  <CheckCircle2
                    className="h-5 w-5 text-emerald-600"
                    aria-hidden
                  />{" "}
                  Targeted campus visibility
                </li>
                <li className="flex gap-2">
                  <CheckCircle2
                    className="h-5 w-5 text-emerald-600"
                    aria-hidden
                  />{" "}
                  Events, ambassadors, and co-branded campaigns
                </li>
                <li className="flex gap-2">
                  <CheckCircle2
                    className="h-5 w-5 text-emerald-600"
                    aria-hidden
                  />{" "}
                  Data-backed neighborhood insights
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section
        id="types"
        className="py-12 md:py-16 bg-slate-50 border-y border-slate-200"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Who we partner with
          </h2>
          <div className="mt-8 grid md:grid-cols-4 gap-6">
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                <p className="font-semibold">Landlords & Property Managers</p>
              </div>
              <p className="mt-2 text-slate-600">
                Fill units faster with verified student tenants and flexible
                term tools.
              </p>
            </div>
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                <p className="font-semibold">Universities & Housing Offices</p>
              </div>
              <p className="mt-2 text-slate-600">
                Support co-op and study abroad cycles with safe, short-term
                options.
              </p>
            </div>
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <p className="font-semibold">Student Orgs & SGAs</p>
              </div>
              <p className="mt-2 text-slate-600">
                Co-host events, recruit ambassadors, and reach members with
                housing resources.
              </p>
            </div>
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <p className="font-semibold">Local Businesses</p>
              </div>
              <p className="mt-2 text-slate-600">
                Promote services students need—moving, storage, furniture, and
                more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how" className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            How partnerships work
          </h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="text-sm font-medium text-slate-500">Step 1</div>
              <p className="mt-1 text-lg font-semibold">Tell us your goals</p>
              <p className="mt-2 text-slate-600">
                Share priorities—awareness, leasing velocity, student support,
                or research.
              </p>
            </div>
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="text-sm font-medium text-slate-500">Step 2</div>
              <p className="mt-1 text-lg font-semibold">Pick a program</p>
              <p className="mt-2 text-slate-600">
                Choose from co-branded campaigns, verified listings, events, or
                data insights.
              </p>
            </div>
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="text-sm font-medium text-slate-500">Step 3</div>
              <p className="mt-1 text-lg font-semibold">Launch & measure</p>
              <p className="mt-2 text-slate-600">
                We provide dashboards, best practices, and a point of contact to
                iterate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety / Benefits */}
      <section className="py-12 md:py-16 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-emerald-600" aria-hidden />
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Benefits you can trust
            </h2>
          </div>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <p className="font-semibold">Safety & quality</p>
              <ul className="mt-2 text-slate-600 space-y-2">
                <li>Verified student accounts and reporting tools</li>
                <li>Content moderation for listings and images</li>
                <li>Privacy-first platform with modern security</li>
              </ul>
            </div>
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <p className="font-semibold">Reach & results</p>
              <ul className="mt-2 text-slate-600 space-y-2">
                <li>Campus-targeted visibility and co-branded marketing</li>
                <li>Ambassador programs and on-campus activations</li>
                <li>Neighborhood heatmaps and actionable insights</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Impact / Stats (placeholders) */}
      <section id="impact" className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Impact at a glance
          </h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <p className="text-3xl font-bold">25%</p>
              <p className="mt-1 text-slate-600">
                Faster time-to-lease for partnered landlords*
              </p>
            </div>
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <p className="text-3xl font-bold">10k+</p>
              <p className="mt-1 text-slate-600">
                Students reached via campus campaigns*
              </p>
            </div>
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <p className="text-3xl font-bold">4.9/5</p>
              <p className="mt-1 text-slate-600">
                Average satisfaction across partners*
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            *Replace with your verified metrics.
          </p>
        </div>
      </section>

      {/* Logos / Testimonials (placeholders) */}
      <section className="py-12 md:py-16 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Trusted by campus communities
          </h2>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="h-16 rounded-xl border border-slate-200 bg-white shadow-sm flex items-center justify-center text-slate-400">
              Logo
            </div>
            <div className="h-16 rounded-xl border border-slate-200 bg-white shadow-sm flex items-center justify-center text-slate-400">
              Logo
            </div>
            <div className="h-16 rounded-xl border border-slate-200 bg-white shadow-sm flex items-center justify-center text-slate-400">
              Logo
            </div>
            <div className="h-16 rounded-xl border border-slate-200 bg-white shadow-sm flex items-center justify-center text-slate-400">
              Logo
            </div>
          </div>
        </div>
      </section>

      {/* Apply / Contact */}
      <section id="apply" className="py-16 bg-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Become a partner
            </h2>
            <p className="mt-4 text-slate-300 text-lg">
              Tell us about your organization and goals. We'll follow up with a
              tailored plan.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate("/partners/apply")}
                className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 bg-white text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition"
              >
                Start application <ArrowRight className="h-5 w-5" aria-hidden />
              </button>
              <a
                href="mailto:partners@campuscribs.org"
                className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 border border-slate-500 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-200 transition"
              >
                <Mail className="h-5 w-5" aria-hidden /> Email us
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-700 bg-slate-800 p-6">
            <p className="font-semibold">What to include</p>
            <ul className="mt-3 space-y-2 text-slate-300">
              <li>• Organization type and campus/city</li>
              <li>• Your objectives and timeline</li>
              <li>• Desired programs (events, verified listings, data)</li>
              <li>• Primary contact info</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-slate-200 bg-white">
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
        <div className="sticky left-0 bottom-5 w-10">
          <Footer />
        </div>
      </footer>
    </div>
  );
}
