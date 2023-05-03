import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';
import { fetchContacts } from 'redux/operations';

import ContactForm from '../ContactForm/ContactForm';
import ContactsList from '../ContactsList/ContactsList';
import Filter from '../Filter/Filter';

import { ToastContainer } from 'react-toastify';
import { Container, TitleForm, TitleContacts, Info } from './App.styled';

// import { fetchAllContacts, postContact, deleteContact } from 'services/contacts-api';

const App = () => {
  const dispatch =  useDispatch()
  const {items, isLoading, error} = useSelector(getContacts);

  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch]);

  return (
    <Container>
      <TitleForm>Phonebook</TitleForm>
      <ContactForm />

      {!items.length && <Info>No contacts.</Info>}

      {items.length > 0 && (
        <>
          <TitleContacts>Contacts</TitleContacts>
          <Filter />
        </>
      )}
      <ContactsList />
      <ToastContainer />
    </Container>
  );
};

export default App;


