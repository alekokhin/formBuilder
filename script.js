/**import json file */
fetch("./form.json")
  .then(response => response.json())
  .then(data => {
    /**main element */
    const mainElement = document.getElementById('mainDiv')
    const mainForm = document.createElement('form')
    mainForm.append(mainElement)
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
    document.body.append(mainForm)
  })
  .catch(error => console.error(error))
  const createEl = (property) => {
    let element;
    if (property.type === "array") {
      element = document.createElement('div');
      property.item.forEach(itemProperty => { 
        element.append(createEl(itemProperty))
      });
    }
    if (property.type === "object") {
      element = document.createElement('div');
      property.properties.forEach(objProperty => {
        element.append(createEl(objProperty))
      });
    }
    if (!element) {
      element = property.multiline ? document.createElement('textarea') : document.createElement('input');
      element.setAttribute('type', property.type);
      element.setAttribute('name', property.name);
      element.setAttribute('placeholder', property.label);
      if (property.required) {
        element.setAttribute('required', property.required);
      }
      if (property.inputType) {
        element.setAttribute('type', property.inputType);
      }
      if (property.pattern) {
        element.setAttribute('pattern', property.pattern);
      }
      if (property.minLength && property.maxLength) {
        element.setAttribute('minLength', property.minLength);
        element.setAttribute('maxLength', property.maxLength);
      }
    }
    return element;
  }