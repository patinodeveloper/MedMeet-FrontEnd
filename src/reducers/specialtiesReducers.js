export const specialtiesReducer = (state = [], action) => {
  
    switch (action.type) {
        case "loadSpecialties":
            return action.payload;

        case "addSpecialty":
            return [...state, action.payload];

        case "updateSpecialty":
            return state.map((specialty) =>
                specialty.id === action.payload.id ? action.payload : specialty
            );

        case "removeSpecialty":
            return state.filter((specialty) => specialty.id !== action.payload);

        default:
            return state;
    }
};
