import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";

export const metadata = {
  title: "Privacy Policy | TETLA Motors",
  description: "How TETLA Motors collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header variant="solid" />
      <section className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-10 pt-32 pb-20">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Privacy Policy</h1>
        <p className="text-sm text-[#999] mb-12">Last updated: June 2026</p>

        <div className="space-y-8 text-sm leading-relaxed text-gray-300">
          <p>
            TETLA Motors is committed to protecting your privacy. This policy explains what information
            we collect and how we use it. This is placeholder content and will be replaced with the
            final legal text.
          </p>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as your name, email address, and
              phone number when you submit an enquiry or test-ride request, as well as basic analytics
              about how you use our website.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">2. How We Use Your Information</h2>
            <p>
              We use your information to respond to enquiries, arrange test rides, connect you with
              dealers, and improve our products and services. We do not sell your personal information.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">3. Data Sharing</h2>
            <p>
              We may share your details with authorised dealers to fulfil your request. We do not share
              your data with third parties for marketing purposes without your consent.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">4. Your Rights</h2>
            <p>
              You may request access to, correction of, or deletion of your personal information at any
              time by contacting us.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">5. Contact</h2>
            <p>
              For privacy-related questions, contact us at{" "}
              <a href="mailto:info@tetlamotors.com" className="underline hover:text-[#00D9A3]">
                info@tetlamotors.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
