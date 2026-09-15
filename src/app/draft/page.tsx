import { DraftForm } from "./draft-form";

export default function DraftPage() {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-headline font-bold tracking-tight mb-2">
        Article Draft Generator
      </h1>
      <p className="text-muted-foreground mb-8">
        Provide a topic, tone, and word limit to generate a complete article draft.
      </p>
      <DraftForm />
    </div>
  );
}
