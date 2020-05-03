export interface CrudRepository<T> {
    getAll(): Promise<T[]>;
    getNameById(id: number): Promise<T>;
    addNew(newObj: T): Promise<T>;
    update(object: T): Promise<boolean>;
    deleteById(id: number): Promise<boolean>;
};