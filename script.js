/**import json file */
fetch("./form.json")
  .then(response => response.json())
  .then(data => {
    /**main element */
    const mainElement = document.getElementById('maindiv')
    //**loop for each element */
    data.properties.forEach(property => {
      let element
      element = document.createElement('input')
      property.type === 'boolean' ? element.setAttribute('type', "checkbox") : element.setAttribute('type', property.type)
      element.setAttribute('name', property.name)
      element.setAttribute('placeholder', property.label)
      if (property.required) {
        element.setAttribute('required', property.required);
      }
      if (property.inputType) {
        element.setAttribute('type', property.inputType)
      }
      if (property.pattern) {
        element.setAttribute('pattern', property.pattern)
      }
      if (property.minLength && property.maxLength) {
        element.setAttribute('minLength', property.minLength)
        element.setAttribute('maxLength', property.maxLength)
      }

      //add element 
      mainElement.append(element)

    })
    /**submit button */
    const submitButton = document.createElement('input');
      submitButton.setAttribute('type', 'submit');
      submitButton.textContent = 'Submit';
mainElement.append(submitButton);
  })
  .catch(error => console.error(error))