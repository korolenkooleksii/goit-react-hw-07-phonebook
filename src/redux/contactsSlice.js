import { createSlice, nanoid } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
  contacts: [],
  filter: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: {
      reducer(state, action) {

        const duplicate = state.contacts.some(
          contact =>
            contact.name.toLowerCase() ===
            action.payload.name.toLowerCase().trim()
        );
        
        if (duplicate) {
          toast.warn(`${action.payload.name} is already in contacts.`, {
            theme: 'colored',
          });
        } else {
          state.contacts.push(action.payload);
        }

      },
      prepare({ name, number }) {
        return {
          payload: {
            name,
            number,
            id: nanoid(),
          },
        };
      },
    },
    removeContact(state, action) {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
    filter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const contactsReducer = contactsSlice.reducer;

export const { addContact, removeContact, filterContacts, filter } =
  contactsSlice.actions;



