// next-js:
import {
    NextRequest,
    NextResponse,
}                           from 'next/server'

// next-connect:
import {
    createEdgeRouter,
}                           from 'next-connect'



// types:
export interface SearchResult
{
    results: string[]
}


// mocks:
const words =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus assumenda dolorum distinctio placeat consequatur, dolor autem, iusto sit, repellendus magni molestias corrupti? Recusandae facere blanditiis veniam? Quas voluptatem quibusdam voluptas!'
    .split(/\s+/g);



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
    // handler as PATCH,
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
    
    
    
    const searchResult : SearchResult = {
        results : (
            new Array(Math.round(Math.random() * 10) + 3)
            .fill(null)
            .map(() =>
                words[Math.round(Math.random() * (words.length - 1))]
            )
        ),
    }
    return NextResponse.json(searchResult); // handled with success
});


export const revalidate = 0;
