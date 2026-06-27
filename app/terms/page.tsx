import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";

export const metadata = {
  title: "Terms & Conditions | TETLA Motors",
  description: "Terms and conditions for using TETLA Motors services and website.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header variant="solid" />
      <section className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-10 pt-32 pb-20">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Terms &amp; Conditions</h1>
        <p className="text-sm text-[#999] mb-12">Last updated: June 2026</p>

        <div className="space-y-8 text-sm leading-relaxed text-gray-300">
          <p>
            Welcome to TETLA Motors. These Terms &amp; Conditions govern your use of our website
            and services. By accessing this site you agree to be bound by them. This is placeholder
            content and will be replaced with the final legal text.
          </p>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">1. Use of the Website</h2>
            <p>
              You may use this website for lawful purposes only. You agree not to use it in any way
              that breaches applicable laws or regulations, or that may damage the site or impair its
              availability.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">2. Products &amp; Pricing</h2>
            <p>
              Product specifications, availability, and pricing displayed on this site are indicative
              and subject to change without notice. Final pricing is confirmed at the point of purchase
              through an authorised dealer.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">3. Intellectual Property</h2>
            <p>
              All content on this site, including logos, designs, text, and imagery, is the property of
              TETLA Motors Private Limited and may not be reproduced without prior written consent.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">4. Limitation of Liability</h2>
            <p>
              TETLA Motors shall not be liable for any indirect or consequential loss arising from the
              use of this website to the fullest extent permitted by law.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">5. Contact</h2>
            <p>
              For questions about these terms, contact us at{" "}
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
