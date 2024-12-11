import { useSchedules } from "../hooks/useSchedules";
import { ScheduleContext } from "./ScheduleContext";

export const ScheduleProvider = ({ children }) => {

    const {
        schedules,
        scheduleSelected,
        initialScheduleForm,
        visibleForm,
        errors,
        isLoading,
        searchText,
        setSearchText,
        filteredSchedules,

        handlerAddSchedule,
        handlerRemoveSchedule,
        handlerScheduleSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getSchedules,
        getSchedulesByDoctorId,
        checkDoctorSchedules,
        checkScheduleConflict
    } = useSchedules();

    return (
        <ScheduleContext.Provider value={
            {
                schedules,
                scheduleSelected,
                initialScheduleForm,
                visibleForm,
                errors,
                isLoading,
                searchText,
                setSearchText,
                filteredSchedules,

                handlerAddSchedule,
                handlerRemoveSchedule,
                handlerScheduleSelectedForm,
                handlerOpenForm,
                handlerCloseForm,
                getSchedules,
                getSchedulesByDoctorId,
                checkDoctorSchedules,
                checkScheduleConflict
            }
        }>
            {children}
        </ScheduleContext.Provider>
    );
};