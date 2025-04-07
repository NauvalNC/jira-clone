"use client";

import React from 'react';
import ResponsiveModal from "@/components/responsive-modal";
import useEditTaskModal from "@/features/tasks/hooks/use-edit-task-modal";
import EditTaskFormWrapper from "@/features/tasks/components/edit-task-form-wrapper";

const EditTaskModal = () => {
    const {taskId, close} = useEditTaskModal();

    return (
        <ResponsiveModal open={!!taskId} onOpenChange={close}>
            {taskId && (
                <EditTaskFormWrapper id={taskId} onCancel={close}/>
            )}
        </ResponsiveModal>
    );
};

export default EditTaskModal;