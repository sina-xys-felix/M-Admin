import { h } from 'vue'
import { IconDriveFile } from '@arco-design/web-vue/es/icon'

export const treeData = [
  {
    key: '11',
    title: '北京市',
    children: [
      {
        key: '1101',
        title: '市辖区',
        children: [
          { key: '110101', title: '东城区', icon: () => h(IconDriveFile) },
          { key: '110102', title: '西城区', icon: () => h(IconDriveFile) },
          { key: '110105', title: '朝阳区', icon: () => h(IconDriveFile) },
          { key: '110106', title: '丰台区', icon: () => h(IconDriveFile) },
        ],
      },
    ],
  },
  {
    key: '12',
    title: '天津市',
    children: [
      {
        key: '1201',
        title: '市辖区',
        children: [
          { key: '120101', title: '和平区', icon: () => h(IconDriveFile) },
          { key: '120102', title: '河东区', icon: () => h(IconDriveFile) },
        ],
      },
    ],
  },
  {
    key: '13',
    title: '河北省',
    children: [
      {
        key: '1301',
        title: '石家庄市',
        children: [
          { key: '130102', title: '长安区', icon: () => h(IconDriveFile) },
          { key: '130104', title: '桥西区', icon: () => h(IconDriveFile) },
        ],
      },
      {
        key: '1302',
        title: '唐山市',
        children: [
          { key: '130202', title: '路南区', icon: () => h(IconDriveFile) },
          { key: '130203', title: '路北区', icon: () => h(IconDriveFile) },
        ],
      },
    ],
  },
  {
    key: '14',
    title: '山西省',
    children: [
      {
        key: '1401',
        title: '太原市',
        children: [
          { key: '140105', title: '小店区', icon: () => h(IconDriveFile) },
          { key: '140106', title: '迎泽区', icon: () => h(IconDriveFile) },
        ],
      },
    ],
  },
  {
    key: '15',
    title: '内蒙古自治区',
    children: [
      {
        key: '1501',
        title: '呼和浩特市',
        children: [
          { key: '150102', title: '新城区', icon: () => h(IconDriveFile) },
          { key: '150103', title: '回民区', icon: () => h(IconDriveFile) },
        ],
      },
    ],
  },
  {
    key: '21',
    title: '辽宁省',
    children: [
      {
        key: '2101',
        title: '沈阳市',
        children: [
          { key: '210102', title: '和平区', icon: () => h(IconDriveFile) },
          { key: '210103', title: '沈河区', icon: () => h(IconDriveFile) },
        ],
      },
    ],
  },
  {
    key: '22',
    title: '吉林省',
    children: [
      {
        key: '2201',
        title: '长春市',
        children: [
          { key: '220102', title: '南关区', icon: () => h(IconDriveFile) },
          { key: '220103', title: '宽城区', icon: () => h(IconDriveFile) },
        ],
      },
    ],
  },
  {
    key: '23',
    title: '黑龙江省',
    children: [
      {
        key: '2301',
        title: '哈尔滨市',
        children: [
          { key: '230102', title: '道里区', icon: () => h(IconDriveFile) },
          { key: '230103', title: '南岗区', icon: () => h(IconDriveFile) },
        ],
      },
    ],
  },
  {
    key: '32',
    title: '江苏省',
    children: [
      {
        key: '3201',
        title: '南京市',
        children: [
          { key: '320102', title: '玄武区', icon: () => h(IconDriveFile) },
          { key: '320104', title: '秦淮区', icon: () => h(IconDriveFile) },
        ],
      },
      {
        key: '3205',
        title: '苏州市',
        children: [
          { key: '320505', title: '虎丘区', icon: () => h(IconDriveFile) },
          { key: '320506', title: '吴中区', icon: () => h(IconDriveFile) },
        ],
      },
    ],
  },
  {
    key: '33',
    title: '浙江省',
    children: [
      {
        key: '3301',
        title: '杭州市',
        children: [
          { key: '330102', title: '上城区', icon: () => h(IconDriveFile) },
          { key: '330103', title: '下城区', icon: () => h(IconDriveFile) },
        ],
      },
    ],
  },
  {
    key: '34',
    title: '安徽省',
    children: [
      {
        key: '3401',
        title: '合肥市',
        children: [
          { key: '340102', title: '瑶海区', icon: () => h(IconDriveFile) },
          { key: '340103', title: '庐阳区', icon: () => h(IconDriveFile) },
        ],
      },
    ],
  },
  {
    key: '35',
    title: '福建省',
    children: [
      {
        key: '3501',
        title: '福州市',
        children: [
          { key: '350102', title: '鼓楼区', icon: () => h(IconDriveFile) },
          { key: '350103', title: '台江区', icon: () => h(IconDriveFile) },
        ],
      },
    ],
  },
  {
    key: '36',
    title: '江西省',
    children: [
      {
        key: '3601',
        title: '南昌市',
        children: [
          { key: '360102', title: '东湖区', icon: () => h(IconDriveFile) },
          { key: '360103', title: '西湖区', icon: () => h(IconDriveFile) },
        ],
      },
    ],
  },
  {
    key: '37',
    title: '山东省',
    children: [
      {
        key: '3701',
        title: '济南市',
        children: [
          { key: '370102', title: '历下区', icon: () => h(IconDriveFile) },
          { key: '370103', title: '市中区', icon: () => h(IconDriveFile) },
        ],
      },
      {
        key: '3702',
        title: '青岛市',
        children: [
          { key: '370202', title: '市南区', icon: () => h(IconDriveFile) },
          { key: '370203', title: '市北区', icon: () => h(IconDriveFile) },
        ],
      },
    ],
  },
  {
    key: '41',
    title: '河南省',
    children: [
      {
        key: '4101',
        title: '郑州市',
        children: [
          { key: '410102', title: '中原区', icon: () => h(IconDriveFile) },
          { key: '410103', title: '二七区', icon: () => h(IconDriveFile) },
        ],
      },
    ],
  },
  {
    key: '42',
    title: '湖北省',
    children: [
      {
        key: '4201',
        title: '武汉市',
        children: [
          { key: '420102', title: '江岸区', icon: () => h(IconDriveFile) },
          { key: '420103', title: '江汉区', icon: () => h(IconDriveFile) },
        ],
      },
    ],
  },
  {
    key: '43',
    title: '湖南省',
    children: [
      {
        key: '4301',
        title: '长沙市',
        children: [
          { key: '430102', title: '芙蓉区', icon: () => h(IconDriveFile) },
          { key: '430103', title: '天心区', icon: () => h(IconDriveFile) },
        ],
      },
    ],
  },
  {
    key: '44',
    title: '广东省',
    children: [
      {
        key: '4401',
        title: '广州市',
        children: [
          { key: '440103', title: '荔湾区', icon: () => h(IconDriveFile) },
          { key: '440104', title: '越秀区', icon: () => h(IconDriveFile) },
        ],
      },
      {
        key: '4403',
        title: '深圳市',
        children: [
          { key: '440303', title: '罗湖区', icon: () => h(IconDriveFile) },
          { key: '440304', title: '福田区', icon: () => h(IconDriveFile) },
        ],
      },
    ],
  },
  {
    key: '45',
    title: '广西壮族自治区',
    children: [
      {
        key: '4501',
        title: '南宁市',
        children: [
          { key: '450102', title: '兴宁区', icon: () => h(IconDriveFile) },
          { key: '450103', title: '青秀区', icon: () => h(IconDriveFile) },
        ],
      },
    ],
  },
  {
    key: '46',
    title: '海南省',
    children: [
      {
        key: '4601',
        title: '海口市',
        children: [
          { key: '460105', title: '秀英区', icon: () => h(IconDriveFile) },
          { key: '460106', title: '龙华区', icon: () => h(IconDriveFile) },
        ],
      },
    ],
  },
  {
    key: '50',
    title: '重庆市',
    children: [
      {
        key: '5001',
        title: '市辖区',
        children: [
          { key: '500101', title: '万州区', icon: () => h(IconDriveFile) },
          { key: '500102', title: '涪陵区', icon: () => h(IconDriveFile) },
        ],
      },
    ],
  },
  {
    key: '51',
    title: '四川省',
    children: [
      {
        key: '5101',
        title: '成都市',
        children: [
          { key: '510104', title: '锦江区', icon: () => h(IconDriveFile) },
          { key: '510105', title: '青羊区', icon: () => h(IconDriveFile) },
        ],
      },
    ],
  },
  {
    key: '52',
    title: '贵州省',
    children: [
      {
        key: '5201',
        title: '贵阳市',
        children: [
          { key: '520102', title: '南明区', icon: () => h(IconDriveFile) },
          { key: '520103', title: '云岩区', icon: () => h(IconDriveFile) },
        ],
      },
    ],
  },
  {
    key: '53',
    title: '云南省',
    children: [
      {
        key: '5301',
        title: '昆明市',
        children: [
          { key: '530102', title: '五华区', icon: () => h(IconDriveFile) },
          { key: '530103', title: '盘龙区', icon: () => h(IconDriveFile) },
        ],
      },
    ],
  },
  {
    key: '54',
    title: '西藏自治区',
    children: [
      {
        key: '5401',
        title: '拉萨市',
        children: [
          { key: '540102', title: '城关区', icon: () => h(IconDriveFile) },
          { key: '540103', title: '堆龙德庆区', icon: () => h(IconDriveFile) },
        ],
      },
    ],
  },
  {
    key: '61',
    title: '陕西省',
    children: [
      {
        key: '6101',
        title: '西安市',
        children: [
          { key: '610102', title: '新城区', icon: () => h(IconDriveFile) },
          { key: '610103', title: '碑林区', icon: () => h(IconDriveFile) },
        ],
      },
    ],
  },
  {
    key: '62',
    title: '甘肃省',
    children: [
      {
        key: '6201',
        title: '兰州市',
        children: [
          { key: '620102', title: '城关区', icon: () => h(IconDriveFile) },
          { key: '620103', title: '七里河区', icon: () => h(IconDriveFile) },
        ],
      },
    ],
  },
  {
    key: '63',
    title: '青海省',
    children: [
      {
        key: '6301',
        title: '西宁市',
        children: [
          { key: '630102', title: '城东区', icon: () => h(IconDriveFile) },
          { key: '630103', title: '城中区', icon: () => h(IconDriveFile) },
        ],
      },
    ],
  },
  {
    key: '64',
    title: '宁夏回族自治区',
    children: [
      {
        key: '6401',
        title: '银川市',
        children: [
          { key: '640104', title: '兴庆区', icon: () => h(IconDriveFile) },
          { key: '640105', title: '西夏区', icon: () => h(IconDriveFile) },
        ],
      },
    ],
  },
  {
    key: '65',
    title: '新疆维吾尔自治区',
    children: [
      {
        key: '6501',
        title: '乌鲁木齐市',
        children: [
          { key: '650102', title: '天山区', icon: () => h(IconDriveFile) },
          { key: '650103', title: '沙依巴克区', icon: () => h(IconDriveFile) },
        ],
      },
    ],
  },
  {
    key: '81',
    title: '香港特别行政区',
    children: [
      {
        key: '8101',
        title: '香港岛',
        children: [
          { key: '810101', title: '中西区', icon: () => h(IconDriveFile) },
          { key: '810102', title: '湾仔区', icon: () => h(IconDriveFile) },
        ],
      },
    ],
  },
  {
    key: '82',
    title: '澳门特别行政区',
    children: [
      {
        key: '8201',
        title: '澳门半岛',
        children: [
          { key: '820101', title: '花地玛堂区', icon: () => h(IconDriveFile) },
          { key: '820102', title: '圣安多尼堂区', icon: () => h(IconDriveFile) },
        ],
      },
    ],
  },
  {
    key: '71',
    title: '台湾省',
    children: [
      {
        key: '7101',
        title: '台北市',
        children: [
          { key: '710101', title: '中正区', icon: () => h(IconDriveFile) },
          { key: '710102', title: '大同区', icon: () => h(IconDriveFile) },
        ],
      },
    ],
  },
]
