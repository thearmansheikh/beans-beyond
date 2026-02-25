import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import OrderContent from "@/components/order/OrderContent";

export default function OrderPage() {
  return (
    <CartProvider>
      <Toaster position="bottom-right" />
      <Header />
      <OrderContent />
      <Footer />
    </CartProvider>
  );
}
