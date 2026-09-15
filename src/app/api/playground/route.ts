import { NextRequest } from 'next/server';
import { ai } from '@/ai/genkit';
import { generateArticleDraft } from '@/ai/flows/generate-article-draft';
import { getFirestore, collection, addDoc } from 'firebase/firestore/lite';
import { app } from '@/firebase';
import { auth } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
    });
  }

  const { topic, tone, purpose, language, content, wordLimit } = await req.json();

  if (req.headers.get('accept') === 'text/event-stream') {
    // Streaming response
    const stream = await ai.runFlow(generateArticleDraft, {
      topic,
      tone,
      purpose,
      language,
      outline: content,
      wordLimit,
    }, { stream: true });

    return new Response(stream.yields.output(), {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } else {
    // Non-streaming response
    try {
      const draft = await ai.runFlow(generateArticleDraft, {
        topic,
        tone,
        purpose,
        language,
        outline: content,
        wordLimit,
      });

      const db = getFirestore(app);
      await addDoc(collection(db, 'users', session.user.id, 'generationHistories'), {
        userId: session.user.id,
        topic,
        tone,
        purpose,
        language,
        wordLimit,
        draft,
        createdAt: new Date(),
      });

      return new Response(JSON.stringify({ draft }), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error generating or saving draft:', error);
      return new Response(JSON.stringify({ error: 'Failed to process draft' }), {
        status: 500,
      });
    }
  }
}
