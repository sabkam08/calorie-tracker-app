export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <header className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 text-center shadow-2xl shadow-slate-950/30 sm:p-8">
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">Calorie Tracker</p>
          <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Welcome Back</h1>
          <p className="mt-3 text-sm text-slate-300 sm:text-base">
            Choose how you want to continue to your nutrition dashboard.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2">
          <article className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-xl font-semibold text-white">I already have an account</h2>
            <p className="mt-2 text-sm text-slate-300">Sign in and continue tracking your daily progress.</p>
            <a
              href="/login"
              className="mt-4 inline-flex rounded-lg bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-cyan-400"
            >
              Log In
            </a>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-xl font-semibold text-white">I am new here</h2>
            <p className="mt-2 text-sm text-slate-300">Create an account to start logging meals and goals.</p>
            <a
              href="/register"
              className="mt-4 inline-flex rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-emerald-400"
            >
              Register
            </a>
          </article>
        </section>
      </div>
    </main>
  );
}
