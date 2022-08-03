//local development

//heroku production
export const baseUrl = 'https://frozen-badlands-72757.herokuapp.com'

export const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
}
export function getToken(){
    return {
        'Authorization' : `bearer ${localStorage.getItem('jwt')}`
    }
}