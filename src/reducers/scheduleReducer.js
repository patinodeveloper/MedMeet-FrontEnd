export const scheduleReducer = (state = [], action) => {

    switch (action.type) {
        case "loadSchedules":
            return action.payload;
        case "addSchedule":
            return [...state, action.payload];
        case "updateSchedule":
            return state.map((schedule) =>
                schedule.id === action.payload.id ? action.payload : schedule
            );
        case "removeSchedule":
            return state.filter((schedule) => schedule.id !== action.payload);
        default:
            return state;
    }
};
