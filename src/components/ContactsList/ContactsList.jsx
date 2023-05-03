import { useSelector, useDispatch } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { deleteContact } from 'redux/operations';
import { TbPoint } from 'react-icons/tb';

import {
  ItemContacts,
  ListContacts,
  ButtonDelete,
} from './ContactsList.styled';

const ContactsList = () => {
  const {items} = useSelector(getContacts);
  const dispatch = useDispatch();
  const currentFilter = useSelector(getFilter);
  const visibleContacts = items.filter(el =>
    el.name.toLowerCase().includes(currentFilter.toLowerCase())
  );

  return (
    <ListContacts>
      {visibleContacts.map(({ name, number, id }) => (
        <ItemContacts key={id}>
          <TbPoint />
          {name}: {number}
          <ButtonDelete
            type="button"
            onClick={() => {
              dispatch(deleteContact(id));
            }}
          >
            Delete
          </ButtonDelete>
        </ItemContacts>
      ))}
    </ListContacts>
  );
};

export default ContactsList;
