
class formValidator {
    isDisplayError = false;
    allValid = false;
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
        not: ' field can not be ',
        regex: ' field is not valid '
    }
    /** Contain the formvalidator element the form validation is taking place in */
    elem2Validate;
    /** Event listener for input elements. default is input*/
    elem2ValidateListener = 'input';
    /** Input elements in the validator  */
    elsInValidator;
    /** Holds the truth values of each element in the validator */
    booleanElements = []

    /** form in the validator */
    validatorForm;
    constructor(elem2Validate,  options) {
        const startOnInit = validator.getAttribute('data-validate-init') ? true : false;
        this.initialize(elem2Validate, startOnInit, options)

    }
    initialize(elem2Validate, startOnInit, options) {
        if (options) {
            setOptions(options);
        }
        if (startOnInit) {
            this.isDisplayError = true;
        }
        this.elem2Validate = elem2Validate;
        this.elsInValidator = this.elem2Validate.querySelectorAll('[data-validate]');
        this.booleanElements = []
        this.elsInValidator.forEach(el => this.booleanElements.push(false));


        // get the form in the validator
        this.elem2ValidateForm = this.elem2Validate.querySelector('form');
        this.startValidator();
        this.listenInnerForm();
    }
    setOptions(options) {
        this.debounceTime = options.debounceTime || 1000;
        this.elem2ValidateListener = options.elem2ValidateListener || 'input';
        this.dangerColor = options.dangerColor || '#ffd9d7bd';
        this.successColor = options.successColor || 'white'; //#d4edda

    }
    startValidator() {
        if (this.elsInValidator.length == 0) {
            this.allValid = true;
            return;
        }


        for (let index = 0; index < this.elsInValidator.length; index++) {
            const inputEl = this.elsInValidator[index];

            // check if they have a data validate attr
            const validatorsStr = inputEl.getAttribute('data-validate');


            if (!validatorsStr) {
                continue;
            }

            this.eachInputValidate(inputEl, index);

            if (inputEl.nodeName == 'INPUT' || inputEl.nodeName == 'TEXTAREA') {
                inputEl.addEventListener(this.elem2ValidateListener, () => {
                    if (this.debounceSetTimeout) {
                        clearTimeout(this.debounceSetTimeout);
                    }
                    this.debounceSetTimeout = setTimeout(() => this.eachInputValidate(inputEl, index, true), this.debounceTime);


                })
            } else if (inputEl.nodeName == 'SELECT') {

                inputEl.addEventListener('change', () => {
                    this.eachInputValidate(inputEl, index, true)
                })

            }

        }
    }
    eachInputValidate(inputEl, index, fromListener) {

        const validatorsStr = inputEl.getAttribute('data-validate');

        if (!validatorsStr) {
            return;
        }
        const validatorsErrorStr = inputEl.getAttribute('data-validate-errors');
        let validatorsErrorArr = [];
        if (validatorsErrorStr) {
            validatorsErrorArr = validatorsErrorStr.split('|');
        }

        const value = inputEl.value ? inputEl.value.trim() : '';
        let fieldName = inputEl.getAttribute('name'); // name attr
        fieldName = fieldName ? fieldName : 'This '; // if no name property set it as this
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


                        return this.displayError(inputEl, validatorsErrorArr[valIndex] ? validatorsErrorArr[valIndex] : fieldName + ' ' + this.errorHash['required'], fromListener);

                    } else {

                        this.clearError(inputEl, index, valIndex == validatorsArr.length - 1);

                    }

                    break;
                case 'number':
                    const intVal = parseInt(value);
                    if (value != intVal) {

                        return this.displayError(inputEl, validatorsErrorArr[valIndex] ? validatorsErrorArr[valIndex] : fieldName + ' ' + this.errorHash['number'], fromListener);

                    } else {

                        this.clearError(inputEl, index, valIndex == validatorsArr.length - 1);

                    }
                    inputType = 'number';

                    break;
                case 'decimal':
                    const floatVal = parseFloat(value);


                    if (value != floatVal) {

                        return this.displayError(inputEl, validatorsErrorArr[valIndex] ? validatorsErrorArr[valIndex] : fieldName + ' ' + this.errorHash['decimal'], fromListener);

                    } else {

                        this.clearError(inputEl, index, valIndex == validatorsArr.length - 1);

                    }
                    inputType = 'decimal';
                    break;
                case 'price':
                    const regex = value.match(/(\d+(\.)?(\d{1,2})?)/);


                    if (!regex) {

                        return this.displayError(inputEl, validatorsErrorArr[valIndex] ? validatorsErrorArr[valIndex] : fieldName + ' ' + this.errorHash['price'], fromListener);

                    } else {

                        inputEl.value = regex[0];
                        this.clearError(inputEl, index, valIndex == validatorsArr.length - 1)

                    }
                    inputType = 'price';
                    break;
                case 'regex':
                    const regexValue = inputEl.getAttribute('regex');
                    if (!regexValue) {
                        return;
                    }

                    if (!value.match(new RegExp(regexValue))) {

                        return this.displayError(inputEl, validatorsErrorArr[valIndex] ? validatorsErrorArr[valIndex] : fieldName + ' ' + this.errorHash['regex'], fromListener);

                    } else {

                        this.clearError(inputEl, index, valIndex == validatorsArr.length - 1)

                    }
                    inputType = 'price';
                    break;

                case 'max':
                    const maxValue = parseInt(inputEl.getAttribute('max')) ? parseInt(inputEl.getAttribute('max')) : 0;

                    // check if its sizeable
                    if (inputType == 'number' || inputType == 'decimal' || inputType == 'price') {
                        if ((parseInt(value) > maxValue || parseFloat(value) > maxValue)) {

                            return this.displayError(inputEl, validatorsErrorArr[valIndex] ? validatorsErrorArr[valIndex] : fieldName + ' ' + this.errorHash['max'] + maxValue, fromListener)

                        } else {

                            this.clearError(inputEl, index, valIndex == validatorsArr.length - 1)

                        }
                    }


                    // check if its text
                    if (inputType == 'text') {
                        if (value.length > maxValue) {

                            return this.displayError(inputEl, validatorsErrorArr[valIndex] ? validatorsErrorArr[valIndex] : `${fieldName} ${this.errorHash['max']} ${maxValue}  Characters. Remove ${value.length - maxValue}`, fromListener)

                        } else {

                            this.clearError(inputEl, index, valIndex == validatorsArr.length - 1)

                        }
                    }

                    break;
                case 'min':
                    const minValue = parseInt(inputEl.getAttribute('min')) ? parseInt(inputEl.getAttribute('min')) : 0;
                    if (inputType == 'number' || inputType == 'decimal' || inputType == 'price') {
                        if ((parseInt(value) < minValue || parseFloat(value) < minValue)) {


                            return this.displayError(inputEl, validatorsErrorArr[valIndex] ? validatorsErrorArr[valIndex] : fieldName + ' ' + this.errorHash['min'] + minValue, fromListener)

                        } else {

                            this.clearError(inputEl, index, valIndex == validatorsArr.length - 1)

                        }
                    }


                    if (inputType == 'text') {
                        if (value.length < minValue) {

                            return this.displayError(inputEl, validatorsErrorArr[valIndex] ? validatorsErrorArr[valIndex] : `${fieldName}  ${this.errorHash['min']}  ${minValue} Characters. Remaining ${minValue - value.length}`, fromListener)

                        } else {

                            this.clearError(inputEl, index, valIndex == validatorsArr.length - 1);

                        }
                    }



                    break;
                case 'not':
                    const notStr = inputEl.getAttribute('not');
                    if (!notStr) {
                        continue
                    }


                    if (value == notStr) {

                        return this.displayError(inputEl, validatorsErrorArr[valIndex] ? validatorsErrorArr[valIndex] : fieldName + ' ' + this.errorHash['not'] + notStr, fromListener)

                    } else {

                        this.clearError(inputEl, index, valIndex == validatorsArr.length - 1);
                    }

                    break;

                default:

                    break;
            }

        }

    }

    displayError(inputEl, error, fromListener) {
        this.allValid = false;

        if (!this.isDisplayError && !fromListener) {
            return;
        }



        if (inputEl) {
            inputEl.style.position = 'relative';
            inputEl.style.flex = 'auto';

            inputEl.style.backgroundColor = this.dangerColor;
            const inputErrorEl = inputEl.parentNode.querySelector('.validatorErrorDisplay');

            if (!inputErrorEl) {



                const errorDisplay = document.createElement('div');
                errorDisplay.style.backgroundColor = this.dangerColor;
                errorDisplay.style.color = '#85221c';
                errorDisplay.style.padding = '10px';
                errorDisplay.style.borderBottomLeftRadius = '10px';
                errorDisplay.style.borderBottomRightRadius = '10px';
                errorDisplay.style.top = inputEl.offsetHeight + 'px';

                errorDisplay.style.width = inputEl.clientWidth + 'px';

                errorDisplay.innerText = error;
                errorDisplay.className = 'validatorErrorDisplay';






                const wrapper = document.createElement('span');
                wrapper.style.position = 'relative';
                wrapper.style.width = inputEl.clientWidth + 'px';
                wrapper.className = 'validatorErrorWrapper'

                wrapper.style.display = 'flex';
                wrapper.style.flexWrap = 'wrap';




                // wrap the input el inside wrapper
                inputEl.parentNode.insertBefore(wrapper, inputEl);
                // move the inputel to the wrapper
                wrapper.appendChild(inputEl);
                // move the error too
                wrapper.appendChild(errorDisplay);
            } else {

                inputErrorEl.innerText = error;
            }

            inputEl.focus();

        } else {
            // this means error was from the form
            // get the wrapper

            document.querySelector('.validatorErrorDisplay').scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' });
        }



    }
    clearError(inputEl, index, lastValidation) {

        if (lastValidation) {
            this.booleanElements[index] = true;
        }
        inputEl.style.backgroundColor = this.successColor;

        const wrapper = inputEl.parentElement;
        const inputErrorEl = wrapper.querySelector('.validatorErrorDisplay');

        if (!inputErrorEl) {
            return;

        }

        wrapper.style.display = 'none';

        // imeret the el before the wrapper
        wrapper.parentNode.insertBefore(inputEl, wrapper);

        // remove the wrapper
        wrapper.parentElement.removeChild(wrapper)


        inputEl.focus();
        return



    }


    listenInnerForm() {
        if (!this.elem2ValidateForm) {
            return;
        }
        // size,option , word

        this.elem2ValidateForm.addEventListener('submit', (event) => {

            for (let i = 0; i < this.booleanElements.length; i++) {
                const val = this.booleanElements[i];
                if (!val) {
                    break
                }
                if (i == this.booleanElements.length - 1) {
                    this.allValid = true;
                }

            }



            console.log(this.isDisplayError, this.allValid)
            if (!this.isDisplayError && !this.allValid) {
                event.preventDefault();
                this.isDisplayError = true;
                this.initialize(this.elem2Validate, true);
                return
            }


            // this.initialize(this.elem2Validate, true)

            if (document.querySelector('.validatorErrorDisplay')) {
                event.preventDefault();
                this.displayError(null, "Please check This form for errors")
                return;
            }
            const submitAction = this.elem2Validate.getAttribute('data-validate-submit');
            if (submitAction) {
                new Function(submitAction)();
            }
        })
    }
}