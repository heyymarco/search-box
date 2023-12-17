'use client'

// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
    useRef,
    useEffect,
}                           from 'react'

// reusable-ui core:
import {
    // react helper hooks:
    useEvent,
    
    
    
    // an accessibility management system:
    AccessibilityProvider,
    
    
    
    // basic variants of UI:
    useBasicVariantProps,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // base-components:
    Basic,
    
    
    
    // status-components:
    Busy,
    
    
    
    // composite-components:
    MasonryProps,
    Masonry,
}                           from '@reusable-ui/components'          // a set of official Reusable-UI components



// react components:
export type CheckStatusCallback = (searchId: string) => Promise<string[]|'pending'|Error>
export interface AwaitableGalleryProps
    extends
        // bases:
        Omit<MasonryProps, 'children'>
{
    // values:
    searchId ?: string|null
    
    
    
    // apis:
    checkStatusApi ?: CheckStatusCallback
}
export const AwaitableGallery = (props: AwaitableGalleryProps): JSX.Element|null => {
    // rest props:
    const {
        // values:
        searchId,
        
        
        
        // apis:
        checkStatusApi,
    ...restMasonryProps} = props;
    
    
    
    // states:
    const [images, setImages] = useState<string[]|'pending'|'idle'|Error>('idle');
    
    
    
    // effects:
    useEffect(() => {
        // conditions:
        if (searchId === null) {
            setImages('pending');
            return;
        }
        if (!searchId) return;
        if (!checkStatusApi) return;
        
        
        
        // actions:
        (async () => {
            const checkIsReady = async (): Promise<string[]|'pending'|Error> => {
                let result : string[]|'pending'|Error;
                try {
                    result = await checkStatusApi(searchId)
                }
                catch (error) {
                    result = error as Error;
                } // try
                setImages(result);
                return result;
            };
            const scheduleCheckIsReady = async () => {
                if ((await checkIsReady()) !== 'pending') return;
                
                
                setTimeout(scheduleCheckIsReady, 1000);
            }
            scheduleCheckIsReady();
        })();
    }, [searchId, checkStatusApi]);
    
    
    
    // jsx:
    if (images instanceof Error) return (
        <Basic theme='danger'>
            Oops! An error occured.
        </Basic>
    );
    if (images === 'pending') return (
        <Busy theme='primary' size='lg' />
    );
    if (images === 'idle') return null;
    return (
        <Masonry
            // other props:
            {...restMasonryProps}
        >
            {images.map((image, index) =>
                <img key={index} src={image} alt='' />
            )}
        </Masonry>
    );
};