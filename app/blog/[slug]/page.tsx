import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";

export default function BlogDetail({ params }: any) {
  const { slug } = params;

  return (
    <main className="min-h-screen bg-black text-white">
      <Header variant="solid" />
      <div className="mx-auto max-w-4xl px-4 pt-32 pb-20">
        <h1 className="text-2xl font-semibold capitalize">{slug}</h1>

        <p className="mt-4 text-sm text-slate-300 leading-relaxed">
          Placeholder blog content for <strong>{slug}</strong>. Replace this
          text with actual posts once the client shares blog articles.
        </p>
      </div>
      <Footer />
    </main>
  );
}
