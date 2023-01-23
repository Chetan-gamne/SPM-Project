import { Database } from 'arangojs';
export declare const databaseProviders: {
    provide: string;
    useFactory: () => Promise<Database>;
}[];
//# sourceMappingURL=database.provider.d.ts.map