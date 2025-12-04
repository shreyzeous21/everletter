import { Mail, Zap } from "lucide-react";
import Image from "next/image";

export default function ContentSection() {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4 space-y-10">
        {/* Heading */}
        <h2 className=" text-4xl font-semibold leading-tight lg:text-5xl">
          Powering the next generation of newsletters.
        </h2>

        <div className="relative flex flex-col md:flex-row md:items-center md:gap-4">
          
          {/* Left Content */}
          <div className="space-y-5 md:w-1/3">
            <p className="text-lg">
              Our platform brings together everything you need to{" "}
              <span className="font-medium">create, manage, and grow</span> your
              newsletter with ease.
            </p>

            <p className="text-muted-foreground">
              From seamless publishing tools to analytics and automation — the
              ecosystem is built to help creators, businesses, and communities
              thrive.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-5 pt-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Zap className="size-4" />
                  <h3 className="text-sm font-medium">Lightning Fast</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Publish and deliver newsletters instantly with optimized
                  sending performance.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="size-4" />
                  <h3 className="text-sm font-medium">Creator-Focused</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Tools built specifically for creators — no noise, just what
                  you need.
                </p>
              </div>
            </div>
          </div>

          {/* Full Image (Right Side) */}
          <div className="">
            <div className="relative rounded-xl overflow-hidden border border-border/40 shadow-sm">
              <Image
                src="/charts.webp"
                alt="Newsletter analytics dashboard"
                width={1000}
                height={1000}
                className="rounded-xl w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
