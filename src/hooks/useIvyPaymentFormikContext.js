import { useContext } from 'react';

import { PaymentMethodFormContext } from '@hyva/react-checkout/context/Form';

export default function useIvyPaymentFormikContext() {
  return useContext(PaymentMethodFormContext);
}
