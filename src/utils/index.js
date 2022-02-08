export * from "./constants"; //Automatically Exports all the Named Exports from constants

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