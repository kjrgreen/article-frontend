export const fetchStarted = () => {
    return {
        type: 'START_FETCH'
    };
};

export const fetchFailed = () => {
    return {
        type: 'FETCH_UNSUCCESSFUL'
    };
};

export const fetchFinished = (payload) => {
    return {
        type: 'FETCH_SUCCESSFUL',
        payload: payload
    };
};

export const fetchFallback = (payload) => {
    return {
        type: 'FALLBACK',
        payload: payload
    };
};