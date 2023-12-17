// cssfn:
import {
    // writes css in javascript:
    children,
    style,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui components:
import {
    // base-content-components:
    usesContentLayout,
    usesContentVariants,
}                           from '@reusable-ui/components'          // a set of official Reusable-UI components



export const usesAwaitableGalleryLayout = () => {
    return style({
        // layouts:
        ...usesContentLayout(),
        ...style({
            // layouts:
            display        : 'grid',
            
            
            
            // children:
            ...children(['.error', '.busy'], {
                justifySelf : 'center',
                alignSelf   : 'center',
            }),
            ...children('.busy', {
                fontSize : '5rem',
            }),
        }),
    });
};
export const usesAwaitableGalleryVariants = usesContentVariants;

export default style({
    // layouts:
    ...usesAwaitableGalleryLayout(),
    
    // variants:
    ...usesAwaitableGalleryVariants(),
});
