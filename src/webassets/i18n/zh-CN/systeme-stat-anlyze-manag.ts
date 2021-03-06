/**
 * 系统管理语言解析
 * RM：角色管理语言解析
 * StaffM:员工管理语言解析
 * staffPsd：员工管理修改密码语言解析
 * @type {{RM: {listPage: {html: {title: string; add: string; rolez: string; onlysev: string; Becareful: string; hintO: string; hintT: string; hintS: string; serve: string; rolefuncp: string; multiselect: string; pleasefunc: string; savesuc: string; pleaserole: string; pleaseroleName: string; pleasedescription: string; pleaseselect: string}; search: {roleName: string}; tableCols: {roleName: string; description: string; parentName: string; createdTime: string}; tableActionCfg: {edit: string; del: string; editRole: string; addRole: string}; alert: {title: string}; navigate: {addrole: string}}; nzTitle: {step1Title: string; step2Title: string; step3Title: string}}; StaffM: {listPage: {html: {title: string; add: string; normal: string; frozen: string; distribution: string; updatePsd: string; pleaseallorole: string; save: string; cal: string; rolesuc: string; qus: string; savesuc: string; userName: string; realName: string; userPwd: string; phone: string; bank: string; onlysave: string; saverole: string; pleaseuserPwd: string; Pwdminlength: string; confirmuserPwdc: string; pleasephone: string; pleasemaxlength: string; pleaserealName: string; pleaseuserName: string; pleaseuserNamecon: string; all: string}; search: {userName: string; realName: string; isEnabled: string}; tableCols: {userName: string; b: string; realName: string; phone: string; allocation: string; isEnabled: string; enable: string; disable: string}; tableActionCfg: {edit: string; del: string}; alert: {psdModify: string; psdModifySU: string; qusdeluser: string; prompt: string; qusupdate: string; status: string; opsuc: string; enablesuc: string; disablesuc: string}; navigate: {addstaff: string; editstaff: string; staffmanage: string}}; nzTitle: {step1Title: string; step2Title: string; step3Title: string}}; staffPsd: {html: {userPwd: string; userPwdc: string; qus: string; cancel: string}}}}
 */
export const SYSTEME_STAT_ANLYZE_PROVIDE = {
    "RM":{
        "listPage":{
            "html":{
                "title":"角色管理",
                "add":"新增角色",
                "rolez":"角色组",
                "onlysev":"仅保存",
                "Becareful":"注意",
                "hintO":"各平台编辑角色时,暂时能选择该平台所有角色组",
                "hintT":"但只有归属于平台员工角色组的角色,才可以分配给员工",
                "hintS":"其他类型角色组暂未使用",
                "serve":"保存",
                "rolefuncp":"角色功能权限",
                "multiselect":"（可多选）",
                "pleasefunc":"请选择功能权限",
                "savesuc":"保存成功",
                "pleaserole":"请选择角色菜单权限",
                "pleaseroleName":"请输入角色名称!",
                "pleasedescription":"请输入角色描述!",
                "pleaseselect":"请选择",
                "all":"全选"

            },
            "search":{
                "roleName":"角色名称"
            },
            "tableCols":{
                "roleName":"角色名称",
                "description":"角色描述",
                "parentName":"所属角色组",
                "createdTime":"创建时间"

            },
            "tableActionCfg":{
                "edit":"编辑",
                "del":"删除",
                "editRole":"编辑角色",
                "addRole":"新增角色"
            },
            "alert":{
                "title":"您是否确认要删除该角色？"
            },
            "navigate":{
                "addrole":"新增角色"
            }

        },
        "nzTitle":{
            "step1Title":"基本信息",
            "step2Title":"关联菜单权限",
            "step3Title":"关联功能信息"
        }

    },
    "StaffM":{
        "listPage":{
            "html":{
                "title":"员工管理",
                "add":"新增员工",
                "normal":"正常",
                "frozen":"冻结",
                "distribution":"分配",
                "updatePsd":"修改密码",
                "pleaseallorole":"请选择该员工角色",
                "save":"保存",
                "cal":"取消",
                "rolesuc":"角色分配成功",
                "qus":"确定",
                "savesuc":"提交成功",
                "userName":"用户名",
                "realName":"员工姓名",
                "userPwd":"密码",
                "phone":"联系电话",
                "bank":"返回",
                "onlysave":"仅保存",
                "saverole":"保存并分配角色",
                "pleaseuserPwd":"请输入密码!",
                "Pwdminlength":"密码必须大于6位数!",
                "confirmuserPwdc":"两次密码不一致!",
                "pleasephone":"请输入您的联系号码!",
                "pleasemaxlength":"请输入正确的联系号码7-11为位数!",
                "pleaserealName":"请输入员工姓名!",
                "pleaseuserName":"请输入您的用户名!",
                "pleaseuserNamecon":"格式错误，不允许输入汉字!",
                "all":"全部"

            },
            "search":{
                "userName":"用户名",
                "realName":"员工姓名",
                "isEnabled":"使用状态"
            },
            "tableCols":{
                "userName":"用户名",
                "b":"密码",
                "realName":"员工姓名",
                "phone":"联系电话",
                "allocation":"角色分配",
                "isEnabled":"使用状态",
                "enable":"启用",
                "disable":"禁用"

            },
            "tableActionCfg":{
                "edit":"编辑",
                "del":"删除"

            },
            "alert":{
                "psdModify":"修改密码",
                "psdModifySU":"修改密码成功",
                "qusdeluser":"您是否确认要删除该用户？",
                "prompt":"提示",
                "qusupdate":"您确认要变更【{{0}}】的{{1}}状态吗？",
                "status":"状态吗？",
                "opsuc":"操作成功",
                "enablesuc":"已启用",
                "disablesuc":"已禁用"

            },
            "navigate":{
                "addstaff":"新增员工",
                "editstaff":"编辑员工",
                "staffmanage":"员工管理",
            }
        },
        "nzTitle":{
            "step1Title":"基本信息",
            "step2Title":"分配角色",
            "step3Title":"成功"
        }
    },
    "staffPsd":{
        "html":{
            "userPwd":"重新设置密码",
            "userPwdc":"再次确认密码",
            "qus":"确定",
            "cancel":"取消"
        }
    }
}
