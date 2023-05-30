import { Controller, Post, Body, Inject } from "@nestjs/common";
import { PaymentService } from "./payment.service";

@Controller("stripe")
export class PaymentController {
  constructor(
    @Inject(PaymentService)
    private readonly PaymentService: PaymentService,
  ) {}

  @Post("payment-intent")
  async createPaymentIntent(
    @Body("amount") amount: number,
    @Body("orderData") items: any,
  ) {
    const clientSecret = await this.PaymentService.createPaymentIntent(
      amount,
      items,
    );
    return { clientSecret };
  }

  @Post("verify-payment")
  async verifyPayment(@Body("id") id: string) {
    const paymentIntent = await this.PaymentService.verifyPaymentIntent(id);
    console.log(paymentIntent);
    return { paymentIntent };
  }
}
