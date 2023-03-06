export interface ErrorMessage {
    type?: string;
    title?: string;
    body?: string;
}
export interface ErrorReachedAttempt {
    showError: boolean
    message: string
}