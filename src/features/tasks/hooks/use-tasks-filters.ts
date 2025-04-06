import {parseAsString, parseAsStringEnum, useQueryStates} from "nuqs";
import {TaskStatus} from "@/features/tasks/types";

const useTasksFilters = () => {
    return useQueryStates({
       projectId: parseAsString,
       status: parseAsStringEnum(Object.values(TaskStatus)),
       assigneeId: parseAsString,
       search: parseAsString,
       dueDate: parseAsString
    });
};

export default useTasksFilters;