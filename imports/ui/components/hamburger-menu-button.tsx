import React, {useState} from 'react';
import _ from 'lodash';

type HamburgerMenuButtonProps = {
    buttonType: 1 | 2 | 3 | 4
    open: boolean
}

const HamburgerMenuButton = (props: HamburgerMenuButtonProps) => {
    const typeToSpans = _.concat([1,1,1], props.buttonType === 2 ? [1,1,1] : [], props.buttonType === 3 ? [1] : []).map(v => (
            <span></span>
        ))

    return (
        <div id={`nav-icon${props.buttonType}`} className={props.open ? 'open' : ''}>
            {typeToSpans}
        </div>
    )
}

export default HamburgerMenuButton;