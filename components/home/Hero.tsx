import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  Mail,
  Zap,
  Users,
  TrendingUp,
  Shield,
} from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-10">
      <div className="mx-auto container px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 px-4 py-1.5 text-sm font-medium shadow-sm">
              <Zap className="h-4 w-4 text-orange-500 fill-orange-500" />
              <span>Trusted by 10,000+ creators worldwide</span>
            </div>

            {/* Headline */}
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl leading-tight">
                Create newsletters that your audience{" "}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  loves to read
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Design stunning email campaigns, send to thousands, and track
                performance—all in one powerful platform. No coding skills
                needed. Turn your ideas into engaging newsletters that drive
                real results.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="group text-base px-8 py-6">
                <Link href="/sign-up">
                  Start free trial
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-base px-8 py-6"
              >
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
                <span>Free 14-day trial • No credit card required</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
                <span>Cancel anytime • GDPR & SOC 2 compliant</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
                <span>99.9% uptime guarantee • 24/7 support</span>
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 pt-8 border-t">
              <div className="flex -space-x-2">
                {[
                  { bg: "bg-blue-500", initial: "A" },
                  { bg: "bg-purple-500", initial: "S" },
                  { bg: "bg-pink-500", initial: "M" },
                  { bg: "bg-green-500", initial: "J" },
                ].map((avatar, i) => (
                  <div
                    key={i}
                    className={`h-12 w-12 rounded-full border-2 border-background ${avatar.bg} flex items-center justify-center text-white font-semibold text-sm shadow-md`}
                  >
                    {avatar.initial}
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <p className="font-semibold text-foreground">
                  Join 10,000+ creators
                </p>
                <p className="text-muted-foreground">
                  Sending 2.5M+ newsletters monthly
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative ">
            {/* Main Dashboard Preview */}
            <div className="relative rounded-2xl border-2 bg-background shadow-2xl overflow-hidden ring-1 ring-border/50">
              {/* Browser Chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/30">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-6 rounded-md bg-background border text-xs flex items-center px-3 text-muted-foreground">
                    newsletter.app/dashboard
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-8">
                {/* Newsletter Preview */}
                <div className="w-full space-y-4">
                  {/* Email Header */}
                  <div className="rounded-xl border-2 bg-white dark:bg-slate-950 p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4 pb-4 border-b">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                          N
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-foreground">
                            Weekly Newsletter
                          </div>
                          <div className="text-xs text-muted-foreground">
                            newsletter@example.com
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center">
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    </div>

                    {/* Email Content */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-bold text-base text-foreground">
                          🚀 5 Growth Hacks That Doubled Our Revenue
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Hey there! This week we're sharing actionable
                          strategies that helped us scale from 0 to 10K
                          subscribers in just 3 months. Plus, exclusive insights
                          from industry leaders.
                        </p>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <div className="px-3 py-1.5 rounded-md bg-primary/10 text-primary text-xs font-medium">
                          Growth
                        </div>
                        <div className="px-3 py-1.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-medium">
                          Tips
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats Card */}
                  <div className="rounded-xl border-2 bg-white dark:bg-slate-950 p-6 shadow-lg">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-foreground">
                          2.5M
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Emails Sent
                        </div>
                      </div>
                      <div className="text-center border-x">
                        <div className="text-2xl font-bold text-foreground">
                          42%
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Open Rate
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-foreground">
                          18%
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Click Rate
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats Cards */}
            <div className="absolute -bottom-8 -left-8 rounded-xl border-2 bg-background/95 p-5 shadow-2xl hidden lg:block backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-base font-bold text-foreground">
                    98.5% Delivery
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Industry-leading rate
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -top-8 -right-8 rounded-xl border-2 bg-background/95 p-5 shadow-2xl hidden lg:block backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-base font-bold text-foreground">
                    24K+ Active
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Subscribers growing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-muted-foreground/10 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]">
          <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <pattern
                id="grid-pattern"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 40V.5H40" fill="none" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-30"></div>
      </div>
    </section>
  );
}
