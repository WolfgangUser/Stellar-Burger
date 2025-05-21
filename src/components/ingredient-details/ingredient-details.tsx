import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectIngredient } from '../../services/slices/ingredients-slice';

export const IngredientDetails: FC = () => {
  const {id} = useParams();
  if(!id)
    return <h1>No id</h1>;
  const ingredientData = useSelector(state => selectIngredient(state, id));

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
