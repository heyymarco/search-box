export interface SearchBoxSubmitEvent {
    search : string
    option : string
}
export type SearchBoxSubmitEventHandler = (event: SearchBoxSubmitEvent) => Promise<void>
