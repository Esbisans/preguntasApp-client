import {useState} from 'react';

export const useForm = (initState={}) => {

    const [values, setValues] = useState(initState);

    const reset = () => {
        setValues(initState);
    }

    const handleInputChange = ({target}) => {
        setValues({
            ...values,
            [target.name] : target.value
        });
    }

    return [values, handleInputChange, reset, setValues];

}