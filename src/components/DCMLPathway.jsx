export default function DCMLPathway() {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Interactive Pathway</p>
        <p className="mt-1 text-sm text-slate-700">Dorsal Column Medial Lemniscus</p>
      </div>
      <iframe
        src="/assets/DCMLnewwithcameramovments1.html"
        title="Dorsal Column Medial Lemniscus interactive pathway"
        className="h-[82vh] w-full border-0 bg-slate-950"
      />
    </div>
  );
}
