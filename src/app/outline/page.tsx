import { OutlineForm } from "./outline-form";

export default function OutlinePage() {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-headline font-bold tracking-tight mb-2">
        Essay Outline Generator
      </h1>
      <p className="text-muted-foreground mb-8">
        Describe your topic and let our AI create a structured, easy-to-follow outline for you.
      </p>
      <OutlineForm />
    </div>
  );
}
