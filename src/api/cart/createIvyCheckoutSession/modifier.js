import { get as _get } from 'lodash-es';

export default function modify–°reateIvyCheckoutSession(result) {
  const redirectUrl = _get(result, 'data.createIvyCheckoutSession.redirectUrl');
  const errorMessage = _get(
    result,
    'data.createIvyCheckoutSession.errorMessage'
  );

  return {
    redirectUrl,
    errorMessage,
  };
}
