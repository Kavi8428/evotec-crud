import { api } from "../api";

const loginUser = async (data)=>{

    console.log('SentData',data);

    
   let response = await fetch('http://localhost:3000/api/v1/login',{
        method: 'POST',
        body: JSON.stringify({
            email: data.email,
            password: data.password
        })
    });
    console.log('API response to server',await response.json());
    };


    

export default loginUser;

export const getMovies = async () => {
    try{
        const response = await api.get("movies");
        console.log('Response',response);
        return response.json();

    }
    catch(error){
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Error status:', error.response.status);
            console.error('Error data:', error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error message:', error.message);
        }
        console.error('Error config:', error.config);    }
  };
