import { Projects } from "./projects";
import { Users } from "./users";
export interface Tasks {
    _id: string;
    projectId: Projects;
    name: string;
    describe: string;
    memberId: Users;
    priority: number;
    status: number;
}