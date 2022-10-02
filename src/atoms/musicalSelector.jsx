import { selectorFamily } from "recoil";
import axios from "axios";

const URI = {
    BASE: process.env.REACT_APP_BASE_URI
  };

const muslicalSelector = selectorFamily({
    key: 'musicalSelector',
    get: (musicalId) => async () => {
        const response = await axios.get(`${URI.BASE}/api/musicals/${musicalId}`);
        if (response.error) {
          throw response.error;
        }
        return response.data;
      }
})

export default muslicalSelector