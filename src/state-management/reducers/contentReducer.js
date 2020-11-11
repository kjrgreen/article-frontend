const INITIAL_STATE = {
    lastUpdate: null,
    articles: [],
    ready: false,
    updating: false
}

const contentReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case 'START_FETCH':
            return {...state, updating: true}
        case 'FETCH_UNSUCCESSFUL':
            return {...state, updating: false, ready: false}
        case 'FETCH_SUCCESSFUL': {
            localStorage.setItem('articles', JSON.stringify(action.payload));//Persist our articles
            localStorage.setItem('lastUpdate', JSON.stringify(new Date()));
            return {...state, articles: {...action.payload}, ready: true, updating: false, lastUpdate: Date()}
        }
        case 'FALLBACK': {
            //Persist nothing, set lastUpdate to the last persisted date
            return {...state, articles: {...action.payload}, ready: true, updating: false, lastUpdate: JSON.parse(localStorage.getItem('lastUpdate'))}
        }
        default:
            return state;
    }
}

export default contentReducer;