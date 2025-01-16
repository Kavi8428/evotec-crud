import { api } from '@/lib/api'

const loginUser = async data => {
  console.log('SentData', data)

  let response = await fetch('http://localhost:3000/api/v1/login', {
    method: 'POST',
    body: JSON.stringify({
      email: data.email,
      password: data.password
    })
  })
  console.log('API response to server', await response.json())
}
export default loginUser

export const register = async form_data => {
  try {
    const response = await api.post('v1/register', { json: form_data });
    if(!response.ok){
        throw new Error('Error in endpoint');
    }
    return response.json();

  } catch (error) {
    const status = error.response.status;
    if(status && status == 409){
        return {
            error : 'This email with user already exist'
        }
    }else if(status && status == 500)
   // console.log('Error occured while connecting register endpoint ', error);
    return {
        error : 'Internal server error'
    }
  }
}

export const getMovies = async () => {
  try {
    const response = await api.get('v1/movies')
    return response.json()
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error status:', error.response.status)
      console.error('Error data:', error.response.data)
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message)
    }
    console.error('Error config:', error.config)
  }
}
