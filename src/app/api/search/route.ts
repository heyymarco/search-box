// next-js:
import {
    NextRequest,
    NextResponse,
}                           from 'next/server'

// next-connect:
import {
    createEdgeRouter,
}                           from 'next-connect'

// others:
import {
    customAlphabet,
}                           from 'nanoid'

import api from 'api'



// types:
export interface GenerateRequest
{
    search : string
    option : string
}
export interface GenerateResult
{
    searchId: string
}

export interface VerifyRequest
{
    searchId: string
}
export interface CreatedResult
{
    imageUrls: string[]
}


// routers:
interface RequestContext {
    params: {
        /* no params yet */
    }
}
const router  = createEdgeRouter<NextRequest, RequestContext>();
const handler = async (req: NextRequest, ctx: RequestContext) => router.run(req, ctx) as Promise<any>;
export {
    // handler as GET,
    handler as POST,
    // handler as PUT,
    handler as PATCH,
    // handler as DELETE,
    // handler as HEAD,
}

router
.post(async (req) => {
    // simulate slow network:
    await new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
    
    
    
    const {
        search,
        option,
    } = await req.json();
    
    
    
    
    if (!search || (typeof search !== 'string')) {
        return NextResponse.json({
            error: 'Invalid parameter(s).',
        }, { status: 400 }); // bad request
    } // if
    
    
    
    const sdk = api('@prodia/v1.3.0#75jxacplowzes24');
    sdk.auth(process.env.PRODIA_API_KEY);
    try {
        const response = (await sdk.generate({prompt: search})).data;
        // console.log(response);
        
        const generateResult : GenerateResult = {
            searchId : response.job,
        }
        return NextResponse.json(generateResult); // handled with success
    }
    catch (error: any){
        throw error;
    } // try
})
.patch(async (req) => {
    // simulate slow network:
    await new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
    
    
    
    const {
        searchId,
    } = await req.json();
    if (!searchId || (typeof searchId !== 'string')) {
        return NextResponse.json({
            error: 'Invalid parameter(s).',
        }, { status: 400 }); // bad request
    } // if
    
    
    
    const sdk = api('@prodia/v1.3.0#75jxacplowzes24');
    sdk.auth(process.env.PRODIA_API_KEY);
    try {
        const response = (await sdk.getJob({jobId: searchId})).data;
        console.log(response);
        
        
        if (response.status === 'generating') {
            return NextResponse.json({
                status: 'pending',
            }, { status: 409 }); // pending
        } // if
        
        
        const createdResult : CreatedResult = {
            imageUrls : [response.imageUrl],
        }
        return NextResponse.json(createdResult); // handled with success
    }
    catch (error: any){
        throw error;
    } // try
});


export const revalidate = 0;
