const { default: dbConnection } = require("../mongodb")


export default InsertMovie = async (movie) => {
   try{
    const client = await dbConnection();
    const movies = client.db().collection("newMovies");
    const response = await movies.insertOne(movie);
    console.log(response.insertedId);

    return response;

   }catch(error){
       console.log(error)
   }    
}