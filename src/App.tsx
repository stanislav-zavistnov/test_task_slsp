import { useState } from 'react';
import styles from './App.module.css';
import { ParamEditor } from './components/ParamEditor';

export interface Param {
  id: number;
  name: string;
  type: 'string' | 'number' | 'select';
}

interface ParamValue {
  paramId: number;
  value: string;
}

export interface Model {
  paramValues: ParamValue[];
}


function App() {
  const productParametres: Param[] = [{
    id: 1,
    name: 'использование',
    type: 'string',
  },
  {
    id: 2,
    name: 'тип кожи',
    type: 'string',
  },]

  const productValues: ParamValue[] = [{
    paramId: 1,
    value: 'дневной',
  },
  {
    paramId: 2,
    value: 'сухая',
  }]

  const [isOpen, setIsOpen] = useState(false);
  const [productCreme, setProductCreme] = useState<Model>({ paramValues: productValues });
  const handleClick = () => {
    setIsOpen(prev => !prev);
  }
  const handleClose = () => {
    setIsOpen(false);
  };

  const updateProductCreme = (newValue: string, paramId: number) => {
    setProductCreme((prevProductCreme) => {
      const updatedParamValues = prevProductCreme.paramValues.map((paramValue) => {
        if (paramValue.paramId === paramId) {
          return { ...paramValue, value: newValue };
        }
        return paramValue;
      });
      return { ...prevProductCreme, paramValues: updatedParamValues };
    });
  };

  return (
    <>
      <div className={styles.product}>
        <span>КРЕМ_ВОЛШЕБНЫЙ</span>
        <button onClick={handleClick}>
          изменить
        </button>
        {isOpen && (
          <ParamEditor
            params={productParametres}
            model={productCreme}
            onClose={handleClose}
            updateProductCreme={updateProductCreme} />
        )}
      </div>
    </>
  )
}

export default App
