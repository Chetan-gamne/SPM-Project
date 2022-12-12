export declare abstract class BaseService {
    abstract collection: any;
    getAll(opts: any): Promise<any[]>;
    getByKey(_key: string): Promise<any>;
    getByKeys(_key: string[]): Promise<any>;
    getByBindVars(bindVars: object): Promise<any>;
    updateBykey(_key: string, body: any): Promise<any>;
    insertOne(body: any): Promise<any>;
    deleteOne(_key: string): Promise<any>;
    deleteByKeys(_keys: string[]): Promise<any>;
    count(): Promise<any>;
}
//# sourceMappingURL=base.service.d.ts.map