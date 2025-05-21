import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser, selectIsAuthed, selectLoginError } from '../../services/slices/user-slice';
import { useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isAuthed = useSelector(selectIsAuthed);
  const loginError = useSelector(selectLoginError);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
      if (isAuthed) {
        navigate('/');
      }
    }, [isAuthed, navigate]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({email, password}))

  };

  return (
    <LoginUI
      errorText={loginError?.message || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
