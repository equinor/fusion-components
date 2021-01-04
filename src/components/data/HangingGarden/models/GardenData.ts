export type GardenData<T> = {
    data: T[];
    cacheAge: Date;
    cacheDurationInMinutes: number;
};