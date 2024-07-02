export const getLocation = (pinCode) => {
  return fetch(`https://api.postalpincode.in/pincode/${pinCode}`)
    .then((response) => response.json())
    .then((data) => {
      if (data[0].Status === 'Success') {
        const { PostOffice } = data[0];
        const city = PostOffice[0].District;
        const state = PostOffice[0].State;
        const country = 'India';
        return { city, state, country };
      } else {
        return 'Pincode not found.';
      }
    })
    .catch((error) => error);
};
