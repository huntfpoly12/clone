interface ListTab {
  ID: number;
  TabName: string;
  layoutName: string;
}

const listTab: ListTab[] = [
  {
    ID: 1,
    TabName: "Grid Prototype Option 1",
    layoutName: "GridPrototype",
  },
  {
    ID: 2,
    TabName: "Grid Prototype Option 2",
    layoutName: "GridPrototype2",
  },
  {
    ID: 3,
    TabName: "Text Box",
    layoutName: "TextBoxFrom",
  },
  {
    ID: 4,
    TabName: "Number Box",
    layoutName: "NumberBoxForm",
  },
  {
    ID: 5,
    TabName: "Date Time Box",
    layoutName: "DateTimeBoxForm",
  },
  {
    ID: 6,
    TabName: "Check Box",
    layoutName: "CheckBoxFrom",
  },
  {
    ID: 7,
    TabName: "Modal Message",
    layoutName: "ModalMessage",
  },
  {
    ID: 8,
    TabName: "Preview Image",
    layoutName: "PreviewImage",
  },
  {
    ID: 9,
    TabName: "Button Basic",
    layoutName: "ButtonBasic",
  },
  {
    ID: 10,
    TabName: "Tag",
    layoutName: "TagBox",
  },
  {
    ID: 11,
    TabName: "Action Header",
    layoutName: "ActionHeader",
  },
  {
    ID: 12,
    TabName: "Select Box",
    layoutName: "SelectBox",
  }
];

export default {
  getListTab() {
    return listTab;
  },
};
