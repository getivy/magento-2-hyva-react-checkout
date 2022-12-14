import LocalStorage from '@hyva/react-checkout/utils/localStorage';
import sendRequest from '@hyva/react-checkout/api/sendRequest';
import modifier from './modifier';
import { CRETE_IVY_CHECKOUT_SESSION } from './mutation';

export default async function createIvyCheckoutSession(
  dispatch,
  express = true
) {
  const variables = { cartId: LocalStorage.getCartId(), express };

  return modifier(
    await sendRequest(dispatch, {
      query: CRETE_IVY_CHECKOUT_SESSION,
      variables,
    })
  );
}
