import { Apple, MessageCircle, CalendarCheck, BotMessageSquare, Calendar } from "lucide-react";

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
            <Calendar className="mt-1 shrink-0 text-primary" />
            <p className="max-w-lg"><strong>A symptom/mood tracker</strong> that gives real advice for YOU</p>
          </div>
          <div className="flex items-center gap-4 justify-center text-center">
            <BotMessageSquare className="mt-1 shrink-0 text-primary" />
            <p className="max-w-lg"><strong>Emotionally intelligent</strong> and very sweet AI chatbot</p>
          </div>
          <div className="flex items-center gap-4 justify-center text-center">
            <MessageCircle className="mt-1 shrink-0 text-primary" />
            <p className="max-w-lg"><strong>Real stories</strong> from real moms who cried in Target</p>
          </div>
          <div className="flex items-center gap-4 justify-center text-center">
            <MessageCircle className="mt-1 shrink-0 text-primary" />
            <p className="max-w-lg"><strong>Health reminders, wellness tips</strong>: the good stuff</p>
          </div>
          <div className="flex items-center gap-4 justify-center text-center">
            <MessageCircle className="mt-1 shrink-0 text-primary" />
            <p className="max-w-lg"><strong>Postpartum: </strong>vaccine reminders, baby milestones and more</p>
          </div>
        </div>
      </div>
    </section>
  );
};
