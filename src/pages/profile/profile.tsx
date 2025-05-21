import { ProfileUI } from '@ui-pages';
import { register } from 'module';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import {  useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUserData, updateUser } from '../../services/slices/user-slice';
import { useDispatch } from '../../services/store';

export const Profile: FC = () => {
  /** TODO: взять переменную из стора */
  const user = useSelector(selectUserData)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  if(!user){
    navigate('/login');
    return;
  }

  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
