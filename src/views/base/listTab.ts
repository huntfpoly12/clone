

interface ListTab {
    ID: number,
    TabName: string,
    layoutName: string
}

const listTab: ListTab[] = [{
    ID: 1,
    TabName: 'Text Box',
    layoutName:'TextBoxFrom'
},
{
    ID: 2,
    TabName: 'Check Box',
    layoutName:'CheckBoxFrom'
}
];

export default {
    getListTab() {
        return listTab;
    },
};