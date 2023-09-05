import { useSelector, useDispatch } from 'react-redux';
import {
  selectCount,
} from './counterSlice';

export function Counter() {
  const count = useSelector(selectCount);

  const dispatch = useDispatch();

  return (
    <>
    
      
    </>
  );
}
