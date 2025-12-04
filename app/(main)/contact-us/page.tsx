import Link from "next/link";
import ContactForm from "./_components/ContactForm";

export default function ContactSection() {
  return (
    <section className="py-10">
      <div className="mx-auto container px-4 ">
        <h1 className="mb-12 text-center text-4xl font-semibold lg:text-5xl">
          Help us route your inquiry
        </h1>

        <div className="grid divide-y border md:grid-cols-2 md:gap-4 md:divide-x md:divide-y-0">
          <div className="flex flex-col justify-between space-y-8 p-6 sm:p-12">
            <div>
              <h2 className="mb-3 text-lg font-semibold">Collaborate</h2>
              <Link
                href="mailto:shrey.sadhukhan21@gmail.com"
                className="text-lg text-blue-600 hover:underline dark:text-blue-400"
              >
                shrey.sadhukhan21@gmail.com
              </Link>
              <p className="mt-3 text-sm">+91 8477081261</p>
            </div>
          </div>
          <div className="flex flex-col justify-between space-y-8 p-6 sm:p-12">
            <div>
              <h3 className="mb-3 text-lg font-semibold">Help</h3>
              <Link
                href="mailto:shrey.sadhukhan21@gmail.com"
                className="text-lg text-blue-600 hover:underline dark:text-blue-400"
              >
                shrey.sadhukhan21@gmail.com
              </Link>
              <p className="mt-3 text-sm">+91 8477081261</p>
            </div>
          </div>
        </div>

        <div className="h-3 border-x bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_6px)]"></div>
        <ContactForm />
      </div>
    </section>
  );
}
