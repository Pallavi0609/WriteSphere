
'use server';

import { z } from 'zod';

const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters long.'),
    email: z.string().email('Please enter a valid email address.'),
    subject: z.string().min(5, 'Subject must be at least 5 characters long.'),
    message: z.string().min(10, 'Message must be at least 10 characters long.'),
});

type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = contactSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  
  const fields = Object.fromEntries(formData.entries());

  if (!validatedFields.success) {
    return {
      message: 'Please check your input and try again.',
      fields: fields,
      issues: validatedFields.error.issues.map((issue) => issue.message),
    };
  }

  // Simulate a delay to make it seem like the form is being processed
  await new Promise(resolve => setTimeout(resolve, 1000));

  // In a real application, you would handle the form submission here, 
  // for example, by sending an email or saving the data to a database.
  console.log('Form submitted successfully:', validatedFields.data);

  return { message: 'success' };
}
