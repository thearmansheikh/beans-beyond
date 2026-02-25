"use client";

import { useState } from "react";
import OrderHero from "@/components/order/OrderHero";
import OrderStepIndicator from "@/components/order/OrderStepIndicator";
import OrderStep1 from "@/components/order/OrderStep1";
import OrderStep2 from "@/components/order/OrderStep2";
import OrderStep3 from "@/components/order/OrderStep3";
import OrderConfirmation from "@/components/order/OrderConfirmation";

export default function OrderContent() {
  const [step, setStep]               = useState(1);
  const [orderNumber, setOrderNumber] = useState("");

  const handleComplete = (num: string) => {
    setOrderNumber(num);
    setStep(4);
  };

  return (
    <main>
      <OrderHero />

      <section className="section-padding bg-[#F8F4EF]">
        <div className="container-site">
          {step < 4 && <OrderStepIndicator step={step} />}

          {step === 1 && <OrderStep1 onNext={() => setStep(2)} />}
          {step === 2 && <OrderStep2 onNext={() => setStep(3)} onBack={() => setStep(1)} />}
          {step === 3 && <OrderStep3 onBack={() => setStep(2)} onComplete={handleComplete} />}
          {step === 4 && <OrderConfirmation orderNumber={orderNumber} />}
        </div>
      </section>
    </main>
  );
}
