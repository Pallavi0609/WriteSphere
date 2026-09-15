
import { ContactForm } from './contact-form';
import { Mail, Phone, MapPin } from 'lucide-react';

const contactDetails = [
  {
    icon: Mail,
    title: 'Email',
    value: 'support@writesphere.ai',
    href: 'mailto:support@writesphere.ai',
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
  {
    icon: MapPin,
    title: 'Address',
    value: '123 AI Avenue, Innovation City, 12345',
  },
]

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-20 md:py-28 lg:py-32">
          <div className="container px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
                Get in Touch
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                We&apos;d love to hear from you. Whether you have a question, feedback, or just want to say hello, feel free to reach out.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full pb-20 md:pb-28 lg:pb-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
              <div className="lg:col-span-3">
                <ContactForm />
              </div>
              <div className="lg:col-span-2 space-y-8">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl font-headline">Contact Information</h2>
                    <p className="text-muted-foreground">Find us here, we are ready to help.</p>
                </div>
                <div className="space-y-6">
                  {contactDetails.map((detail) => (
                    <div key={detail.title} className="flex items-start gap-4">
                      <div className="bg-primary/10 text-primary rounded-lg p-3 w-fit h-fit">
                        <detail.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{detail.title}</h3>
                        {detail.href ? (
                            <a href={detail.href} className="text-muted-foreground hover:text-primary transition-colors">
                                {detail.value}
                            </a>
                        ) : (
                            <p className="text-muted-foreground">{detail.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
