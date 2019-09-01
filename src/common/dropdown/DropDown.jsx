import React, {Component} from 'react';

const LinkDrop = ({link, css, clickHandler}) => (
  <a className={css.linkCss}
      href={link.href} onClick={clickHandler}
      key={link.key}>
    {link.text}
  </a>
);

const ButtonDrop = ({link, css, clickHandler}) => (
  <button className={css.linkCss}
      type='button' onClick={() => clickHandler(link.key)}
      key={link.key}>
    {link.text}
  </button>
);

/**
 * для передачи в props DropDown нужно подготовить массив объектов вида
 * {key: 'key, link: 'link', text: 'text'}
 */
class DropDown extends Component {

  constructor(props) {
    super(props);
    this.state = {isOpen: false};
    this.toggleContainer = React.createRef();
    this.timeOutId = null;
  }

  componentDidMount() {
    window.addEventListener('click', this.onClickOutsideHandler);
    window.addEventListener('keydown', this.onKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClickOutsideHandler);
    window.removeEventListener('keydown', this.onKeyPress);
  }

  onClickHandler = () => {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }));
  };

  onButtonClickHandler = (key) => {
    if (this.props.callback) {
      this.onClickHandler();
      this.props.callback(this.props.dropdownSet[key]);
    }
  };

  onClickOutsideHandler = (evt) => {
    if (this.state.isOpen && !this.toggleContainer.current.contains(evt.target)) {
      this.setState({isOpen: false});
    }
  };

  onBlurHandler = () => {
    this.timeOutId = setTimeout(() => {
      this.setState({
        isOpen: false
      });
    }, 100);
  };

  onKeyPress = (evt) => {
    if (evt.keyCode === 27) {
      this.setState({isOpen: false});
    }
  };

  onFocusHandler = () => {
    if (this.timeOutId) {
      clearTimeout(this.timeOutId);
    }
  };

  textWrapper = (text) => (this.props.textWrapperFunction ? this.props.textWrapperFunction(text) : text);

  render() {
    const {data, togglerText, ariaInfo, css, callback} = this.props;
    const dropOpenedClass = this.state.isOpen ? ' show ' : '';
    const links = Array.isArray(data) ? data : [];

    return (
      <div className='dropdown mt-1 p-1' ref={this.toggleContainer} onBlur={this.onBlurHandler}
           onFocus={this.onFocusHandler}>
        <button className={css.togglerCss} type='button'
                id={ariaInfo}
                data-toggle='dropdown' aria-haspopup='true' aria-expanded='false' onClick={this.onClickHandler}>
          {togglerText}
        </button>
        <div className={'dropdown-menu w-100' + dropOpenedClass} aria-labelledby={ariaInfo}>
          {links.map((link, ind) =>
            (callback ?
              <ButtonDrop key={ind} link={link} css={css} clickHandler={this.onButtonClickHandler}/> :
              <LinkDrop key={ind} link={link} css={css} clickHandler={this.onClickHandler}/>)
          )}
        </div>
      </div>
    );
  }

  static defaultProps = {
    data: [],
    togglerText: 'перейти...',
    ariaInfo: 'dropdown',
    css: {
      togglerCss: 'btn dropdown-toggle btn-block',
      linkCss: 'dropdown-item w-100'
    }
  };
}


export default DropDown;
