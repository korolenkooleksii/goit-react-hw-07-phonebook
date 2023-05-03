import axios from 'axios';

axios.defaults.baseURL = 'https://6452299ea2860c9ed4038ee9.mockapi.io';
axios.defaults.params = {
  headers: { 'content-type': 'application/json' },
};

// GET request
export const fetchAllContacts = async () => {
  const response = await axios.get('/contacts');
  console.log('response - ', response.data);
};

fetchAllContacts()

// POST request
const x = {
  name: 'Olex 555',
  number: '11-7777777777-555',
};

export const postContact = async (val) => {
    console.log(val);
  await axios.post(`/contacts`, val);
  console.log('Добавили контакт');

};

// postContact(x)

// DELETE request
export const deleteContact = async (id) => {
  await axios.delete(`/contacts/${id}`);
  console.log("Удалили контакт");
};

// deleteContact(3)
