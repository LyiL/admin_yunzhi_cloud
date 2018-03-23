/**
 * 营销管理语言包
 * @type {{luoluo: {listPage: {title: string; search: {appName: string}; tableCols: {appName: string; downloadNum: string; devName: string; platform: string; releaseTime: string; createdTime: string; seleasebtn: string}}; detailOrAdd: {addTitle: string; editTitle: string; detailTitle: string; appName: string; devName: string; downloadNum: string; downloadUrl: string; createdTime: string; releaseTime: string; enclosure: string; appLogo: string; appImg1: string; appImg2: string; appImg3: string; platform: string; remark: string}; hint: {delApp1: string; delApp2: string; pleaseRemark: string}}}}
 */

export const MARKETING_MANAGE = {
    "luoluo": {
        "listPage": {
            "title": "络络应用",
            "search": {
                "appName": "应用名称"
            },
            "tableCols": {
                "appName": "应用名称",
                "downloadNum": "下载量",
                "devName": "开发者名称",
                "platform": "应用系统",
                "releaseTime": "发布时间",
                "createdTime": "创建时间",
                "seleasebtn": "生成发布链接"
            },
        },
        "detailOrAdd": {
            "addTitle": "新增络络应用",
            "editTitle": "编辑络络应用",
            "detailTitle": "络络应用详情",
            "appName": "应用名称",
            "devName": "开发者名称",
            "downloadNum": "下载量",
            "downloadUrl": "下载地址",
            "createdTime": "创建时间",
            "releaseTime": "发布时间",
            "enclosure": "附件",
            "appLogo": "应用logo",
            "appImg1": "应用图片1",
            "appImg2": "应用图片2",
            "appImg3": "应用图片3",
            "platform": "应用系统",
            "remark": "软件说明",
            "imagePreview": "图片预览",
            "reminder": "温馨提示",
            "android":"安卓",
            "ios":"苹果",
            "androidInfo": "提示：如果应用系统为安卓(Android)，下载地址格式需以.apk结束,例如：http://******.apk",
            "iosInfo": "提示：如果应用系统为苹果(iOS)，下载地址格式需为：应用名称/产品Id,例如：tinder/id547702041",
        },
        "hint": {
            "delApp1": "您确认要删除当前【",
            "delApp2": "】吗？",
            "pleaseRemark": "请输入软件说明！",
            "selease": "发布链接",
        }
    }
}
