import { config } from 'dotenv';
config();

import '@/ai/flows/generate-essay-outline.ts';
import '@/ai/flows/generate-article-draft.ts';
import '@/ai/flows/check-grammar-and-style.ts';
import '@/ai/flows/improve-style.ts';
