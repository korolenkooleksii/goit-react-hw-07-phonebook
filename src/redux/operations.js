import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://6452299ea2860c9ed4038ee9.mockapi.io';
axios.defaults.params = {
  headers: { 'content-type': 'application/json' },
};

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
    //   console.log('response - ', response.data);
      return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
  }
);

// export const fetchContacts = async () => {
//     const response = await axios.get('/contacts');
//     console.log('response - ', response.data);
//     return response;
//   };

fetchContacts();

/*
fetchContacts -  (метод GET) запросом. Базовый тип экшена "contacts/fetchAll".
addContact - (метод POST). Базовый тип экшена "contacts/addContact".
deleteContact -  (метод DELETE). Базовый тип экшена "contacts/deleteContact".
*/
