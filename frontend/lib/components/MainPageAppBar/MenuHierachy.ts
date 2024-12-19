
export type TopMenuItem =
{
    key: string,
    name: string,
    link: string,    
};

export type TopMenu = 
{
    key: string,
    menuName: string,
    menuItems: TopMenuItem[]
}

export type TopMenuBar =
{
    menus: TopMenu[]
};

export const globalMenuBar: TopMenuBar = {
    menus:
    [
        {
            key: "1",
            menuName: "生产管理",
            menuItems: [
                {
                    key: "1-1",
                    name: "工件管理",
                    link: ""
                },
                {
                    key: "1-2",
                    name: "工艺管理",
                    link: ""
                },
                {
                    key: "1-3",
                    name: "程序管理",
                    link: ""
                },
                {
                    key: "1-4",
                    name: "设备管理",
                    link: ""
                },
                {
                    key: "1-5",
                    name: "夹具管理",
                    link: ""
                },
                {
                    key: "1-6",
                    name: "托盘管理",
                    link: ""
                },
                {
                    key: "1-7",
                    name: "日历班次管理",
                    link: "/ShiftManagement/index"
                },
            ]
        },
        {
            key: "2",
            menuName: "生产控制",
            menuItems: [
                {
                    key: "2-1",
                    name: "订单管理",
                    link: ""
                },
                {
                    key: "2-2",
                    name: "零件出入线管理",
                    link: ""
                },
                {
                    key: "2-3",
                    name: "自动排产",
                    link: ""
                },
                {
                    key: "2-4",
                    name: "系统调度",
                    link: ""
                },
                {
                    key: "2-5",
                    name: "生产控制面板",
                    link: ""
                }
            ]
        }
    ]
};