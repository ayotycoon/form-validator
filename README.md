# Form-validator

A simple to use, light weight form validator for your html files


## Installation

copy both css and js files from lib folder to your working directory , and import them.

it is important to place the form-validator.js file at the closing body tag

```bash
...
<link href="css/form-validator.css" rel="stylesheet" type="text/css">
<script src="js/form-validator.js"></script>

</body>
</html>
```




## Usage

Wrap the element you want to validate in a ```form-validator``` html class. If it is a form, make sure the form is in the validator class

```html

<div class="form-validator">
<form>
<input data-validate="required|price">
...
...
</form>

</div>
```
### Call the formValidator class in your js file

#### if you have multiple validator classes

```javascript
const validators = document.querySelector('.form-validator');
validators.forEach(el => new formValidator(validator));
```
#### if you have a single validator class

```javascript
const validator = document.querySelectorAll('.form-validator');
 new formValidator(validator);
```
#### optional parameters
```javascript
const validator = document.querySelectorAll('.form-validator');
// all options here are optional
const options = {
    
     
        sortedArr: false // set to true if your error attributes follows this format ['number', 'decimal', 'price', 'required', 'regex', 'max', 'min', 'not']
        pushElement: false // if you want the error to push other elements below it
        debounceTime : 1000, // how many seconds from when the user stops typing should the validation start. set to 0 if you want it immediate
        elem2ValidateListener :  'input', // what event listner? default is input
        dangerColor :  '#ffd9d7bd', // color of input element and error text when the validaror detects an error
        successColor :  'white'; // color of input element and error text when the validaror corrects a error. default is white. try using  #d4edda

}
 new formValidator(validator, options);
```

#### validator class attribues


```html

<div class="form-validator" data-validate-init="true" data-validate-submit="spinner()" >


<!---

`data-validate-init`: defaults to false. input true This tells the form-validator if you want the validation to start as soon as the class is called or remove the attribute if you want form-validator to wait for events before throwing errors

`data-validate-submit`: if you want some function to run after the validation is successful

-->


<form>
<input data-validate="required|price">
...
...
</form>

</div>
```

#### input validation attribues
##### data-validate
```html
<!-- This is the only attribute required for a validation to start-->

<!--on the input element you want to validate, use the `data-validate` attribute to set type of validation-->
<input data-validate="required|price">
<!--- 
data-validate attribute can be any of these


'required' // input cannot be blank
'number' // input must be a number
'decimal' // input must be a decimal
'price' // input must be a price
'regex' // input must match the value in the `regex` attribute of the input element
'max' // input must not be more than the  value in the `max` attribute of the input element
'min' // input must not be lower than the  value in the `min` attribute of the input element
'not' // input must not match the value in the `not` attribute of the input element


validation types should follow this format. number should not come before required

 --->

 ```
##### data-validate-name
```html
<!-- By default, form-validator uses the text in the name attribute to reference errors, you can use this attribute to set your custom name-->


<select data-validate="required|min" min="0" name="product_id" data-validate-name="Product">
<option value="0"> No product</option>
<option value="1"> Shoes</option>
<option value="2"> Bags</option>
</select>
<!--- 

instead of `product_id field is required`, the error ill be `product is required`


 --->

 ```
##### data-validate-errors
```html
<!--You can use this attribute to customixe the errors for all or some of the validations, use `|` to seprate texts -->


<select data-validate="required|min" min="0" name="product_id" data-validate-errors="You must select a product| You cannot select this product">
<option value="0"> No product</option>
<option value="1"> Shoes</option>
<option value="2"> Bags</option>
</select>

<!--- 
You can also skip a type of validation by leaving it blank
 --->
 <textarea data-validate="required|min|max" min="19" max="30" name="product_discription" data-validate-name="Discription" data-validate-errors="You must type a product discription||Maximum character is 30">

</textarea>
<!--- 
the validator automatically uses the default text as the validation for `min`
 --->

 ```



## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)