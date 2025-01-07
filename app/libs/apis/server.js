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

