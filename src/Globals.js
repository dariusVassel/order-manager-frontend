export const baseUrl = 'http://localhost:3001'
export const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
}
export function getToken(){
    return {
        'Authorization' : `bearer ${localStorage.getItem('jwt')}`
    }
}