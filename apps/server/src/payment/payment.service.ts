import { Injectable } from "@nestjs/common";
import { OrderService } from "src/order/order.service";
import Stripe from "stripe";

@Injectable()
export class PaymentService {
  private readonly stripe: Stripe;

  constructor(private OrderService: OrderService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2022-11-15",
    });
  }

  async createPaymentIntent(amount: number, orderData: any) {
    amount *= 100;
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      currency: "INR",
      metadata: { orderData },
    });

    return paymentIntent;
  }

  async verifyPaymentIntent(id: string) {
    // console.log(id);
    const paymentIntent = await this.stripe.paymentIntents.retrieve(id);
    // console.log(paymentIntent.metadata.o)
    const metadata = JSON.parse(paymentIntent.metadata.orderData);
    const order = {
      amount: paymentIntent.amount,
      email: metadata.email,
      products: metadata.productData,
      date: metadata.date,
      trackOrder: {
        orderGettingReady: false,
        orderReady: false,
        orderReadyToShipped: false,
        orderShipped: false,
        orderDelivered: false,
      },
      userId: metadata.user_id,
    };
    // if (paymentIntent && paymentIntent.status === 'succeeded') {
    //   // Handle successful payment here
    // } else {
    //   // Handle unsuccessful, processing, or canceled payments and API errors here
    // }
    // this.OrderService.create()
    await this.OrderService.create(order);
    console.log("Order Inserted Successfully!");
    return paymentIntent;
  }
}
