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
    // simple-components:
    ButtonIcon,
    Input,
    
    
    
    // layout-components:
    ListItem,
    
    
    
    // menu-components:
    DropdownListButton,
    
    
    
    // composite-components:
    GroupProps,
    Group,
}                           from '@reusable-ui/components'          // a set of official Reusable-UI components

// internals:
import type {
    SearchBoxSubmitEventHandler,
}                           from './types'



// handlers:
const handleCancelFormSubmit : React.FormEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
};



// react components:
export interface SearchBoxProps
    extends
        // bases:
        Omit<GroupProps,
            // handlers:
            |'onSubmit' // overriden
        >
{
    // configs:
    options       ?: string[]
    defaultOption ?: string
    
    
    
    // handlers:
    onSubmit      ?: SearchBoxSubmitEventHandler
}
export const SearchBox = (props: SearchBoxProps): JSX.Element|null => {
    // rest props:
    const {
        // configs:
        options       = [],
        defaultOption = '',
        
        
        
        // handlers:
        onSubmit,
    ...restGroupProps} = props;
    
    
    
    // basic variant props:
    const basicVariantProps = useBasicVariantProps(props);
    
    
    
    // states:
    const [isBusy, setIsBusy] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const [option, setOption] = useState<string>(defaultOption);
    
    
    
    // handlers:
    const handleSearch = useEvent(async (): Promise<void> => {
        setIsBusy(true);
        try {
            await onSubmit?.({
                search,
                option,
            });
        }
        finally {
            setIsBusy(false);
        } // try
    });
    
    
    
    // effects:
    
    // restore focus after search completed:
    const inputRef = useRef<HTMLInputElement|null>(null);
    useEffect(() => {
        // conditions:
        if (isBusy) return; // ignore if busy
        
        
        
        // actions:
        inputRef.current?.focus();
    }, [isBusy]);
    
    
    
    // jsx:
    return (
        <AccessibilityProvider
            // states:
            enabled={!isBusy}
        >
            <Group
                // other props:
                {...restGroupProps}
                
                
                
                // semantics:
                tag='form'
                
                
                
                // handlers:
                onSubmit={handleCancelFormSubmit}
            >
                <Input
                    // refs:
                    elmRef={inputRef}
                    
                    
                    
                    // values:
                    value={search}
                    onChange={({target: {value}}) => setSearch(value)}
                    
                    
                    
                    // formats:
                    type='search'
                />
                <ButtonIcon
                    // appearances:
                    icon='search'
                    
                    
                    
                    // behaviors:
                    type='submit'
                    
                    
                    
                    // handlers:
                    onClick={handleSearch}
                >
                    Search
                </ButtonIcon>
                {!!options.length && <DropdownListButton
                    // variants:
                    {...basicVariantProps}
                    
                    
                    
                    // floatable:
                    floatingPlacement='bottom-end'
                >
                    {options.map((opt, index) =>
                        <ListItem
                            // identifiers:
                            key={index}
                            
                            
                            
                            // states:
                            active={option === opt}
                            
                            
                            
                            // handlers:
                            onClick={() => setOption(opt)}
                        >
                            {opt}
                        </ListItem>
                    )}
                </DropdownListButton>}
            </Group>
        </AccessibilityProvider>
    );
}
