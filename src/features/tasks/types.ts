export enum TaskStatus {
    BACKLOG = "BACKLOG",
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    IN_REVIEW = "IN_REVIEW",
    DONE = "DONE"
}

export type ProjectOption = {
    id: string,
    name: string,
    imageUrl?: string
}

export type MemberOption = {
    id: string,
    name: string
}