

interface ListTab {
    ID: number,
    TabName: string,
    layoutName: string
}

const listTab: ListTab[] = [
    {
        ID: 1,
        TabName: 'Select Box',
        layoutName: 'SelectBox'
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
    },
    {
        ID: 6,
        TabName: 'Modal Message',
        layoutName: 'ModalMessage'
    },
    {
        ID: 7,
        TabName: 'Preview Image',
        layoutName: 'PreviewImage'
    },
    {
        ID: 8,
        TabName: 'Button Basic',
        layoutName: 'ButtonBasic'
    },
];

export default {
    getListTab() {
        return listTab;
    },
};