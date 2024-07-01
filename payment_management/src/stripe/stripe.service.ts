import { Injectable } from '@nestjs/common';
import {Stripe} from 'stripe';
import { Cart } from './Cart.model';

@Injectable()
export class StripeService {
    private stripe;

    constructor(){
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    }

    checkout(cart: Cart){
        const totalAmount = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);

        return this.stripe.paymentIntents.create({
            amount: totalAmount * 100,
            currency: 'lkr',
            payment_method_types: ['card'],
        });
    }
}
