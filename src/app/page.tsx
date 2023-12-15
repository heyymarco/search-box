'use client'

import { useState } from 'react'

// reusable-ui core:
import {
    // react helper hooks:
    useEvent,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

import styles from './page.module.css'
import { SearchBox, SearchBoxSubmitEventHandler } from '@/components/SearchBox'
import { useGetSearch } from '@/store/features/api/apiSlice'
import { Basic, Busy, List, ListItem } from '@reusable-ui/components'



export default function Home() {
    const [doSearch, {data: searchResults, isLoading, isError}] = useGetSearch();
    const isReady = !isLoading && !isError && !!searchResults;
    
    
    
    const handleSubmit = useEvent<SearchBoxSubmitEventHandler>(async ({search, option}): Promise<void> => {
        doSearch({search, option});
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
            
            {isError && <Basic theme='danger'>
                Oops, something wrong!
            </Basic>}
            
            {isLoading && <Busy theme='primary' size='lg' />}
            
            {isReady && <List theme='primary'>
                {searchResults.results.map((result, index) =>
                    <ListItem key={index}>
                        {result}
                    </ListItem>
                )}
            </List>}
        </main>
    )
}
