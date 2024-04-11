import { Model, Param } from "../App";
import styles from './paramEditor.module.css';

interface Props {
    params: Param[];
    model: Model;
    onClose: () => void;
    updateProductCreme: (newValue: string, paramId: number) => void;
}

export function ParamEditor({ params, model, onClose, updateProductCreme }: Props) {
    const handleChange = (id: number, newValue: string) => {
        updateProductCreme(newValue, id);
    };
    const handleClose = () => {
        onClose();
    }
    function getModel() {
        model.paramValues.forEach(element => {
            if (element.value) {
                console.log(`paramId: ${element.paramId}, value: ${element.value}`)
            }
        });
    }
    function renderEditor(): React.ReactNode {
        return params.map(element => {
            const id = element.id;
            const currentParamObj = model.paramValues.find(paramValue => paramValue.paramId === id);
            const paramValue = currentParamObj?.value;
            switch (element.type) {
                case 'string':
                    return (
                        <div key={element.id} className={styles.inputsWrap}>
                            <span className={styles.inputDescr}>{element.name}</span>
                            <input type="text"
                                defaultValue={paramValue}
                                onChange={(e) => handleChange(id, e.target.value)} />
                        </div>
                    );
                case 'number':
                    return (
                        (
                            <div key={element.id} className={styles.inputsWrap}>
                                <span className={styles.inputDescr}>{element.name}</span>
                                <input type="number"
                                    defaultValue={paramValue}
                                    onChange={(e) => handleChange(id, e.target.value)} />
                            </div>
                        )
                    );
                case 'select':
                    return null;
                default:
                    return null;
            }
        });
    }
    return (
        <div className={styles.wrap}>
            {renderEditor()}
            <button onClick={handleClose}>
                save&close
            </button>
            <button onClick={getModel}>
                {`console.log(getModel())`}
            </button>
        </div>
    );
}