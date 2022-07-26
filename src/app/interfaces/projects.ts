import { Users } from './users';
export interface Projects {
    _id: string;
    name: string;
    leader: Users;
    members: Users[];
    price: number;
    startDate: string;
    endDate: string;
    status: number;
}