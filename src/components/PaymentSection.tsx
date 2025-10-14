import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Upload, Loader2 } from "lucide-react";
import qrCode from "@/assets/phonepe-qr.jpeg";
import { supabase } from "@/integrations/supabase/client";

const PaymentSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    email: "",
    paymentProof: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, paymentProof: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.rollNo || !formData.email || !formData.paymentProof) {
      toast({
        title: "Missing Information",
        description: "Please fill all fields and upload payment proof.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload image to storage
      const timestamp = Date.now();
      const fileName = `${formData.rollNo}_${timestamp}_${formData.paymentProof.name}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('payment-proofs')
        .upload(fileName, formData.paymentProof);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('payment-proofs')
        .getPublicUrl(fileName);

      // Save to database
      const { error: insertError } = await supabase
        .from('freshers_submissions')
        .insert({
          name: formData.name,
          roll_no: formData.rollNo,
          email: formData.email,
          payment_proof_url: publicUrl,
          payment_status: "Pending",
        });

      if (insertError) throw insertError;

      toast({
        title: "Success!",
        description: "Your payment details have been submitted successfully.",
      });

      navigate("/success");
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Failed",
        description: "Failed to submit payment details. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="payment" className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-2xl w-full space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">Payment Details</h2>
          <p className="text-muted-foreground">
            Each student is required to pay the fee for the Freshers 2025 event.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-8 shadow-xl border border-border space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rollNo">Roll Number</Label>
              <Input
                id="rollNo"
                placeholder="Enter your roll number"
                value={formData.rollNo}
                onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="bg-muted rounded-xl p-6 text-center space-y-4">
              <h3 className="font-semibold text-lg">Scan QR Code to Pay</h3>
              <div className="bg-white p-4 rounded-lg inline-block">
                <img src={qrCode} alt="PhonePe QR Code" className="w-48 h-auto" />
              </div>
              <p className="text-sm text-muted-foreground">
                After payment, upload your payment screenshot below
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment-proof">Payment Screenshot</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="payment-proof"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="cursor-pointer"
                />
                <Upload className="w-5 h-5 text-muted-foreground" />
              </div>
              {formData.paymentProof && (
                <p className="text-sm text-primary">
                  ✓ {formData.paymentProof.name}
                </p>
              )}
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Payment Details"
              )}
            </Button>
          </form>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>represented by</p>
          <p className="font-semibold text-foreground text-lg mt-1">Jayanth Kumar & shiva mani</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
