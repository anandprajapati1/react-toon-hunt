import { fetchProductsPending, fetchProductsSuccess, fetchProductsError } from './actions';

function fetchProducts() {
    return dispatch => {
        dispatch(fetchProductsPending());
        fetch('https://rickandmortyapi.com/api/character/')
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                dispatch(fetchProductsSuccess(res.results));
                return res.results;
            })
            .catch(error => {
                dispatch(fetchProductsError(error));
            });
    };
}

export default fetchProducts;