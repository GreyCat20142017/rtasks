import React from 'react';

class ErrorBoundary extends React.Component {
    constructor (props) {
        super(props);
        this.state = {wasError: false};
    }

    componentDidCatch () {
        this.setState({wasError: true});
    }

    render () {
        if (this.state.wasError) {
            return (
                <div className='alert alert-primary'>
                    <h4>Произошла ошибка...</h4>
                    <p>Часть функциональности отключена. Возможная причина - недоступность карт.</p>
                </div>
            )
        } else {
            return (this.props.children)
        }
    }

}

export default ErrorBoundary;