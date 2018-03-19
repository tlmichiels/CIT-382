import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';



/*
    Three types of results possible within this code:
    1. Valid HTTP call, will return JSON information as
        {
            statusCode: xxx,
            content: [...] // Note that content is already a JSON string
        }
    2. Error: Invalid HTTP call
        {
            response: 
                {
                    statusCode: xxx,
                    content: { ... },
                    headers: { ... },
                }
        }
    3. Error: Some other type of error
    We will return either the data results, or an object formatted as:
    {
        error: {
            statusCode: xxx,
            error: '',
        }
    }
*/

if (Meteor.isServer) {
    Meteor.methods({
        
        getRestData(min, max) {
            console.log(min);
            console.log(max);
            // Construct URL, and output to console
            let url = 'https://www.random.org/integers/?num=1&min='+min+'&max='+max+'&col=1&base=10&format=plain&rnd=new';
            console.log("URL: " + url);

            let result = '';
            let statusCode = '';

            try {
                // Trap non-HTTP errors
                try {
                    // Do HTTP call
                    let callResult = HTTP.call('GET', url);
                    statusCode = callResult.statusCode;
                    result = callResult;
                } catch (callErr) {
                    // Trap HTTP error
                    result = {
                        error: {
                            statusCode: callErr.response.statusCode,
                            error: "HTTP error",
                        }
                    }
                    result = JSON.stringify(error);
                } finally {
                    // Return HTTP result (valid or invalid)
                    return result;
                }
            } catch (err) {
                // Handle non-HTTP errors
                console.log('General error');
                console.log(err);
                result = {
                    error: {
                        statusCode: 0,
                        error: err
                    }
                }
                return JSON.stringify(error);
            }
        },
    });
}