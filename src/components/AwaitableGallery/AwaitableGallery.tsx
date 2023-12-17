'use client'

// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
    useEffect,
}                           from 'react'

// reusable-ui components:
import {
    // base-components:
    Basic,
    
    
    
    // base-content-components:
    ContentProps,
    Content,
    
    
    
    // status-components:
    Busy,
    
    
    
    // composite-components:
    Masonry,
}                           from '@reusable-ui/components'          // a set of official Reusable-UI components

// internals:
import {
    useAwaitableGalleryStyleSheet,
}                           from './styles/loader'



// react components:
export type CheckStatusCallback = (searchId: string) => Promise<string[]|'pending'|Error>
export interface AwaitableGalleryProps
    extends
        // bases:
        Omit<ContentProps, 'children'>
{
    // values:
    searchId ?: string|null
    
    
    
    // apis:
    checkStatusApi ?: CheckStatusCallback
}
export const AwaitableGallery = (props: AwaitableGalleryProps): JSX.Element|null => {
    // styles:
    const styleSheet = useAwaitableGalleryStyleSheet();
    
    
    
    // rest props:
    const {
        // values:
        searchId,
        
        
        
        // apis:
        checkStatusApi,
    ...restContentProps} = props;
    
    
    
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
    if (searchId === undefined) return null;
    return (
        <Content
            // other props:
            {...restContentProps}
            
            
            
            // variants:
            theme={(images instanceof Error) ? 'danger' : props.theme}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
        >
            {(images instanceof Error) &&
                <Basic className='error' theme='danger'>
                    Oops! An error occured.
                </Basic>
            }
            
            {(images === 'pending') &&
                <Busy className='busy' theme='primary' size='lg' />
            }
            
            {Array.isArray(images) &&
                <Masonry className='images' nude={true}>
                    {images.map((image, index) =>
                        <img key={index} src={image} alt='' />
                    )}
                </Masonry>
            }
        </Content>
    );
};