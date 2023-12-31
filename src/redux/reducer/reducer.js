//import {all} from "axios";
import { GET_CARS, GET_DETAIL, ON_SEARCH, ORDER_BY_NAME, ORDER_BY_PRICE } from "../action/typeAction";
let initialState = {
    allVehiculos: [],
    allCars: [],
    cars: [],
    carsDetail: {},
    onSearch: {},
}
function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CARS:
            return{
                ...state,
                 cars: action.payload,
                 allVehiculos: action.payload,
                 allCars: action.payload,
            };
            case GET_DETAIL:
                return{
                    ...state,
                    carsDetail: action.payload
                }
        case ORDER_BY_NAME:
            if(action.payload === "Default"){
                return{
                    ...state,
                    cars: state.allCars
                }
            }

                const sortedName = 
                action.payload === "A-Z"
                ? state.allVehiculos.sort((a, b)=> {
                    if(a.name > b.name){
                        return 1;
                    }
                    if(b.name > a.name){
                        return -1;
                    }
                    return 0;
                })
                : state.allVehiculos.sort((a, b)=> {
                    if(a.name > b.name){
                        return -1;
                    }
                    if(b.name > a.name){
                        return 1;
                    }
                })
                return {
                    ...state,
                    cars: sortedName,
                }
                case ORDER_BY_PRICE:
            if(action.payload === "Default"){
                return{
                    ...state,
                    cars: state.allCars
                }
            }

                const sortedPrice = action.payload === "min_price"
                ?[...state.allVehiculos].sort((a, b)=> parseInt(a.price) - parseInt(b.price))
                :[...state.allVehiculos].sort((a, b) => parseInt(b.price)- parseInt(a.price));
                console.log(sortedPrice);

                return{
                    ...state,
                    cars: sortedPrice,
                }
        case ON_SEARCH:
            return{
                ...state, 
                onSearch: action.payload
            }
        default:
            return{ ...state}

    }

}


export default rootReducer;
