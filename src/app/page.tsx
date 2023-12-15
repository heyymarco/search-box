'use client'

import { useState } from 'react'

// reusable-ui core:
import {
    // react helper hooks:
    useEvent,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

import styles from './page.module.css'
import { SearchBox, SearchBoxSubmitEventHandler } from '@/components/SearchBox'



export default function Home() {
    const handleSubmit = useEvent<SearchBoxSubmitEventHandler>(async ({search, option}): Promise<void> => {
        await new Promise<void>((resolved) => {
            setTimeout(() => {
                resolved();
            }, 1000);
        });
        
        
        
        console.log({search, option});
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
        </main>
    )
}
