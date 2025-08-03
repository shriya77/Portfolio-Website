import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { useState } from "react";

export const ProjectsSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <section id="waitlist" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center text-[hsl(var(--foreground))]">
          THIS IS YOUR SUMMONS
        </h2>

        <p className="text-center text-[hsl(var(--foreground))] mb-10 max-w-xl mx-auto">
          Join the waitlist or continue pretending you’re okay with parenting forums run by people named Brenda.
        </p>

        <div className="card-glass p-8 max-w-lg mx-auto">
          <p className="text-lg md:text-xl font-semibold text-center text-[hsl(var(--foreground))] mb-6 italic">
            Email. Now. Before Brenda wins.
          </p>
          <form
            className="space-y-4 text-center"
            onSubmit={async (e) => {
              e.preventDefault();
              const name = e.target.name.value;
              const email = e.target.email.value;

              try {
                const formData = new URLSearchParams();
                formData.append("name", name);
                formData.append("email", email);

                await fetch("https://script.google.com/macros/s/AKfycbw-Fc8e_qjZGyCyYQCLwx50MXsLnk8TGJ2sPx2YsRiRg9KIfcjbpLPLHutwQwJhDHUJ/exec", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                  body: formData.toString(),
                });

                setIsSubmitted(true);
                alert("Thanks for joining the waitlist!");
                e.target.reset();
              } catch (err) {
                console.error("Network error:", err);
                setIsSubmitted(true);
                alert("Thanks for joining the waitlist!");
                e.target.reset();
              }
            }}
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full px-5 py-3 rounded-full border border-border bg-background/60 text-foreground focus:outline-none shadow-sm shadow-pink-200 placeholder:text-[hsl(var(--foreground))]/70 transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full px-5 py-3 rounded-full border border-border bg-background/60 text-foreground focus:outline-none shadow-sm shadow-pink-200 placeholder:text-[hsl(var(--foreground))]/70 transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
              required
            />
            <button
              type="submit"
              disabled={isSubmitted}
              className="w-full bg-primary text-primary-foreground py-3 rounded-full hover:bg-primary/90 transition-transform duration-300 font-semibold hover:scale-[1.03] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitted ? "You're on the List 💌" : "Join the Waitlist"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
