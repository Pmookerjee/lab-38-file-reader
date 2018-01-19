'use strict';

export const renderIf = (test, component) => test ? component : undefined;

export const filePreview = file => {
  
  let reader  = new FileReader();
  
    reader.addEventListener('load', function () {
      return reader.result;
    }, false);
  
    if(file) return reader.readAsDataURL(file);
    throw new Error('Error reading file');      
}