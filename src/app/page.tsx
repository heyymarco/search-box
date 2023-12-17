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
import { AwaitableGallery, CheckStatusCallback } from '@/components/AwaitableGallery'



export default function Home() {
    const [doSearch, {data: generateResult}] = useGenerateSearch();
    const [doVerify] = useVerifySearch();
    const [searchId, setSearchId] = useState<string|null|undefined>(undefined); // undefined => not yet searched, null => waiting for server response
    
    
    
    const handleSubmit = useEvent<SearchBoxSubmitEventHandler>(async ({search, option}): Promise<void> => {
        if (!search) {
            setSearchId(undefined); // undefined => not yet searched
            return;
        } // if
        
        
        
        setSearchId(null); // null => waiting for server response
        try {
            const result = await doSearch({search: search ?? '', option}).unwrap();
            setSearchId(result.searchId);
        }
        catch {}
    });
    const handleCheckStatus = useEvent<CheckStatusCallback>(async () => {
        try {
            const result = await doVerify({ searchId: searchId ?? '' }).unwrap();
            return result.imageUrls;
        }
        catch (error: any){
            if (error.status === 409) return 'pending';
            return Error('server is busy');
        }
    });
    
    
    
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
            
            <AwaitableGallery
                theme='primary'
                searchId={searchId}
                checkStatusApi={handleCheckStatus}
            />
        </main>
    )
}
