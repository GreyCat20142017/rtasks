import React, {useRef} from 'react';

const Darken = ({switchMethod = null, ...props}) => {
    const noToggleContainer = useRef(null);
    // constructor(props) {
    //   super(props);
    //   noToggleContainer = React.createRef();
    // }

    const onClickHandler = (evt) => {
        const ok = switchMethod && props[switchMethod];
        if (!noToggleContainer.current.contains(evt.target) && ok) {
            props[switchMethod]();
        }
    };

    return (
        <div className={props.isOpen ? 'd-flex' : 'd-none'}
             style={props.isOpen ? {
                 backgroundColor: 'rgba(0, 0, 0, 0.5)',
                 position: 'fixed',
                 left: 0,
                 top: 0,
                 right: 0,
                 bottom: 0,
                 zIndex: 100
             } : {}} onClick={onClickHandler}>
            <div ref={noToggleContainer}>
                {props.children}
            </div>
        </div>
    );


}

export default Darken;
