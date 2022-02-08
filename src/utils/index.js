export * from "./constants"; //Automatically Exports all the Named Exports from constants

// Function to set item in localstorage
export const setItemInLocalStorage = (key, value) => {
    if(!key || !value){
        return console.error("Cannot store in LocalStorage");
    }

    // If user provides json, convert it to string, else if its string, then store it as it is
    const valueToStore = typeof value !== "string" ? JSON.stringify(value) : value;

    localStorage.setItem(key,valueToStore);
}

// Function to get item from localstorage
export const getItemFromLocalStorage = (key) => {
    if(!key){
        return console.error("Cannot get value from LocalStorage");
    }

    localStorage.getItem(key);
}

// Function to remove item from localstorage
export const removeItemFromLocalStorage = (key) => {
    if(!key){
        return console.error("Cannot remove value from LocalStorage");
    }

    localStorage.removeItem(key);
}



// Convert the body content, to encoded format
//  params - It will be an object
// {username:'aakash', password: '123123' } =>    'username=aakash&password=123123'
export const getFormBody = (params) => {
    let formBody = [];

    // For each property in body, convert it to encoded format
    for (let property in params){
        // Convert spaces to %20 using encodedURIComponent.
        let encodedKey = encodeURIComponent(property); //'user name' => 'user%20name'
        let encodedValue = encodeURIComponent(params[property]); //aakash 123 => aakash%20123

        formBody.push(encodedKey + '=' + encodedValue);
    }
    
    return formBody.join('&'); // 'username=aakash&password=123123'
};

