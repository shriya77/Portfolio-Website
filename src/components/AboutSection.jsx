import { Apple, MessageCircle, CalendarCheck } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      {" "}
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary"> Us</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              Empowering Mothers Everywhere
            </h3>

            <p className="text-muted-foreground">
              Materna is a platform dedicated to supporting health of mothers before and after pregnancy, by providing accessible, empathetic, and expert-backed resources and tools.
            </p>

            <p className="text-muted-foreground">
              We believe that every mother deserves personalized, stigma-free care, no matter where she lives or what stage of motherhood she’s in. Our mission is to bridge the gap in maternal healthcare with technology and compassion.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                {" "}
                Get In Touch
              </a>

              <a
                href="#waitlist"
                className="px-6 py-2 rounded-full border border-[hsl(var(--foreground))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--foreground)/0.1)] transition-colors duration-300"
              >
                Join the Waitlist
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="p-6 card-hover rounded-xl border border-white/30 bg-white/30 backdrop-blur-lg shadow-lg">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-[#EAE3CA]">
                  <Apple className="h-6 w-6 text-[#DFA69F]" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg text-[#234451] dark:text-[#DFA69F]">Nutrition & Wellness Hub</h4>
                  <p className="text-[#234451] dark:text-[#DFA69F]">
                    Explore personalized food guidance, pregnancy-safe exercises, and holistic care tailored for every stage of motherhood.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 card-hover rounded-xl border border-white/30 bg-white/30 backdrop-blur-lg shadow-lg">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-[#EAE3CA]">
                  <MessageCircle className="h-6 w-6 text-[#DFA69F]" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg text-[#234451] dark:text-[#DFA69F]">Community Forum</h4>
                  <p className="text-[#234451] dark:text-[#DFA69F]">
                    Connect with fellow moms in a safe, supportive space to share experiences, ask questions, and offer encouragement.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 card-hover rounded-xl border border-white/30 bg-white/30 backdrop-blur-lg shadow-lg">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-[#EAE3CA]">
                  <CalendarCheck className="h-6 w-6 text-[#DFA69F]" />
                </div>

                <div className="text-left">
                  <h4 className="font-semibold text-lg text-[#234451] dark:text-[#DFA69F]">Doctor Appointment Tracker</h4>
                  <p className="text-[#234451] dark:text-[#DFA69F]">
                    Stay on top of all your prenatal and postnatal visits with smart reminders and an easy-to-use appointment log.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
