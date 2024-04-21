const intialValue = {
    isloading : false,
    userData: {}
}
const IsLoadingClicked = (state = intialValue.isloading, action) => {
    switch(action.type){
        case 'LOADING' : return action.payload
        default: return  state
    }
}

const userData = (state = intialValue.userData, action) => {
    switch(action.type){
        case "USER" : return action.payload
        default : return state
    }
}

export {IsLoadingClicked, userData}

