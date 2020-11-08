/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51HlDCLAEBdpWawITyc9LOij5iqoOglKwNxdFzWi6nw3Pi6dyGGlqnDhnmi5E7FoE1fGk4fItoMYXZJw8656VJnPY00Jzr3qAwF'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
