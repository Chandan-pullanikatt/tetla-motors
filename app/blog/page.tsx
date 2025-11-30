import Link from "next/link";
import { Button } from "@/app/components/ui/button";

const posts = [
  {
    id: 1,
    title: "The Future of Autonomy",
    excerpt: "How our latest FSD update is changing the way we drive.",
    date: "November 28, 2025",
    category: "Technology",
  },
  {
    id: 2,
    title: "Gigafactory Berlin Expansion",
    excerpt: "Doubling our production capacity in Europe to meet demand.",
    date: "November 15, 2025",
    category: "Company",
  },
  {
    id: 3,
    title: "Sustainable Energy for All",
    excerpt: "Why we are open-sourcing our charging connector design.",
    date: "November 1, 2025",
    category: "Sustainability",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10">
        <h1 className="text-5xl md:text-[64px] font-bold mb-16 text-center tracking-tight leading-none">
          LATEST <span className="text-[#00D9A3]">NEWS</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-gradient-to-br from-[#111] to-[#1a1a1a] rounded-2xl overflow-hidden border border-[#222] hover:border-[#00D9A3]/50 transition-all duration-300 group hover:-translate-y-2">
              <div className="aspect-video bg-[#050505] flex items-center justify-center border-b border-[#222]">
                <span className="text-[#333] font-bold tracking-widest">IMAGE</span>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-center mb-6 text-xs text-[#666] font-medium tracking-wide">
                  <span>{post.date}</span>
                  <span className="px-3 py-1 bg-[#222] rounded-full text-[#ccc]">{post.category}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-[#00D9A3] transition-colors">{post.title}</h3>
                <p className="text-[#999] mb-8 leading-relaxed">{post.excerpt}</p>
                <Link href="#" className="text-[#00D9A3] hover:text-white font-medium inline-flex items-center gap-2 transition-colors">
                  Read More &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
