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
    EventHandler,
    
    
    
    // basic variants of UI:
    useBasicVariantProps,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // base-components:
    Generic,
    Basic,
    
    
    
    // base-content-components:
    Content,
    
    
    
    // simple-components:
    IconProps,
    Icon,
    ButtonIcon,
    Input,
    
    
    
    // layout-components:
    ListItem,
    List,
    
    
    
    // status-components:
    Badge,
    Busy,
    
    
    
    // notification-components:
    Alert,
    
    
    
    // menu-components:
    Collapse,
    DropdownListButton,
    
    
    
    // dialog-components:
    ModalExpandedChangeEvent,
    
    
    
    // composite-components:
    GroupProps,
    Group,
    TabPanel,
}                           from '@reusable-ui/components'          // a set of official Reusable-UI components



export interface SearchBoxProps
    extends
        // bases:
        GroupProps
{
}
export const SearchBox = (props: SearchBoxProps): JSX.Element|null => {
    // basic variant props:
    const basicVariantProps = useBasicVariantProps(props);
    
    
    
    // jsx:
    return (
        <Group
            // other props:
            {...props}
        >
            <Input type='search' required={true} />
            <ButtonIcon
                // appearances:
                icon='search'
            >
                Search
            </ButtonIcon>
            <DropdownListButton
                // variants:
                {...basicVariantProps}
                
                
                
                // floatable:
                floatingPlacement='bottom-end'
            >
                <ListItem>
                    Happy
                </ListItem>
                <ListItem>
                    Sad
                </ListItem>
                <ListItem>
                    Spooky
                </ListItem>
            </DropdownListButton>
        </Group>
    );
}