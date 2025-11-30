export default function BlogDetail({ params }: any) {
  const { slug } = params;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-2xl font-semibold capitalize">{slug}</h1>

      <p className="mt-4 text-sm text-slate-300 leading-relaxed">
        Placeholder blog content for <strong>{slug}</strong>. Replace this
        text with actual posts once the client shares blog articles.
      </p>
    </div>
  );
}
