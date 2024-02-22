console.log('yoo')

fetch("/config/")
.then((result) => { return result.json(); })
.then((data) => {
  const stripe = Stripe(data.publicKey);

  document.querySelector("#submitBtn200").addEventListener("click", () => {
    createCheckoutSession(stripe, 20000);
  });

  document.querySelector("#submitBtn300").addEventListener("click", () => {
    createCheckoutSession(stripe, 30000);
  });
});

function createCheckoutSession(stripe, price) {
  fetch("/create-checkout-session/?price=" + price)
  .then((result) => { return result.json(); })
  .then((data) => {
    console.log(data);
    return stripe.redirectToCheckout({sessionId: data.sessionId})
  })
  .then((res) => {
    console.log(res);
  });
}
