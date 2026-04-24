import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100 sm:px-8">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/30 sm:p-8">
        <p className="text-xs uppercase tracking-[0.24em] text-emerald-300">Register</p>
        <h1 className="mt-3 text-2xl font-semibold text-white">Create your account</h1>
        <form className="mt-6 flex flex-col gap-4" action="/dashboard">
          <label className="flex flex-col gap-1 text-sm text-slate-300">
            Full Name
            <input
              type="text"
              name="name"
              required
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none ring-emerald-400 focus:ring"
              placeholder="Jane Doe"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm text-slate-300">
            Email
            <input
              type="email"
              name="email"
              required
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none ring-emerald-400 focus:ring"
              placeholder="you@example.com"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm text-slate-300">
            Password
            <input
              type="password"
              name="password"
              required
              minLength={8}
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none ring-emerald-400 focus:ring"
              placeholder="Choose a password"
            />
          </label>
          <button
            type="submit"
            className="mt-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-emerald-400"
          >
            Create Account
          </button>
        </form>
        <p className="mt-5 text-sm text-slate-300">
          Already have an account?{" "}
          <Link href="/login" className="text-emerald-300 hover:text-emerald-200">
            Log In
          </Link>
        </p>
        <Link href="/" className="mt-4 inline-flex text-sm text-slate-400 hover:text-slate-300">
          Back to landing page
        </Link>
      </div>
    </main>
  );
}

