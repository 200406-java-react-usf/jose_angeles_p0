export interface CrudRepository<T> {
    getAll(): Promise<T[]>;
    getById(id: number): Promise<T>;
    addNew(newObj: T): Promise<T>;
    update(object: T): Promise<T>;
    deleteById(id: number): Promise<boolean>;
};