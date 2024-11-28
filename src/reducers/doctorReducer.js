export const doctorReducer = (state = [], action) => {

    switch (action.type) {
        case "loadDoctors":
            return action.payload;
        case "addDoctor":
            return [...state, action.payload];
        case "updateDoctor":
            return state.map((doc) =>
                doc.id === action.payload.id ? action.payload : doc
            );
        case "removeDoctor":
            return state.filter((doc) => doc.id !== action.payload);
        default:
            return state;
    }
};
