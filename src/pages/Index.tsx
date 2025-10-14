import { Button } from "@/components/ui/button";
import PaymentSection from "@/components/PaymentSection";

const Index = () => {
  const scrollToPayment = () => {
    document.getElementById("payment")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden bg-gradient-to-br from-background via-primary/10 to-secondary/10">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse -top-48 -left-48"></div>
          <div className="absolute w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse -bottom-48 -right-48"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-scale-in drop-shadow-2xl">
            Freshers 2025
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground font-light italic">
            "New Beginnings, Endless Memories."
          </p>

          <Button
            onClick={scrollToPayment}
            size="lg"
            className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Pay Fee
          </Button>
        </div>

        {/* Footer */}
        <footer className="absolute bottom-8 text-center text-sm text-muted-foreground">
          <p>represented by</p>
          <p className="font-semibold text-foreground text-lg mt-1">Jayanth Kumar & shiva mani</p>
        </footer>
      </section>

      {/* Payment Section */}
      <PaymentSection />
    </div>
  );
};

export default Index;
