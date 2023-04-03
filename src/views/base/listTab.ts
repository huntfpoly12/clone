interface ListTab {
  ID: number;
  TabName: string;
  layoutName: string;
}

const listTab: ListTab[] = [
  {
    ID: 1,
    TabName: "Decode JWT Information",
    layoutName: "JWTInfor",
  },
  {
    ID: 2,
    TabName: "Grid Prototype Option 1",
    layoutName: "GridPrototype2",
  },
  {
    ID: 3,
    TabName: "Grid Prototype Option 2",
    layoutName: "GridPrototype",
  },
  {
    ID: 4,
    TabName: "Text Box",
    layoutName: "TextBoxFrom",
  },
  {
    ID: 5,
    TabName: "Number Box",
    layoutName: "NumberBoxForm",
  },
  {
    ID: 6,
    TabName: "Date Time Box",
    layoutName: "DateTimeBoxForm",
  },
  {
    ID: 7,
    TabName: "Check Box",
    layoutName: "CheckBoxFrom",
  },
  {
    ID: 8,
    TabName: "Modal Message",
    layoutName: "ModalMessage",
  },
  {
    ID: 9,
    TabName: "Preview Image",
    layoutName: "PreviewImage",
  },
  {
    ID: 10,
    TabName: "Button Basic",
    layoutName: "ButtonBasic",
  },
  {
    ID: 11,
    TabName: "Tag",
    layoutName: "TagBox",
  },
  {
    ID: 12,
    TabName: "Action Header",
    layoutName: "ActionHeader",
  },
  {
    ID: 13,
    TabName: "Select Box",
    layoutName: "SelectBox",
  }
];

export default {
  getListTab() {
    return listTab;
  },
};
