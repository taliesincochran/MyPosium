import * as React from 'react';
import { NavbarItem, withHelpersModifiers  } from 'bloomer';

const MyComponent = (props) => (
    <NavbarItem {...props}>{props.children}</NavbarItem>
)

export default withHelpersModifiers(MyComponent);