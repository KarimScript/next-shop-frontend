import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

const getStripe = () => {
  if(!stripePromise) {
    stripePromise = loadStripe('pk_test_51MGnvBJls5dGQkhBqWXaf4JYH4vGwwmXnTI2hhT8fBjRiE77brz9PppoEdmuf1JMEApFEC5vK82ozgICTZIKN3Kj00jbpvtUY1');
  }

  return stripePromise;
}

export default getStripe;