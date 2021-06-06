import React from 'react';
import { Typography, Button, Divider, Card} from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import Review from './Review';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ checkoutToken, nextStep, backStep, shippingData, onCaptureCheckout }) => {
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

    if (error) {
      console.log('[error]', error);
    } else {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
        shipping: { name: 'International', town_city : "São Paulo", street: shippingData.address1, postal_zip_code: shippingData.zip, country: "Brazil"},
        fulfillment: { shipping_method: "BR" },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };

      onCaptureCheckout(checkoutToken.id, orderData);

      nextStep();
    }
  };

  const cardNumberTest = "4242 4242 4242 4242"
  const cardMMAATest = "04 / 24"
  const cardCVC = "242"
  const cardCEP = "42424"

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Método de Pagamento</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>{({ elements, stripe }) => (
          <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
            <CardElement />
            <br /> <br />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" onClick={backStep}>Voltar</Button>
              <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                 {/* {checkoutToken.live.subtotal.formatted_with_symbol} */}
                Confirmar pagamento
              </Button>
            </div>
          </form>
        )}
        </ElementsConsumer>
      </Elements><br/>
      <Card>
          <Typography variant='h6'>Exemplo de dados do Cartão</Typography>
          <div style={{ display: 'flex' }}>
            <Typography variant='h6'>4242 4242 4242 4242</Typography>
            <CopyToClipboard text={cardNumberTest}>
              <button style={{ margin: '3px', background: "white" }}><FileCopyIcon/></button>
            </CopyToClipboard>
          </div>
          <div style={{ display: 'flex' }}>
            <Typography variant='h6'>04 / 24</Typography>
            <CopyToClipboard text={cardMMAATest}>
              <button style={{ margin: '3px', background: "white" }}><FileCopyIcon/></button>
            </CopyToClipboard>
          </div>
          <div style={{ display: 'flex' }}>
            <Typography variant='h6'>242</Typography>
            <CopyToClipboard text={cardCVC}>
              <button style={{ margin: '3px', background: "white"}}><FileCopyIcon/></button>
            </CopyToClipboard>
          </div>
          <div style={{ display: 'flex' }}>
            <Typography variant='h6'>42424</Typography>
            <CopyToClipboard text={cardCEP}>
              <button style={{ margin: '3px', background: "white"}}><FileCopyIcon/></button>
            </CopyToClipboard>
          </div>
      </Card>
    </>
  );
};

export default PaymentForm;