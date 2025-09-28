import { NextPage } from "next";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Nav from "../components/Nav";
import { Footer } from "../components/shared/Footer";
import { Box, Container } from "@mui/material";
import PaymentDetailsForm from "../components/PaymentDetailsForm";
import SummaryWithSubmit from "../components/SummaryWithSubmit";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { clearCart, selectCart, selectCartTotal } from "../store/cartSlice";
import { SubmitOrder } from "../application/useCases/SubmitOrder";
import { OrderApiAdapter } from "../infrastructure/persistence/OrderApiAdapter";
import { CartServiceAdapter } from "../infrastructure/services/CartServiceAdapter";
import { OrderData, OrderItem } from "../domain/entities/Order";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  paymentMethod: 'cash' | 'emoney';
  emoneyNumber: string;
  emoneyPin: string;
}

const Checkout: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCart);
  const cartTotal = useAppSelector(selectCartTotal);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    zipCode: '',
    city: '',
    country: '',
    paymentMethod: 'cash',
    emoneyNumber: '',
    emoneyPin: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitOrder();
  };

  const handleSummarySubmit = async () => {
    await submitOrder();
  };

  const submitOrder = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Transform cart items to order items
      const orderItems: OrderItem[] = cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.count,
        image: item.image.mobile,
      }));

      // Calculate totals
      const total = cartTotal;
      const vat = Math.round(total * 0.2); // 20% VAT
      const shipping = 50; // Fixed shipping cost
      const grandTotal = total + vat + shipping;

      // Create order data
      const orderData: OrderData = {
        items: orderItems,
        shipping: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          zipCode: formData.zipCode,
          city: formData.city,
          country: formData.country,
        },
        payment: {
          method: formData.paymentMethod,
          emoneyNumber: formData.paymentMethod === 'emoney' ? formData.emoneyNumber : undefined,
          emoneyPin: formData.paymentMethod === 'emoney' ? formData.emoneyPin : undefined,
        },
        total,
        vat,
        grandTotal,
      };

      // Dependency Injection: Infrastructure → Application → Domain
      // The dependency flow is crucial here because:
      // 1. Infrastructure layer (adapters) depends on Application layer (interfaces)
      // 2. Application layer (use cases) depends on Domain layer (entities)
      // 3. Domain layer has no dependencies (pure business logic)
      // This ensures that business logic is isolated from external concerns

      const orderRepository = new OrderApiAdapter();
      const cartService = new CartServiceAdapter(() => dispatch(clearCart()));
      const submitOrderUseCase = new SubmitOrder(orderRepository, cartService);

      // Execute the use case
      const order = await submitOrderUseCase.execute(orderData);

      // Navigate to success page
      console.log('Order submitted successfully:', order);
      router.push('/order-success');

    } catch (error) {
      console.error('Order submission failed:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit order');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#f1f1f1" }}>
      <Nav />
      <Container>
        <Box sx={{ display: "flex" }}>
          <PaymentDetailsForm
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submitError={submitError}
          />
          <SummaryWithSubmit
            cartItems={cartItems}
            cartTotal={cartTotal}
            onSubmit={handleSummarySubmit}
            isSubmitting={isSubmitting}
          />
        </Box>
      </Container>
      <Footer />
    </div>
  );
};

export default Checkout;
