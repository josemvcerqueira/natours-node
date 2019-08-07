/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

const stripe = Stripe('pk_test_sFFpS5N2YLPOkIMvpX2FZbe600gfYLitiH');

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`,
    );

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (error) {
    showAlert('error', error);
  }
};
