import { BlogForm } from "../BlogForm";

export default function NewBlogPage() {
  return (
    <div>
      <div className="bg-white border-b border-gray-200 px-8 py-5">
        <h1 className="text-xl font-semibold text-gray-900">New Blog Post</h1>
      </div>
      <div className="px-8 py-6">
        <BlogForm />
      </div>
    </div>
  );
}
