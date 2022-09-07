// Validation
export interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

export function validate(validatableObj: Validatable) {
    let isValid = true;
    if (validatableObj.required) {
        isValid = isValid && validatableObj.value.toString().trim().length !== 0;
    } 
    if (validatableObj.minLength != null && typeof validatableObj.value === 'string') {
        isValid = isValid && validatableObj.value.length >= validatableObj.minLength;
    }

    if (validatableObj.maxLength != null && typeof validatableObj.value === 'string') {
        isValid = isValid && validatableObj.value.length <= validatableObj.maxLength;
    }

    if(validatableObj.min != null && typeof validatableObj.value === 'number') {
        isValid = isValid && validatableObj.value >= validatableObj.min;
    }

    if(validatableObj.max != null && typeof validatableObj.value === 'number') {
        isValid = isValid && validatableObj.value <= validatableObj.max;
    }

    return isValid;
}