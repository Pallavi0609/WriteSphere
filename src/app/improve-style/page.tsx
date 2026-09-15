import { ImproveStyleForm } from "./improve-style-form";

export default function ImproveStylePage() {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-headline font-bold tracking-tight mb-2">
        Improve Style
      </h1>
      <p className="text-muted-foreground mb-8">
        Enhance your writing style, tone, and clarity.
      </p>
      <ImproveStyleForm />
    </div>
  );
}
