// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//       try {
//         const params = {
//           submit_type: 'pay',
//           mode: 'payment',
//           payment_method_types: ['card'],
//           billing_address_collection: 'auto',
//           shipping_options: [
//             { shipping_rate: 'shr_1MGoEKJls5dGQkhBvZMvzNUx' },
//           ],
//           line_items: req.body.map((item) => {
//             const img = item.attributes.mainImage.data.attributes.url;

  
//             return {
//               price_data: { 
//                 currency: 'usd',
//                 product_data: { 
//                   name: item.attributes.name,
//                   images:[img] ,
//                 },
//                 unit_amount: item.attributes.price * 100,
//               },
//               adjustable_quantity: {
//                 enabled:true,
//                 minimum: 1,
//               },
//               quantity: item.quantity
//             }
//           }),
//           success_url: `https://next-electro-shop.vercel.app/success`,
//           cancel_url: `https://next-electro-shop.vercel.app/`,
//         }
  
//         // Create Checkout Sessions from body params.
//         const session = await stripe.checkout.sessions.create(params);
  
//         res.status(200).json(session);
//       } catch (err) {
//         res.status(err.statusCode || 500).json(err.message);
//       }
//     } else {
//       res.setHeader('Allow', 'POST');
//       res.status(405).end('Method Not Allowed');
//     }
//   }