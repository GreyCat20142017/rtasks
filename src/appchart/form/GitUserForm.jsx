import React, {useState} from 'react';

const GitUserForm = ({onGitUserClick}) => {
    const [inputValue, setInputValue] = useState('');
    return (
        <div className='row justify-content-center align-items-center mx-auto p-3'>
            <button className="col-12 col-md-6 btn btn-sm btn-outline-mdb-color mx-1"
                    onClick={() => onGitUserClick(inputValue.trim())}
                    title='Получить данные по указанному пользователю GitHub'>
                {'Построить график по: ' + inputValue}
            </button>
            <input className='col-12 col-md-5 form-control' value={inputValue} pattern='[A-Za-z0-9_-]'
                   title='Пользователь GitHub для построения графика' placeholder='Github user'
                   type='text' id='idGitUser' onChange={(evt) => setInputValue(evt.target.value)}/>
        </div>
    );
};

export default GitUserForm;