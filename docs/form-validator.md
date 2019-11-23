<a name="formValidator"></a>

## formValidator
formValidator

**Kind**: global class  
**Author**: Sunmola ayokunle  
**License**: MIT  

* [formValidator](#formValidator)
    * [new formValidator(elem2Validate, options)](#new_formValidator_new)
    * [.isDisplayError](#formValidator+isDisplayError) : <code>boolean</code>
    * [.allValid](#formValidator+allValid) : <code>boolean</code>
    * [.pushElement](#formValidator+pushElement) : <code>boolean</code>
    * [.debounceTime](#formValidator+debounceTime) : <code>number</code>
    * [.debounceSetTimeout](#formValidator+debounceSetTimeout) : <code>timer</code>
    * [.dangerColor](#formValidator+dangerColor) : <code>string</code>
    * [.successColor](#formValidator+successColor) : <code>string</code>
    * [.errorHash](#formValidator+errorHash) : <code>object</code>
    * [.elem2Validate](#formValidator+elem2Validate) : <code>HTMLDivElement</code>
    * [.elem2ValidateListener](#formValidator+elem2ValidateListener) : <code>string</code>
    * [.elsInValidator](#formValidator+elsInValidator) : <code>NodeListOf.&lt;(HTMLInputElement\|HTMLSelectElement)&gt;</code>
    * [.booleanElements](#formValidator+booleanElements) : <code>Array.&lt;boolean&gt;</code>
    * [.validatorForm](#formValidator+validatorForm) : <code>HTMLFormElement</code> \| <code>null</code>
    * [.initialize(elem2Validate, startOnInit, options)](#formValidator+initialize)
    * [.setOptions(options)](#formValidator+setOptions)
    * [.startValidator()](#formValidator+startValidator)
    * [.reArrangeArr(inputEl, index, fromListener)](#formValidator+reArrangeArr)

<a name="new_formValidator_new"></a>

### new formValidator(elem2Validate, options)

| Param | Type | Description |
| --- | --- | --- |
| elem2Validate | <code>HTMLDivElement</code> | Contain the formvalidator element the form validation is taking place in |
| options | <code>\*</code> | optional parameters |

<a name="formValidator+isDisplayError"></a>

### formValidator.isDisplayError : <code>boolean</code>
**Kind**: instance property of [<code>formValidator</code>](#formValidator)  
**Summary**: display error  
<a name="formValidator+allValid"></a>

### formValidator.allValid : <code>boolean</code>
**Kind**: instance property of [<code>formValidator</code>](#formValidator)  
**Summary**: if all the inputs in the form are valid  
<a name="formValidator+pushElement"></a>

### formValidator.pushElement : <code>boolean</code>
**Kind**: instance property of [<code>formValidator</code>](#formValidator)  
**Summary**: if you want the error to push other elements below it  
<a name="formValidator+debounceTime"></a>

### formValidator.debounceTime : <code>number</code>
**Kind**: instance property of [<code>formValidator</code>](#formValidator)  
**Summary**: Amount of seconds after the user stops typing should the validatio start  
<a name="formValidator+debounceSetTimeout"></a>

### formValidator.debounceSetTimeout : <code>timer</code>
**Kind**: instance property of [<code>formValidator</code>](#formValidator)  
**Summary**: Holds an instance of setTimeout  
<a name="formValidator+dangerColor"></a>

### formValidator.dangerColor : <code>string</code>
**Kind**: instance property of [<code>formValidator</code>](#formValidator)  
**Summary**: Error input color  
<a name="formValidator+successColor"></a>

### formValidator.successColor : <code>string</code>
**Kind**: instance property of [<code>formValidator</code>](#formValidator)  
**Summary**: Success input color  
<a name="formValidator+errorHash"></a>

### formValidator.errorHash : <code>object</code>
**Kind**: instance property of [<code>formValidator</code>](#formValidator)  
**Summary**: contains a object with the key as error type and the value as the error text  
<a name="formValidator+elem2Validate"></a>

### formValidator.elem2Validate : <code>HTMLDivElement</code>
**Kind**: instance property of [<code>formValidator</code>](#formValidator)  
**Summary**: Contain the formvalidator element the form validation is taking place in  
<a name="formValidator+elem2ValidateListener"></a>

### formValidator.elem2ValidateListener : <code>string</code>
**Kind**: instance property of [<code>formValidator</code>](#formValidator)  
**Summary**: Event listener for input elements. default is input  
<a name="formValidator+elsInValidator"></a>

### formValidator.elsInValidator : <code>NodeListOf.&lt;(HTMLInputElement\|HTMLSelectElement)&gt;</code>
**Kind**: instance property of [<code>formValidator</code>](#formValidator)  
**Summary**: Input elements in the validator  
<a name="formValidator+booleanElements"></a>

### formValidator.booleanElements : <code>Array.&lt;boolean&gt;</code>
**Kind**: instance property of [<code>formValidator</code>](#formValidator)  
**Summary**: Holds the truth values of each element in the validator length is the number of input elements to validate  
<a name="formValidator+validatorForm"></a>

### formValidator.validatorForm : <code>HTMLFormElement</code> \| <code>null</code>
**Kind**: instance property of [<code>formValidator</code>](#formValidator)  
**Summary**: form in the validator  
<a name="formValidator+initialize"></a>

### formValidator.initialize(elem2Validate, startOnInit, options)
**Kind**: instance method of [<code>formValidator</code>](#formValidator)  
**Summary**: initialize all the necessary variables for validation to be complete  

| Param | Type | Description |
| --- | --- | --- |
| elem2Validate | <code>HTMLDivElement</code> | Contain the formvalidator element the form validation is taking place in |
| startOnInit | <code>boolean</code> | Should the validation be called as soon as you call the constructor or should it wait for user input |
| options | <code>\*</code> | optional parameters |

<a name="formValidator+setOptions"></a>

### formValidator.setOptions(options)
**Kind**: instance method of [<code>formValidator</code>](#formValidator)  
**Summary**: sets options passed to the formValidator  

| Param | Type |
| --- | --- |
| options | <code>object</code> | 

<a name="formValidator+startValidator"></a>

### formValidator.startValidator()
**Kind**: instance method of [<code>formValidator</code>](#formValidator)  
**Summary**: starts the validation process  
<a name="formValidator+reArrangeArr"></a>

### formValidator.reArrangeArr(inputEl, index, fromListener)
**Kind**: instance method of [<code>formValidator</code>](#formValidator)  
**Summary**: vaidator for each input  

| Param | Type | Description |
| --- | --- | --- |
| inputEl | <code>HtmlInputElement</code> \| <code>HTMLSelectElement</code> \| <code>HTMLTextAreaElement</code> | input element to validate |
| index | <code>number</code> | element index in the erray |
| fromListener | <code>boolean</code> | if the function was called by user input |

