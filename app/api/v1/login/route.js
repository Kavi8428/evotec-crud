import { NextResponse} from "next/server";

export const POST = async (req)=>{
    let request = await req.json();
    console.log('Request',request);
    
    return NextResponse.json({
        message : 'Hello from the server'
    })
}
