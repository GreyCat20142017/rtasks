import React, {Component} from 'react';
import {login, setToken} from '../userFunctions';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {email: props.lastRegistered ? props.lastRegistered : '', password: '', error: null};
    }

    onInputChange = evt => {
        evt.preventDefault();
        this.setState({
            [evt.target.name]: evt.target.value,
        });
    };

    onSubmit = (evt) => {
        const {email, password} = this.state;
        evt.preventDefault();
        const user = {
            email,
            password
        };
        login(user).then(res => {
            if (res && res.data && res.data.success) {
                this.props.logIn(res.data.token);
            }
        }).catch(error => {
            this.setState({error: error.message}) ;
        });
    };

    render() {
        const {email, password, error} = this.state;
        return (
            <section className='col-12 col-md-6 py-3 justify-content-center container'>
                <form className='needs-validation mx-auto p-3 white mdb-color-text rounded shadow-lg text-center'
                      onSubmit={this.onSubmit}>
                    <div className='col-12 d-flex flex-column mt-2'>
                        <label className='text-left' htmlFor='email'>Логин</label>
                        <input className='form-control' autoComplete="off"
                               type='text' name='email' placeholder='Логин' id='email' required
                               value={email} onChange={this.onInputChange}/>
                        <span className='invalid-feedback'></span>
                    </div>
                    <div className='col-12 d-flex flex-column mt-2'>
                        <label className='text-left' htmlFor='password'>Пароль</label>
                        <input className='form-control' autoComplete="off"
                               type='password' name='password' placeholder='Пароль' required
                               value={password} onChange={this.onInputChange}/>
                        <span className='invalid-feedback'></span>
                    </div>
                    <div>
                        <button className='btn btn-indigo' type='submit' onClick={this.onSubmit}
                                onSubmit={this.onSubmit}>Войти
                        </button>
                    </div>
                </form>
                <p>{error}</p>
            </section>
        );
    }
}

export default LoginForm;


