
class formValidator {
    init;
    allValid = true;
    debounceTime = 1000;
    debounceSetTimeout;
    dangerColor = '#ffd9d7bd';
    successColor = 'white'; //#d4edda
    errorHash = {
        required: ' field is required',
        number: ' field must be a valid number',
        decimal: ' field must be a valid decimal',
        price: ' field must be a valid Price',
        max: ' field can not be greater than ',
        min: ' field can not be less than ',
        regex: ' field is not valid '
    }
    validator;
    validatorListener;
    elsInValidator;
    // get the form in the validator
    validatorForm;
    constructor(validator, init) {
        this.init = init;
        this.validator = validator;
        this.validatorListener = this.validator.getAttribute("data-validate-listener");
        this.elsInValidator = this.validator.querySelectorAll('[name]');
        // get the form in the validator
        this.validatorForm = this.validator.querySelector('form');
        this.startValidator();
        this.listenInnerForm();
    }
    startValidator() {

        for (let index = 0; index < this.elsInValidator.length; index++) {
            const inputEl = this.elsInValidator[index];
            // check if they have a data validate attr
            const validatorsStr = inputEl.getAttribute('data-validate');


            if (!validatorsStr) {
                continue;
            }
            if (this.init) {
                this.eachInputValidate(inputEl);
            }
            inputEl.addEventListener(this.validatorListener, () => {
                if (this.debounceSetTimeout) {
                    clearTimeout(this.debounceSetTimeout);
                }
                this.debounceSetTimeout = setTimeout(() => this.eachInputValidate(inputEl), this.debounceTime);


            })
        }
    }
    eachInputValidate(inputEl) {
        const validatorsStr = inputEl.getAttribute('data-validate');

        if (!validatorsStr) {
            return;
        }
        const validatorsErrorStr = inputEl.getAttribute('data-validate-errors');
        let validatorsErrorArr = [];
        if (validatorsErrorStr) {
            validatorsErrorArr = validatorsErrorStr.split('|');
        }

        const value = inputEl.value.trim();
        let fieldName = inputEl.getAttribute('name'); // name attr
        const dataName = inputEl.getAttribute('data-validate-name'); // name attr
        if (dataName) {
            fieldName = dataName;
        }
        const validatorsArr = validatorsStr.split('|');
        const validatorsHash = {};

        let inputType = 'text';

        for (let valIndex = 0; valIndex < validatorsArr.length; valIndex++) {
            const validateType = validatorsArr[valIndex].trim();
            validatorsHash[validateType] = true;



            switch (validateType) {
                case 'required':
                    if ((value == '') || value == null) {

                        inputEl.style.backgroundColor = this.dangerColor;
                        return this.displayError(inputEl, validatorsErrorArr[valIndex] ? validatorsErrorArr[valIndex] : fieldName + ' ' + this.errorHash['required']);

                    } else {
                        inputEl.style.backgroundColor = this.successColor;
                        this.clearError(inputEl);

                    }

                    break;
                case 'number':
                    const intVal = parseInt(value);
                    if (value != intVal) {
                        inputEl.style.backgroundColor = this.dangerColor;
                        return this.displayError(inputEl, validatorsErrorArr[valIndex] ? validatorsErrorArr[valIndex] : fieldName + ' ' + this.errorHash['number']);

                    } else {
                        inputEl.style.backgroundColor = this.successColor;
                        this.clearError(inputEl);

                    }
                    inputType = 'number';

                    break;
                case 'decimal':
                    const floatVal = parseFloat(value);


                    if (value != floatVal) {
                        inputEl.style.backgroundColor = this.dangerColor;
                        return this.displayError(inputEl, validatorsErrorArr[valIndex] ? validatorsErrorArr[valIndex] : fieldName + ' ' + this.errorHash['decimal']);

                    } else {
                        inputEl.style.backgroundColor = this.successColor;
                        this.clearError(inputEl);

                    }
                    inputType = 'decimal';
                    break;
                case 'price':
                    const regex = value.match(/(\d+(\.)?(\d{1,2})?)/);


                    if (!regex) {
                        inputEl.style.backgroundColor = this.dangerColor;
                        return this.displayError(inputEl, validatorsErrorArr[valIndex] ? validatorsErrorArr[valIndex] : fieldName + ' ' + this.errorHash['price']);

                    } else {
                        inputEl.style.backgroundColor = this.successColor;
                        inputEl.value = regex[0];
                        this.clearError(inputEl)

                    }
                    inputType = 'price';
                    break;
                case 'regex':
                    const regexValue = inputEl.getAttribute('regex');
                    if (!regexValue) {
                        return;
                    }

                    if (!value.match(new RegExp(regexValue))) {
                        inputEl.style.backgroundColor = this.dangerColor;
                        return this.displayError(inputEl, validatorsErrorArr[valIndex] ? validatorsErrorArr[valIndex] : fieldName + ' ' + this.errorHash['regex']);

                    } else {
                        inputEl.style.backgroundColor = this.successColor;
                        this.clearError(inputEl)

                    }
                    inputType = 'price';
                    break;

                case 'max':
                    const maxValue = parseInt(inputEl.getAttribute('max')) ? parseInt(inputEl.getAttribute('max')) : 5;

                    // check if its sizeable
                    if (inputType == 'number' || inputType == 'decimal' || inputType == 'price') {
                        if ((parseInt(value) >= maxValue || parseFloat(value) >= maxValue)) {
                            inputEl.style.backgroundColor = this.dangerColor;
                            return this.displayError(inputEl, validatorsErrorArr[valIndex] ? validatorsErrorArr[valIndex] : fieldName + ' ' + this.errorHash['max'] + maxValue)

                        } else {
                            inputEl.style.backgroundColor = this.successColor;
                            this.clearError(inputEl)

                        }
                    }


                    // check if its text
                    if (inputType == 'text') {
                        if (value.length >= maxValue) {
                            inputEl.style.backgroundColor = this.dangerColor;
                            return this.displayError(inputEl, validatorsErrorArr[valIndex] ? validatorsErrorArr[valIndex] : fieldName + ' ' + this.errorHash['max'] + maxValue + ' Characters')

                        } else {
                            inputEl.style.backgroundColor = this.successColor;
                            this.clearError(inputEl)

                        }
                    }

                    break;
                case 'min':
                    const minValue = parseInt(inputEl.getAttribute('min')) ? parseInt(inputEl.getAttribute('min')) : 5;
                    if (inputType == 'number' || inputType == 'decimal' || inputType == 'price') {
                        if ((parseInt(value) < minValue || parseFloat(value) < minValue)) {

                            inputEl.style.backgroundColor = this.dangerColor;
                            return this.displayError(inputEl, validatorsErrorArr[valIndex] ? validatorsErrorArr[valIndex] : fieldName + ' ' + this.errorHash['min'] + minValue)

                        } else {
                            inputEl.style.backgroundColor = this.successColor;
                            this.clearError(inputEl)

                        }
                    }


                    if (inputType == 'text') {
                        if (value.length < minValue) {
                            inputEl.style.backgroundColor = this.dangerColor;
                            return this.displayError(inputEl, validatorsErrorArr[valIndex] ? validatorsErrorArr[valIndex] : fieldName + ' ' + this.errorHash['min'] + minValue + ' Characters')

                        } else {
                            inputEl.style.backgroundColor = this.successColor;
                            this.clearError(inputEl);

                        }
                    }



                    break;

                default:
                    break;
            }

        }

    }
    displayError(inputEl, error) {
        this.allValid = false;
        if (inputEl) {
            const inputErrorEl = inputEl.parentElement.querySelector('.validatorErrorDisplay');

            if (!inputErrorEl) {
                const errorDisplay = document.createElement('div');
                errorDisplay.style.backgroundColor = this.dangerColor;
                errorDisplay.style.color = '#85221c';
                errorDisplay.style.padding = '10px';
                errorDisplay.style.borderBottomLeftRadius = '10px';
                errorDisplay.style.borderBottomRightRadius = '10px';
                errorDisplay.style.top = inputEl.offsetHeight + 'px';
                errorDisplay.style.maxWidth = inputEl.offsetWidth + 'px';

                errorDisplay.innerText = error;
                errorDisplay.className = 'validatorErrorDisplay';
                inputEl.parentElement.appendChild(errorDisplay);
            } else {
                inputErrorEl.innerText = error;
            }

        } else {
            // this means error was from the form
            document.querySelector('.validatorErrorDisplay').scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        }



    }
    clearError(inputEl) {
        const inputErrorEl = inputEl.parentElement.querySelector('.validatorErrorDisplay');

        if (!inputErrorEl) {
            return;
        }

        inputErrorEl.parentElement.removeChild(inputErrorEl)
        return



    }

    listenInnerForm() {
        if (!this.validatorForm) {
            return;
        }
        this.validatorForm.addEventListener('submit', (event) => {
            if (!this.allValid) {
                event.preventDefault();
                this.displayError(null, "Please check This form for errors")
                return;
            }
            const submitAction = this.validatorForm.getAttribute('data-validate-submit');
            if (submitAction) {
                new Function(submitAction)();
            }

        })
    }




}












const validators = document.querySelector('.form-validator');
const validator = validators;
if (validator) {
    new formValidator(validator, true);
}










