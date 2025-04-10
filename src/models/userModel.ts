export enum ROLES{
    ADMIN = 'admin',
    USER = 'user',
    GUEST = 'guest'
}

export interface User{
    id:string;
    name:string;
    role:ROLES;
}


const users:User[] = [
    {id:'139427',name:'Saurabh Kumar', role:ROLES.ADMIN},
    {id:'139428',name:'Gulam Mustaf', role:ROLES.USER},
    {id:'139656',name:'Mahetab Ansari', role:ROLES.GUEST},
]


export const getUserById = (id:string):User | undefined => {
    return users.find(user => user.id === id);
};