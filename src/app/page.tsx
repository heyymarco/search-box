'use client'

import { useEffect, useState } from 'react'

// reusable-ui core:
import {
    // react helper hooks:
    useEvent,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

import styles from './page.module.css'
import { SearchBox, SearchBoxSubmitEventHandler } from 'search-box-2'
import { AwaitableGallery, CheckStatusCallback } from 'awaitable-gallery'



export default function Home() {
    const [searchId, setSearchId] = useState<string|null|undefined>(undefined); // undefined => not yet searched, null => waiting for server response
    
    
    
    // handlers:
    const handleSubmit = useEvent<SearchBoxSubmitEventHandler>(async ({search, option}): Promise<void> => {
        if (!search) {
            setSearchId(undefined); // undefined => not yet searched
            return;
        } // if
        
        
        
        setSearchId(null); // null => waiting for server response
        try {
            const response = await fetch('/api/search', {
                method : 'POST',
                body : JSON.stringify({
                    search : search ?? '',
                    option : option,
                })
            });
            if (!response.ok) return;
            const result = await response.json();
            setSearchId(result.searchId);
        }
        catch {}
    });
    const handleCheckStatus = useEvent<CheckStatusCallback>(async () => {
        try {
            const response = await fetch('/api/search', {
                method : 'PATCH',
                body : JSON.stringify({
                    searchId : searchId ?? '',
                })
            });
            if (response.status === 409) return 'pending';
            if (!response.ok) return Error('server is busy');
            const result = await response.json();
            return result.imageUrls;
        }
        catch {
            return Error('server is busy');
        }
    });
    
    
    
    // jsx:
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
                // variants:
                theme='primary'
                
                
                
                // apis:
                searchId={searchId}
                checkStatusApi={handleCheckStatus}
                poolInterval={1000} // re-check every 1 second
            />
        </main>
    )
}
