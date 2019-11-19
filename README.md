# html-form-validator
Form-validator
copy the form-validator css and js files from src folder to use


## Installation

copy both css and js files from lib folder to your working directory 

```bash
...
<link href="css/form-validator.css" rel="stylesheet" type="text/css">
<script src="js/form-validator.js"></script>

</body>
</html>
```




## Usage

Wrap the form element you want to validate in a ```formvalidator``` class

```html

<div class="form-validator">
<form>
<input data-validate="required">
...
...
</form>

</div>
```
Call the formValidator class in your js file

#if you have multiple validator classes

```javascript
const validators = document.querySelectorAll('.form-validator');
validators.forEach(el => new formValidator(validator, true););
```
#if you have a single validator class

```javascript
const validator = document.querySelectorAll('.form-validator');
 new formValidator(validator, true);
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)