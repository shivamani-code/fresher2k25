import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-primary/10">
      <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in">
        <div className="flex justify-center">
          <CheckCircle2 className="w-24 h-24 text-primary animate-scale-in" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Payment Successful 🎉
        </h1>

        <p className="text-lg text-muted-foreground">
          Thank you for completing your payment! We can't wait to celebrate with you.
        </p>

        <div className="bg-card rounded-2xl p-8 shadow-lg border border-border space-y-4">
          <h2 className="text-2xl font-semibold mb-6">Event Details</h2>

          <div className="space-y-3 text-left">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📍</span>
              <div>
                <p className="font-semibold">Venue</p>
                <p className="text-muted-foreground">MREM</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">📅</span>
              <div>
                <p className="font-semibold">Date</p>
                <p className="text-muted-foreground">18th October 2025</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">🕒</span>
              <div>
                <p className="font-semibold">Time</p>
                <p className="text-muted-foreground">9:30 AM onwards</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
          <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
          <div className="text-center">
            <p className="font-semibold text-foreground text-lg">Jayanth Kumar & shiva mani</p>
          </div>
        </div>

        <Button
          onClick={() => navigate("/")}
          size="lg"
          className="mt-8"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default Success;
