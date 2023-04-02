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
        element = createEl(property)
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
      let newArrayEl,removeButton
      element = document.createElement('div');
      property.item.forEach(itemProperty => { 
        element.append(createEl(itemProperty))
      
      });
      const addButton = document.createElement('input')
      addButton.setAttribute('type','button')
      addButton.setAttribute('value', 'Add')
      addButton.addEventListener('click', () => {
        newArrayEl = createEl(property.item[0])
        removeButton = document.createElement('input')
        removeButton.setAttribute('type','button')
        removeButton.setAttribute('value', 'Remove')
        removeButton.addEventListener('click', () => {
          newArrayEl.remove()
        })
        newArrayEl.append(removeButton)
        element.append(newArrayEl)
      })
      element.append(addButton) 
    }
    if (property.type === "enum") {
      element = document.createElement('select');
      property.options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.setAttribute('value', option.value);
        optionElement.textContent = option.label;
        element.append(optionElement);
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