

interface ListTab {
    ID: number,
    TabName: string,
    layoutName: string
}

const listTab: ListTab[] = [{
    ID: 1,
    TabName: 'Text Box',
    layoutName: 'TextBoxFrom'
},
{
    ID: 2,
    TabName: 'Modal Status',
    layoutName: 'PopupMessageMain'
}
];

export default {
    getListTab() {
        return listTab;
    },
};