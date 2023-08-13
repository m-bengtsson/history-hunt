import axios from 'axios'

const API_KEY = 'AIzaSyByGJY9YjH2vMAMFSOppV7ww-npVVkPPhc'

export const signupUser = async (email, password) => {
   const resp = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      {
         email,
         password,
         returnSecureToken: true,
      }
   );
};