/**
 * @name 权限码
 */ 
const BTN_IDS = {
  // 监测数据
  data: {
    list: '10500100',
    get: '10500101',
    mexport: '10500102', // 设备监测
    export: '10500202', // 监测数据
  },
  // 预警记录
  warnlist: {
    list: '10600100',
    get: '10600101',
  },
  // 参数设置
  warnset: {
    list: '10600200',
    status: '10600201',
    addItem: '10600202',
    removeItem: '10600203',
    updateItem: '10600204',
    listItem: '10600205',
  },
  // 设备管理
  device: {
    add: '10700100',
    remove: '10700101',
    update: '10700102',
    status: '10700103',
    list: '10700104',
    get: '10700105',
  },
  // 场馆管理
  stadium: {
    add: '10800300',
    remove: '10800301',
    update: '10800302',
    status: '10800303',
    bizstatus: '10800304',
    list: '10800305',
    get: '10800306',
  },
  // 角色管理
  role: {
    add: '10900100',
    update: '10900102',
    remove: '10900101',
    list: '10900103',
    get: '10900104',
  },
  // 角色授权
  staffRole: {
    get: '10900105', // 获取租户菜单
    set: '10900200', // 角色设定
  },
  // 员工管理
  staff: {
    add: '10900300',
    remove: '10900301',
    update: '10900302',
    status: '10900303',
    list: '10900304',
    get: '10900305',
    setRole: '10900105',
  },
  // 字典管理
  dict: {
    add: '10910100',
    remove: '10910101',
    update: '10910102',
    list: '10910103',
    get: '10910104',
    addItem: '10910105',
    removeItem: '10910106',
    updateItem: '10910107',
    listItem: '10910108',
    getItem: '10910109',
  },
  // 系统信息
  sysInfo: {
    get: '10910900',
  },
}

const P_BTN_IDS = {
  // 水质监测
  ground: {
    // 水质数据
    records: {
      list: '300100',
      get: '300101',
    },
    //  采集记录
    in: {
      list: '300200',
      get: '300201',
    },
    // 上报记录
    out: {
      list: '300300',
      get: '300301',
    },
    // 导出
    data: {
      mexport: '300402', // 设备监测
      export: '300102', // 监测数据
    },
  },
  // 设备管理
  device: {
    add: '400000',
    delete: '400001',
    update: '400002',
    status: '400003',
    list: '400004',
    get: '400005',
  },
  // 商户管理
  groupset: {
    add: '500000',
    delete: '500001',
    update: '500002',
    status: '500003',
    list: '500004',
    get: '500005',
  },
  // 厂商管理
  mfr: {
    add: '600000',
    delete: '600001',
    update: '600002',
    status: '600003',
    list: '600004',
    get: '600005',
  },
  contract: {
    add: '700000',
    cancel: '700001',
    list: '700002',
    get: '700003',
  },
  // 权限管理
  auth: {
    role: {
      add: '900100',
      delete: '900101',
      update: '900102',
      list: '900103',
      get: '900104',
    },
    staffRole: {
      set: '900200',
    },
    staff: {
      add: '900300',
      delete: '900301',
      update: '900302',
      status: '900303',
      list: '900304',
      get: '900305',
    },
  },
  // 系统管理
  sys: {
    dict: {
      add: '910100',
      delete: '910101',
      update: '910102',
      list: '910103',
      get: '910104',
      addItem: '910105',
      deleteItem: '910106',
      updateItem: '910107',
      allItem: '910108',
      getItem: '910109',
    },
    menu: '9108',
    sysInfo: {
      get: '910900',
    },
  },
}

export { BTN_IDS, P_BTN_IDS }
