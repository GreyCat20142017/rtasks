import React, {Component} from 'react';
import {register} from '../userFunctions';

class RegisterPage extends Component {

    constructor(props) {
        super(props);
        this.state = {email: '', password: '', name: '', error: ''};
    }

    onInputChange = evt => {
        evt.preventDefault();
        this.setState({
            [evt.target.name]: evt.target.value,
        });
    };

    onSubmit = (evt) => {
        const {email, password, name} = this.state;
        evt.preventDefault();
        const user = {
            email,
            password,
            name
        };
        register(user).then(res => {
            if (res && res.data) {
                this.props.register({name: res.data.name, email: res.data.email});
            }
        }).catch(error => {
            this.setState({error: error.message});
        });
    };

    render() {
        const {name, email, password, error} = this.state;
        return (
            <React.Fragment>
                <section className='col-12 col-md-6 py-3 justify-content-center container'>
                    <h2 className='text-center'>Регистрация</h2>
                    <form
                        className='needs-validation mx-auto col-11 p-3 white mdb-color-text rounded shadow-lg text-center'
                    >
                        <div className='col-12 d-flex flex-column mt-2'>
                            <label className='text-left' htmlFor='name'>Имя</label>
                            <input className='form-control'
                                   type='text' name='name' placeholder='Имя' id='name' required
                                   value={name} onChange={this.onInputChange}/>

                            <span className='invalid-feedback'></span>
                        </div>
                        <div className='col-12 d-flex flex-column mt-2'>
                            <label className='text-left' htmlFor='email'>E-mail</label>
                            <input className='form-control'
                                   type='text' name='email' placeholder='E-mail' id='email' required
                                   value={email} onChange={this.onInputChange}/>

                            <span className='invalid-feedback'></span>
                        </div>
                        <div className='col-12 d-flex flex-column mt-2'>
                            <label className='text-left' htmlFor='password'>Пароль</label>
                            <input className='form-control'
                                   type='password' name='password' placeholder='Пароль' id='password' required
                                   value={password} onChange={this.onInputChange}/>

                            <span className='invalid-feedback'></span>
                        </div>
                        <button className='btn btn-indigo' type='submit' onClick={this.onSubmit}
                                onSubmit={this.onSubmit}>
                            Зарегистрироваться
                        </button>
                    </form>
                    <p>{error}</p>
                </section>
            </React.Fragment>
        );
    }
};

export default RegisterPage;
