import { GrammarCheckForm } from "./grammar-check-form";

export default function GrammarCheckPage() {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-headline font-bold tracking-tight mb-2">
        Grammar & Style Checker
      </h1>
      <p className="text-muted-foreground mb-8">
        Paste your text below to get instant feedback on grammar, style, and clarity.
      </p>
      <GrammarCheckForm />
    </div>
  );
}
