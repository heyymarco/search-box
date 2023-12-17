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


// mocks:
const searchIds = new Map<string, Date>();
const images = [
    '/lorem-img/building-800x500.jpg',
    '/lorem-img/flower-700x400.jpg',
    '/lorem-img/leaf-800x700.jpg',
    '/lorem-img/street-800x800.jpg',
    '/lorem-img/water-500x800.jpg',
    '/lorem-img/waves-800x600.jpg',
    '/lorem-img/wood-700x600.jpg',
];



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
    
    
    
    const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 16);
    const newSearchId = nanoid();
    const createdAt = new Date();
    searchIds.set(newSearchId, createdAt);
    const generateResult : GenerateResult = {
        searchId : newSearchId
    }
    return NextResponse.json(generateResult); // handled with success
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
    const createdAt = searchIds.get(searchId);
    if (!createdAt) {
        return NextResponse.json({
            error: 'Invalid parameter(s).',
        }, { status: 400 }); // bad request
    } // if
    
    
    
    if ((createdAt.valueOf() + (10 * 1000)) > (new Date()).valueOf()) {
        return NextResponse.json({
            result: 'queued',
        }, { status: 409 }); // queued
    } // if
    
    
    
    const createdResult : CreatedResult = {
        imageUrls : (
            new Array(Math.round(Math.random() * 10) + 6)
            .fill(null)
            .map(() =>
                images[Math.round(Math.random() * (images.length - 1))]
            )
        ),
    }
    return NextResponse.json(createdResult); // handled with success
});


export const revalidate = 0;
