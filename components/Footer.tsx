"use client";
import Link from "next/link";
import { Newspaper, Mail } from "lucide-react";
import { usePathname } from "next/navigation";

const footerLinks = {
  product: [{ title: "Pricing", href: "/pricing" }],
  support: [{ title: "Contact Us", href: "/contact-us" }],
  legal: [
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  const isDashboard = usePathname().includes("/dashboard");
  return isDashboard ? null : (
    <footer className="border-t bg-background">
      <div className="mx-auto container px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="group">
              <h1 className="flex items-center gap-2 text-xl font-bold tracking-tight">
                <div className="rounded-lg bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary/20">
                  <Newspaper size={20} />
                </div>
                <span>EverLetter</span>
              </h1>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Professional email newsletters made simple. Create, send, and
              track beautiful campaigns that engage your audience.
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <a
                href="mailto:shrey.sadhukhan21@gmail.com"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span className="hidden sm:inline">
                  shrey.sadhukhan21@gmail.com
                </span>
              </a>
            </div>
          </div>

          {/* Link Columns */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">
              Product
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-block"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-block"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} Newsletter by Shrey. All rights
              reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
