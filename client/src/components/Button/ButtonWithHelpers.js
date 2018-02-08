import * as React from 'react';
import { Button, Navbar, NavbarStart, NavbarEnd, withHelpersModifiers  } from 'bloomer';

const MyComponent = (props, Component) => (
    <Component {...props}>{props.children}</Component>
)

export default withHelpersModifiers(MyComponent);