Config = {}
Config.Menu = {
    {
        id = "personal",
        icon = "fa-solid fa-user",
        label = "个人",
        type = "submenu",
        submenu = {
            {
                id = "togglenames",
                icon = "fa-solid fa-lock",
                label = "开/关头顶显示",
                type = "command",
                command = "togglenames",
            },
            {
                id = "selfview",
                icon = "fa-solid fa-camera",
                label = "开/关自拍模式",
                type = "command",
                command = "selfview",
            },
            {
                id = "rs_extra:rockstar",
                icon = "fa-solid fa-star",
                label = "R星编辑器",
                type = "event",
                event = "rs_extra:rockstar",
            },
            {
                id = "mail",
                icon = "fa-solid fa-envelope",
                label = "邮箱",
                type = "command",
                command = "mail",
            },
            {
                id = "task",
                icon = "fa-solid fa-list",
                label = "任务",
                type = "command",
                command = "task",
            },
            {
                id = "rank",
                icon = "fa-solid fa-list",
                label = "排行榜",
                type = "command",
                command = "rank",
            },
            {
                id = "wf",
                icon = "fa-brands fa-wolf-pack-battalion",
                label = "狼人杀",
                type = "command",
                command = "wf",
            },
            {
                id = "squads",
                icon = "fa-solid fa-list",
                label = "组队",
                type = "command",
                command = "squads",
            },
            {
                id = "avatar",
                icon = "fa-solid fa-user-tie",
                label = "修改头像",
                type = "command",
                command = "avatar",
            },
            {
                id = "hud",
                icon = "fa-solid fa-gear",
                label = "设置HUD",
                type = "command",
                command = "hud",
            },
            {
                id = "reloadskin",
                icon = "fa-solid fa-shirt",
                label = "重新加载角色",
                type = "command",
                command = "reloadskin",
            },
        },
    },
    {
        id = "emotes",
        icon = "fa-solid fa-face-smile",
        label = "表情菜单",
        type = "command",
        command = "emotemenu",
        iconClass = "icon-yellow",
    },
}