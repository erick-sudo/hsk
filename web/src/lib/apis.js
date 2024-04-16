export const base_url = `http://${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/auth/`;
const house_keeping = base_url.replace("auth", "house_keeper");

export const apis = {
  register: `${base_url}register`,
  verifyEmail: `${base_url}verify-email`,
  login: `${base_url}login`,
  profile: `${base_url}profile`,
  requestPasswordReset: `${base_url}request-password-reset`,
  confirmPasswordReset: `${base_url}confirm-password-reset/<uidb64>/<token>`,
  setNewPassword: `${base_url}set-new-password`,
  logout: `${base_url}logout`,
  googleLogin: `${base_url}google-login`,
  cleaning_frequencies: `${house_keeping}cleaning_frequencies`,
  bookings: {
    list: `${house_keeping}bookings/all`,
    create: `${house_keeping}bookings/create`,
    retrieve: `${house_keeping}bookings/<id>/retrieve`,
    delete: `${house_keeping}bookings/<id>/`,
    acknowledge: `${house_keeping}bookings/acknowledge`,
  },
  clean_types: {
    list: `${house_keeping}clean_types/all`,
    view: `${house_keeping}clean_types/<id>/view`,
  },
  paymentMethods: {
    list: `${house_keeping}payment_methods/list`,
  },
  credit_cards: {
    retrieve: `${house_keeping}credit_cards/retrieve`,
    create: `${house_keeping}credit_cards/create`,
  },
};

export async function getRequest({ endpoint, errorCallback, successCallback }) {
  await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((res) => {
          successCallback(res);
        });
      } else {
        response.json().then((res) => {
          errorCallback(-1, res);
        });
      }
    })
    .catch((error) => {
      errorCallback(0, error);
    });
}

export async function postRequest({
  endpoint,
  method,
  payload,
  errorCallback,
  successCallback,
}) {
  await fetch(endpoint, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (response.ok) {
        successCallback(response.body);
      } else {
        errorCallback(-1, response.body);
      }
    })
    .catch((error) => {
      errorCallback(0, error);
    });
}
