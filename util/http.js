import axios from 'axios'

const API_KEY = 'AIzaSyByGJY9YjH2vMAMFSOppV7ww-npVVkPPhc'

const authenticate = async (mode, email, password) => {
   const resp = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`,
      {
         email,
         password,
         returnSecureToken: true,
      }
   );
   console.log('id token', JSON.stringify(resp))
   return resp.data.idToken;
}

export const signupUser = async (email, password) => {
   return authenticate('signUp', email, password)
};

export const signinUser = async (email, password) => {
   return authenticate('signInWithPassword', email, password)
};

export const updateUser = async (displayName, idToken) => {
   const resp = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
      {
         idToken,
         displayName,
         //photoUrl,
         returnSecureToken: true
      }
   );
   console.log('name', resp.data.displayName)
   return resp.data.localId;
};

/* const storeHunt = (hunt) => {

   axios.post(`https://history-hunt-f8704-default-rtdb.europe-west1.firebasedatabase.app/hunts`, hunt)

} */