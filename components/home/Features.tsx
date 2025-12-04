import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Settings2, Sparkles, Zap } from "lucide-react";
import { ReactNode } from "react";

export default function Features() {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            Everything you need to run your newsletter
          </h2>
          <p className="mt-4 text-muted-foreground">
            Powerful tools designed to help you write, send, and grow — all in
            one place.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 mx-auto w-full gap-6 *:text-center mt-8">
          {/* Feature 1 */}
          <Card className="group shadow-zinc-950/5">
            <CardHeader className="">
              <CardDecorator>
                <Zap className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className=" font-medium">Lightning-Fast Editor</h3>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-muted-foreground">
                A clean, distraction-free writing experience built to help you
                create content quickly and effortlessly.
              </p>
            </CardContent>
          </Card>

          {/* Feature 2 */}
          <Card className="group shadow-zinc-950/5">
            <CardHeader className="">
              <CardDecorator>
                <Settings2 className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className=" font-medium">Full Branding Control</h3>
            </CardHeader>

            <CardContent>
              <p className=" text-sm text-muted-foreground">
                Customize colors, layout, fonts, and email style — your
                newsletter looks exactly the way you want.
              </p>
            </CardContent>
          </Card>

          {/* Feature 3 */}
          <Card className="group shadow-zinc-950/5">
            <CardHeader className="">
              <CardDecorator>
                <Sparkles className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className=" font-medium">AI Writing & Suggestions</h3>
            </CardHeader>

            <CardContent>
              <p className=" text-sm text-muted-foreground">
                Generate content ideas, improve writing quality, and optimize
                subject lines using built-in AI tools.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

/* Decorative Icon Container */
const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div
    className="mask-radial-from-40% mask-radial-to-60% relative mx-auto size-36 duration-200 
    [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)]
    group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)]
    dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)]
    dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]"
  >
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] 
      bg-[size:24px_24px] dark:opacity-50"
    />

    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t rounded-md">
      {children}
    </div>
  </div>
);
