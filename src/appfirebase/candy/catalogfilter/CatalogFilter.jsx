import React, {useEffect, useState} from 'react';
import {FilterButtons, Kinds, TextForm} from './CatalogFilterComponents';

const CatalogFilter = ({filterData, applyFilter, cancel}) => {
    const [kinds, setKinds] = useState(null);
    const [facts, setFacts] = useState(null);
    const [text, setText] = useState('');

    useEffect(() => {
        setKinds(filterData.kinds);
        setFacts(filterData.facts);
    }, [filterData, setKinds, setFacts]);

    const onKindClick = (kind) => {
        setKinds(Object.assign({}, kinds, {[kind]: !kinds[kind]}));
    };

    const onFactClick = (fact) => {
        setFacts(Object.assign({}, facts, {[fact]: !facts[fact]}));
    };

    const changeSelected = (obj, setObj, selected) => {
        const newObj = {};
        Object.keys(obj).forEach(item => newObj[item] = selected);
        setObj(Object.assign({}, obj, newObj));
    };

    const reset = () => {
        const newKinds = {};
        const newFacts = {};
        Object.keys(kinds).forEach(kind => (newKinds[kind] = true));
        Object.keys(facts).forEach(fact => (newFacts[fact] = false));
        applyFilter({kinds: newKinds, text: '', facts: newFacts});
    };

    const apply = () => {
        applyFilter({kinds: {...kinds}, text: text, facts: {...facts}});
    };

    return (
        <div className='p-1 mx-auto'>
            <h5 className='h5-responsive'>Фильтр</h5>
                <Kinds kinds={kinds} onCheckBoxClick={onKindClick}
                       selectAll={() => changeSelected(kinds, setKinds, true)}
                       unSelectAll={() => changeSelected(kinds, setKinds, false)}/>
                <Kinds kinds={facts} onCheckBoxClick={onFactClick} title={'Только:'}
                       selectAll={() => changeSelected(facts, setFacts, true)}
                       unSelectAll={() => changeSelected(facts, setFacts, false)}/>
                <TextForm text={text} setText={setText}/>
                <FilterButtons apply={apply} reset={reset} cancel={cancel}/>
        </div>
    );
};

export default CatalogFilter;