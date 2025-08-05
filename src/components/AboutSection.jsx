import { Apple, MessageCircle, CalendarCheck } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      {" "}
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          What You’ll Get If You Sign Up:
        </h2>

        <div className="grid grid-cols-1 gap-6 text-left text-lg text-[hsl(var(--foreground))] max-w-3xl mx-auto font-medium leading-relaxed">
          <div className="flex items-center gap-4 justify-center text-center">
            <CalendarCheck className="mt-1 shrink-0 text-primary" />
            <p className="max-w-lg"><strong>Emergency advice</strong> for when your body's doing parkour</p>
          </div>
          <div className="flex items-center gap-4 justify-center text-center">
            <Apple className="mt-1 shrink-0 text-primary" />
            <p className="max-w-lg"><strong>A symptom/mood tracker</strong> that won’t judge you and gives advice based on your entries</p>
          </div>
          <div className="flex items-center gap-4 justify-center text-center">
            <MessageCircle className="mt-1 shrink-0 text-primary" />
            <p className="max-w-lg"><strong>Emotionally intelligent and very sweet AI chatbot</strong></p>
          </div>
          <div className="flex items-center gap-4 justify-center text-center">
            <MessageCircle className="mt-1 shrink-0 text-primary" />
            <p className="max-w-lg"><strong>Real stories</strong> from real moms who cried in Target</p>
          </div>
          <div className="flex items-center gap-4 justify-center text-center">
            <MessageCircle className="mt-1 shrink-0 text-primary" />
            <p className="max-w-lg"><strong>Memes, rants, wellness tips</strong>: the good stuff</p>
          </div>
        </div>
      </div>
    </section>
  );
};
