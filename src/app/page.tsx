'use client'

import { useEffect, useState } from 'react'

// reusable-ui core:
import {
    // react helper hooks:
    useEvent,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

import styles from './page.module.css'
import { SearchBox, SearchBoxSubmitEventHandler } from 'search-box-2'
import { useGenerateSearch, useVerifySearch } from '@/store/features/api/apiSlice'
import { Basic, Busy, List, ListItem, Masonry } from '@reusable-ui/components'



export default function Home() {
    const [doSearch, {data: generateResult, isLoading: isGenerateLoading, isError: isGenerateError}] = useGenerateSearch();
    const [doVerify, {data: imageResults  , isLoading: isImageLoading   , error  : isImageError   }] = useVerifySearch();
    const [isPending, setIsPending] = useState<boolean>(false);
    const isLoading = isGenerateLoading || isImageLoading || isPending;
    const isError   = isGenerateError   || (!!isImageError && ((isImageError as any).status !== 409 /* still queued */));
    const isReady   = !isLoading && !isError && !!imageResults;
    
    
    
    const handleSubmit = useEvent<SearchBoxSubmitEventHandler>(async ({search, option}): Promise<void> => {
        setIsPending(true);
        doSearch({search, option});
    });
    useEffect(() => {
        if (!generateResult) return;
        
        (async () => {
            const checkIsReady = async (): Promise<boolean> => {
                try {
                    await doVerify({ searchId: generateResult.searchId }).unwrap();
                    return true;
                }
                catch {
                    return false;
                }
            }
            const scheduleCheckIsReady = async () => {
                if (await checkIsReady()) {
                    setIsPending(false);
                    return;
                } // if
                
                
                setTimeout(scheduleCheckIsReady, 1000);
            }
            scheduleCheckIsReady();
        })();
    }, [generateResult]);
    
    
    
    // handlers:
    return (
        <main className={styles.main}>
            <SearchBox
                // configs:
                options={[
                    'Banana',
                    'Apple',
                    'Pear',
                    'Orange',
                ]}
                
                
                
                // variants:
                theme='primary'
                
                
                
                // handlers:
                onSubmit={handleSubmit}
            />
            
            {isError && <Basic theme='danger'>
                Oops, something wrong!
            </Basic>}
            
            {isLoading && <Busy theme='primary' size='lg' />}
            
            {isReady && <Masonry theme='primary'>
                {imageResults.imageUrls.map((imageUrl, index) =>
                    <img key={index} src={imageUrl} alt='' />
                )}
            </Masonry>}
        </main>
    )
}
