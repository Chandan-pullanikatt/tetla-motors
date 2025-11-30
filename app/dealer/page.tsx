export default function DealerPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-2xl font-semibold">Become a Dealer</h1>

      <p className="mt-3 text-sm text-slate-300">
        Fill the form below to apply for becoming a Tetla Motors authorized
        dealer. Placeholder fields until client specifies requirements.
      </p>

      <form className="mt-8 space-y-4">
        <div>
          <label className="text-sm text-slate-300">Full Name</label>
          <input className="mt-1 w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-2 text-sm text-white" />
        </div>

        <div>
          <label className="text-sm text-slate-300">Phone Number</label>
          <input className="mt-1 w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-2 text-sm text-white" />
        </div>

        <div>
          <label className="text-sm text-slate-300">Business Location</label>
          <input className="mt-1 w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-2 text-sm text-white" />
        </div>

        <div>
          <label className="text-sm text-slate-300">Investment Capacity</label>
          <input
            type="text"
            className="mt-1 w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-2 text-sm text-white"
            placeholder="e.g. ₹5–10 Lakhs"
          />
        </div>

        <div>
          <label className="text-sm text-slate-300">Message</label>
          <textarea
            rows={4}
            className="mt-1 w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-2 text-sm text-white"
          ></textarea>
        </div>

        <button className="rounded-full bg-emerald-500 px-6 py-2 text-sm font-semibold text-black hover:bg-emerald-400 transition">
          Submit Application
        </button>
      </form>
    </div>
  );
}
