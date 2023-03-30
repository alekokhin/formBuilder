/**import json file */
fetch("./form.json")
  .then(response => response.json())
  .then(data => {
    /**main element */
    const mainElement = document.getElementById('mainDiv')
    //**loop for each element */
    data.properties.forEach(property => {
      let element, label
      label = document.createElement('label');
      label.textContent = property.label;
      mainElement.append(label)
      if (property.options) {
        element = document.createElement('select');
        property.options.forEach(option => {
          const optionElement = document.createElement('option');
          optionElement.setAttribute('value', option.value);
          optionElement.textContent = option.label;
          element.appendChild(optionElement);
        });
      } else if (property.properties) {
        property.properties.forEach(objProperty => {
          element = createEl(objProperty)
          mainElement.append(element)
        });
      } else if (property.item) {
        property.item.forEach(itemProperty => {
          itemProperty.properties.forEach(objProperty => {
            element = createEl(objProperty)
            mainElement.append(element)
          });
        });
      } else {
        element = createEl(property)
      }
      mainElement.append(element)
    })
    /**submit button */
    const submitButton = document.createElement('input');
    submitButton.setAttribute('type', 'submit');
    submitButton.textContent = 'Submit';
    mainElement.append(submitButton);
  })
  .catch(error => console.error(error))
function createEl(property) {
  let element
  property.multiline ? element = document.createElement('textarea') : element = document.createElement('input')
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
  return element
}