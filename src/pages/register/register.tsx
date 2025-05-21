import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { registerUser, selectIsAuthed, selectRegisterError } from '../../services/slices/user-slice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector(selectRegisterError);
  const navigate = useNavigate();
  const isAuthed = useSelector(selectIsAuthed);

  useEffect(() => {
    if (isAuthed) {
      navigate('/');
    }
  }, [isAuthed, navigate]);

  const dispatch = useDispatch()
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser({email, name: userName, password}))
  };


  return (
    <RegisterUI
      errorText={error?.message || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
