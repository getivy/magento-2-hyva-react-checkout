import React, { useCallback, useEffect, useState } from 'react';

import { PAYMENT_METHOD_FORM } from '@hyva/react-checkout/config';
import { paymentMethodShape } from '@hyva/react-checkout/utils/payment';
import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';
import { __ } from '@hyva/react-checkout/i18n';
import useCheckoutFormContext from '@hyva/react-checkout/hook/useCheckoutFormContext';
import { ivyPaymentLogoUrl } from '../utils';
import useIvyPayment from '../hooks/useIvyPayment';
import useIvyPaymentAppContext from '../hooks/useIvyPaymentAppContext';
import useIvyPaymentCartContext from '../hooks/useIvyPaymentCartContext';
import useIvyPaymentFormikContext from '../hooks/useIvyPaymentFormikContext';

function IvyPaymentRenderer({ method, selected }) {
  const { registerPaymentAction, setErrorMessage } = useCheckoutFormContext();
  const methodCode = method.code;
  const { paymentSubmitHandler } = useIvyPayment();
  const { setPageLoader } = useIvyPaymentAppContext();
  const { setFieldValue } = useIvyPaymentFormikContext();
  const { isVirtualCart, setPaymentMethod, hasCartShippingAddress } =
    useIvyPaymentCartContext();
  const [isSelected, setIsSelected] = useState(false);
  useEffect(() => {
    setIsSelected(methodCode === selected.code);
  }, [methodCode, selected]);
  const isPaymentAvailable = !isVirtualCart && hasCartShippingAddress;

  const paymentSelectionHandler = useCallback(async () => {
    setPageLoader(true);
    try {
      setFieldValue(`${PAYMENT_METHOD_FORM}.code`, methodCode);
      await setPaymentMethod(methodCode);
    } catch (error) {
      setErrorMessage(__(error));
    }
    setPageLoader(false);
  }, [methodCode, setPageLoader, setPaymentMethod, setFieldValue]);

  useEffect(() => {
    registerPaymentAction(methodCode, paymentSubmitHandler);
  }, [registerPaymentAction, paymentSubmitHandler, methodCode]);

  const radioLabel = (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label
      htmlFor={`paymentMethod_${methodCode}`}
      className="inline-block pl-2 cursor-pointer"
    >
      <img src={ivyPaymentLogoUrl} alt={__('Ivy Payment')} />
    </label>
  );

  return (
    <RadioInput
      label={radioLabel}
      value={method.code}
      name="paymentMethod"
      checked={isSelected}
      disabled={!isPaymentAvailable}
      onChange={paymentSelectionHandler}
    />
  );
}

IvyPaymentRenderer.propTypes = {
  method: paymentMethodShape.isRequired,
  selected: paymentMethodShape.isRequired,
};
export default IvyPaymentRenderer;
