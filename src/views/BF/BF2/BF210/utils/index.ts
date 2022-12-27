export const initialFormState = {
    id: 1,
    type: "r",
    username: "",
    name: "",
    mobilePhone: "",
    email: "",
    president: true,
    managerGrade: 1,
    accountingRole: true,
    withholdingRole: true,
    createdAt: 1,
    createdBy: "",
    updatedAt: 1,
    updatedBy: "",
    ip: "",
    active: true,
    groupId: "",
    groupCode: "",
    groupName: "",
    facilityBusinesses: [],
    screenRoleGroups: {
        id: "",
        name: "",
        type: "",
        readAdminScreenRoles: [],
        writeAdminScreenRoles: [],
        readWorkScreenRoles: [],
        writeWorkScreenRoles: [],
        lock: true,
        memo: "",
        createdAt: "",
        createdBy: "",
        updatedAt: "",
        updatedBy: "",
        ip: "",
        active: true
    }
};

export const dataSearchIndex = {
    page: 1,
    type: "r",
    groupCode: "",
    groupName: "",
    username: "",
    name: "",
}

export const productsValue = [
    {
        id: "c",
        color: '#096dd9',
        name: "고객사회원",
        background: '#e6f7ff',
        border: "1px solid #91d5ff",
    },
    {
        id: "m",
        color: 'white',
        name: "매니저회원",
        background: 'black',
        border: "1px solid black",
    },
    {
        id: "r",
        color: 'white',
        name: "영업자회원",
        background: 'grey',
        border: "1px solid grey",
    },
    {
        id: "p",
        color: 'white',
        name: "파트너회원",
        background: 'goldenrod',
        border: "1px solid goldenrod",
    }
]
