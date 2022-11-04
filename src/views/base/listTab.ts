

interface ListTab {
    ID: number,
    TabName: string,
    layoutName: string
}

const listTab: ListTab[] = [
    {
        ID: 1,
        TabName: 'Common Jangbuda',
        layoutName: 'CommonJangbudaForm'
    },
    {
        ID: 2,
        TabName: 'Text Box',
        layoutName: 'TextBoxFrom'
    },
    {
        ID: 3,
        TabName: 'Number Box',
        layoutName: 'NumberBoxForm'
    },
    {
        ID: 4,
        TabName: 'Date Time Box',
        layoutName: 'DateTimeBoxForm'
    },
    {
        ID: 5,
        TabName: 'Check Box',
        layoutName: 'CheckBoxFrom'
    }
];

export default {
    getListTab() {
        return listTab;
    },
};