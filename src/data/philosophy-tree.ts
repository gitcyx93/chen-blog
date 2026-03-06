// ─────────────────────────────────────────────────────────────────────────────
//  哲学谱系数据
//  年份规则：负数 = BC（公元前），正数 = AD
// ─────────────────────────────────────────────────────────────────────────────

export interface Philosopher {
  id: string;
  name: string;      // 英文/原文名
  nameZh: string;    // 中文名
  years: string;     // 显示用，如 "469–399 BC"
  birthYear: number; // 时间轴定位用
  bio: string;       // 一句话简介
}

export interface School {
  id: string;
  nameZh: string;
  nameEn: string;
  yearRange: [number, number]; // [开始年, 结束年]
  lane: number;                // Y 泳道（0 = 顶部）
  color: string;               // 主色（fill）
  strokeColor: string;         // 边框/描边色
  philosophers: Philosopher[];
  influences: string[];        // 影响了哪些 school.id（画箭头用）
}

export const schools: School[] = [
  // ── 泳道 0 ──────────────────────────────────────────────────
  {
    id: 'presocratic',
    nameZh: '前苏格拉底',
    nameEn: 'Pre-Socratics',
    yearRange: [-620, -400],
    lane: 0,
    color: '#3b4f6e',
    strokeColor: '#8fbcbb',
    influences: ['socratic', 'atomism'],
    philosophers: [
      { id: 'thales',      name: 'Thales',      nameZh: '泰勒斯',   years: 'c. 624–546 BC', birthYear: -624, bio: '万物皆由水构成；西方哲学之父' },
      { id: 'heraclitus',  name: 'Heraclitus',  nameZh: '赫拉克利特', years: 'c. 535–475 BC', birthYear: -535, bio: '万物流变，对立统一；"人不能两次踏入同一条河流"' },
      { id: 'parmenides',  name: 'Parmenides',  nameZh: '巴门尼德',  years: 'c. 515–450 BC', birthYear: -515, bio: '存在者存在，非存在者不存在；理性高于感官' },
      { id: 'empedocles',  name: 'Empedocles',  nameZh: '恩培多克勒', years: 'c. 494–434 BC', birthYear: -494, bio: '四元素说（土、水、火、气）+ 爱与争' },
    ],
  },

  // ── 泳道 1 ──────────────────────────────────────────────────
  {
    id: 'atomism',
    nameZh: '原子论',
    nameEn: 'Atomism',
    yearRange: [-460, -270],
    lane: 1,
    color: '#3b4f5e',
    strokeColor: '#88c0d0',
    influences: ['epicurean'],
    philosophers: [
      { id: 'leucippus',   name: 'Leucippus',   nameZh: '留基伯',   years: 'c. 480 BC',      birthYear: -480, bio: '最早提出原子与虚空理论' },
      { id: 'democritus',  name: 'Democritus',  nameZh: '德谟克利特', years: 'c. 460–370 BC', birthYear: -460, bio: '原子论完善者；"快乐"是最高善' },
    ],
  },

  // ── 泳道 2 ──────────────────────────────────────────────────
  {
    id: 'socratic',
    nameZh: '苏格拉底传统',
    nameEn: 'Socratic',
    yearRange: [-470, -322],
    lane: 2,
    color: '#2e4a5e',
    strokeColor: '#81a1c1',
    influences: ['stoic', 'neoplatonism', 'scholastic'],
    philosophers: [
      { id: 'socrates',    name: 'Socrates',    nameZh: '苏格拉底',  years: '469–399 BC',    birthYear: -469, bio: '辩证法与"我知我无知"；为真理饮鸩而死' },
      { id: 'plato',       name: 'Plato',       nameZh: '柏拉图',    years: '428–348 BC',    birthYear: -428, bio: '理念论；《理想国》；哲学王' },
      { id: 'aristotle',   name: 'Aristotle',   nameZh: '亚里士多德', years: '384–322 BC',   birthYear: -384, bio: '百科全书式哲学家；逻辑学、伦理学、政治学奠基人' },
    ],
  },

  // ── 泳道 3 ──────────────────────────────────────────────────
  {
    id: 'stoic',
    nameZh: '斯多葛主义',
    nameEn: 'Stoicism',
    yearRange: [-300, 180],
    lane: 3,
    color: '#3a4d5a',
    strokeColor: '#5e81ac',
    influences: [],
    philosophers: [
      { id: 'zeno',        name: 'Zeno of Citium', nameZh: '芝诺',  years: 'c. 334–262 BC', birthYear: -334, bio: '斯多葛学派创始人；美德即幸福' },
      { id: 'epictetus',   name: 'Epictetus',   nameZh: '爱比克泰德', years: 'c. 50–135 AD', birthYear:   50, bio: '奴隶出身的哲学家；只有意志在你掌控之中' },
      { id: 'aurelius',    name: 'Marcus Aurelius', nameZh: '马可·奥勒留', years: '121–180 AD', birthYear: 121, bio: '哲学家皇帝；《沉思录》' },
      { id: 'seneca',      name: 'Seneca',       nameZh: '塞内卡',   years: 'c. 4 BC–65 AD', birthYear: -4,  bio: '斯多葛实践者；悲剧作家；尼禄的老师' },
    ],
  },

  // ── 泳道 4 ──────────────────────────────────────────────────
  {
    id: 'epicurean',
    nameZh: '伊壁鸠鲁主义',
    nameEn: 'Epicureanism',
    yearRange: [-341, 50],
    lane: 4,
    color: '#3a4e4a',
    strokeColor: '#a3be8c',
    influences: [],
    philosophers: [
      { id: 'epicurus',    name: 'Epicurus',    nameZh: '伊壁鸠鲁',  years: '341–270 BC',    birthYear: -341, bio: '快乐主义（淡泊宁静）；死亡与我们无关' },
      { id: 'lucretius',   name: 'Lucretius',   nameZh: '卢克莱修',  years: 'c. 99–55 BC',  birthYear:  -99, bio: '《物性论》；用诗歌阐述原子论与唯物主义' },
    ],
  },

  // ── 泳道 5 ──────────────────────────────────────────────────
  {
    id: 'neoplatonism',
    nameZh: '新柏拉图主义',
    nameEn: 'Neoplatonism',
    yearRange: [204, 529],
    lane: 5,
    color: '#3f3a5e',
    strokeColor: '#b48ead',
    influences: ['scholastic'],
    philosophers: [
      { id: 'plotinus',    name: 'Plotinus',    nameZh: '普罗提诺',  years: '204–270 AD',    birthYear:  204, bio: '太一（The One）流溢论；灵魂向上回归神圣' },
      { id: 'augustine',   name: 'Augustine',   nameZh: '奥古斯丁',  years: '354–430 AD',    birthYear:  354, bio: '上帝之城与人之城；原罪与恩典神学' },
    ],
  },

  // ── 泳道 6 ──────────────────────────────────────────────────
  {
    id: 'scholastic',
    nameZh: '经院哲学',
    nameEn: 'Scholasticism',
    yearRange: [800, 1400],
    lane: 6,
    color: '#3e4a3e',
    strokeColor: '#8fbcbb',
    influences: ['rationalism', 'empiricism'],
    philosophers: [
      { id: 'anselm',      name: 'Anselm',      nameZh: '安瑟伦',   years: '1033–1109',     birthYear: 1033, bio: '本体论证明上帝存在；信仰寻求理解' },
      { id: 'aquinas',     name: 'Thomas Aquinas', nameZh: '托马斯·阿奎那', years: '1225–1274', birthYear: 1225, bio: '信仰与理性融合；五路证明上帝存在' },
      { id: 'ockham',      name: "William of Ockham", nameZh: '威廉·奥卡姆', years: 'c. 1287–1347', birthYear: 1287, bio: '奥卡姆剃刀原则；唯名论' },
      { id: 'avicenna',    name: 'Avicenna (Ibn Sina)', nameZh: '伊本·西拿', years: '980–1037', birthYear: 980, bio: '伊斯兰黄金时代；医学与亚里士多德注疏' },
    ],
  },

  // ── 泳道 7 ──────────────────────────────────────────────────
  {
    id: 'rationalism',
    nameZh: '理性主义',
    nameEn: 'Rationalism',
    yearRange: [1596, 1716],
    lane: 7,
    color: '#4e4a2e',
    strokeColor: '#ebcb8b',
    influences: ['kant', 'idealism'],
    philosophers: [
      { id: 'descartes',   name: 'Descartes',   nameZh: '笛卡尔',   years: '1596–1650',     birthYear: 1596, bio: '"我思故我在"；心身二元论；解析几何' },
      { id: 'spinoza',     name: 'Spinoza',     nameZh: '斯宾诺莎',  years: '1632–1677',     birthYear: 1632, bio: '泛神论；上帝即自然；理智之爱' },
      { id: 'leibniz',     name: 'Leibniz',     nameZh: '莱布尼茨',  years: '1646–1716',     birthYear: 1646, bio: '单子论；微积分；"最好的可能世界"' },
    ],
  },

  // ── 泳道 8 ──────────────────────────────────────────────────
  {
    id: 'empiricism',
    nameZh: '经验主义',
    nameEn: 'Empiricism',
    yearRange: [1561, 1776],
    lane: 8,
    color: '#4e3a2e',
    strokeColor: '#d08770',
    influences: ['kant', 'utilitarianism'],
    philosophers: [
      { id: 'bacon',       name: 'Francis Bacon', nameZh: '培根',   years: '1561–1626',     birthYear: 1561, bio: '科学归纳法；"知识就是力量"' },
      { id: 'locke',       name: 'John Locke',  nameZh: '洛克',     years: '1632–1704',     birthYear: 1632, bio: '白板说；天赋人权；财产权三原则' },
      { id: 'hume',        name: 'David Hume',  nameZh: '休谟',     years: '1711–1776',     birthYear: 1711, bio: '因果律的怀疑；"是"与"应该"的鸿沟' },
    ],
  },

  // ── 泳道 9 ──────────────────────────────────────────────────
  {
    id: 'kant',
    nameZh: '批判哲学',
    nameEn: 'Critical Philosophy',
    yearRange: [1724, 1804],
    lane: 9,
    color: '#4e3e2e',
    strokeColor: '#bf616a',
    influences: ['idealism'],
    philosophers: [
      { id: 'kant',        name: 'Immanuel Kant', nameZh: '康德',   years: '1724–1804',     birthYear: 1724, bio: '哥白尼式革命；范畴先验性；定言命令' },
    ],
  },

  // ── 泳道 10 ─────────────────────────────────────────────────
  {
    id: 'idealism',
    nameZh: '德国观念论与批判',
    nameEn: 'German Idealism & Critique',
    yearRange: [1770, 1900],
    lane: 10,
    color: '#4a2e2e',
    strokeColor: '#bf616a',
    influences: ['existentialism', 'analytic'],
    philosophers: [
      { id: 'hegel',       name: 'Hegel',       nameZh: '黑格尔',   years: '1770–1831',     birthYear: 1770, bio: '辩证法（正-反-合）；绝对精神；历史终结' },
      { id: 'schopenhauer', name: 'Schopenhauer', nameZh: '叔本华', years: '1788–1860',     birthYear: 1788, bio: '意志与表象；悲观主义；东方哲学融合' },
      { id: 'marx',        name: 'Karl Marx',   nameZh: '马克思',   years: '1818–1883',     birthYear: 1818, bio: '历史唯物主义；阶级斗争；《共产党宣言》' },
      { id: 'nietzsche',   name: 'Nietzsche',   nameZh: '尼采',     years: '1844–1900',     birthYear: 1844, bio: '"上帝已死"；超人；权力意志；永恒轮回' },
      { id: 'mill',        name: 'John Stuart Mill', nameZh: '约翰·穆勒', years: '1806–1873', birthYear: 1806, bio: '功利主义完善；自由原则；女性平等权利' },
    ],
  },

  // ── 泳道 11 ─────────────────────────────────────────────────
  {
    id: 'existentialism',
    nameZh: '现象学与存在主义',
    nameEn: 'Phenomenology & Existentialism',
    yearRange: [1838, 1980],
    lane: 11,
    color: '#2e4a3a',
    strokeColor: '#a3be8c',
    influences: [],
    philosophers: [
      { id: 'kierkegaard', name: 'Kierkegaard', nameZh: '克尔凯郭尔', years: '1813–1855',   birthYear: 1813, bio: '存在先于本质；三个生存阶段；信仰的飞跃' },
      { id: 'husserl',     name: 'Husserl',     nameZh: '胡塞尔',   years: '1859–1938',     birthYear: 1859, bio: '现象学创始人；意向性；回到事物本身' },
      { id: 'heidegger',   name: 'Heidegger',  nameZh: '海德格尔',  years: '1889–1976',     birthYear: 1889, bio: '此在与存在；向死而生；技术的追问' },
      { id: 'sartre',      name: 'Sartre',      nameZh: '萨特',     years: '1905–1980',     birthYear: 1905, bio: '"存在先于本质"；他者即地狱；参与式知识分子' },
      { id: 'camus',       name: 'Camus',       nameZh: '加缪',     years: '1913–1960',     birthYear: 1913, bio: '荒诞哲学；西西弗斯的幸福；反抗' },
      { id: 'beauvoir',    name: 'Simone de Beauvoir', nameZh: '波伏娃', years: '1908–1986', birthYear: 1908, bio: '"女人不是天生的"；存在主义女性主义' },
    ],
  },

  // ── 泳道 12 ─────────────────────────────────────────────────
  {
    id: 'analytic',
    nameZh: '分析哲学',
    nameEn: 'Analytic Philosophy',
    yearRange: [1848, 2020],
    lane: 12,
    color: '#2a3a4e',
    strokeColor: '#88c0d0',
    influences: [],
    philosophers: [
      { id: 'frege',       name: 'Frege',       nameZh: '弗雷格',   years: '1848–1925',     birthYear: 1848, bio: '现代逻辑学之父；概念文字；算术的逻辑基础' },
      { id: 'russell',     name: 'Bertrand Russell', nameZh: '罗素', years: '1872–1970',    birthYear: 1872, bio: '逻辑原子主义；《数学原理》；和平主义' },
      { id: 'wittgenstein', name: 'Wittgenstein', nameZh: '维特根斯坦', years: '1889–1951', birthYear: 1889, bio: '前期：语言图像论；后期：语言游戏与生活形式' },
      { id: 'popper',      name: 'Karl Popper', nameZh: '波普尔',   years: '1902–1994',     birthYear: 1902, bio: '可证伪性原则；批判理性主义；开放社会' },
      { id: 'foucault',    name: 'Foucault',    nameZh: '福柯',     years: '1926–1984',     birthYear: 1926, bio: '权力/知识；规训与惩罚；话语分析' },
      { id: 'habermas',    name: 'Habermas',    nameZh: '哈贝马斯', years: '1929–',          birthYear: 1929, bio: '交往行动理论；公共领域；现代性辩护' },
      { id: 'rawls',       name: 'John Rawls',  nameZh: '罗尔斯',   years: '1921–2002',     birthYear: 1921, bio: '无知之幕；正义论；差别原则' },
    ],
  },
];

// 影响关系（school id 对）：用于画跨泳道箭头
export const influences: Array<{ from: string; to: string }> = [
  { from: 'presocratic',   to: 'socratic'       },
  { from: 'presocratic',   to: 'atomism'        },
  { from: 'atomism',       to: 'epicurean'      },
  { from: 'socratic',      to: 'stoic'          },
  { from: 'socratic',      to: 'neoplatonism'   },
  { from: 'neoplatonism',  to: 'scholastic'     },
  { from: 'scholastic',    to: 'rationalism'    },
  { from: 'scholastic',    to: 'empiricism'     },
  { from: 'rationalism',   to: 'kant'           },
  { from: 'empiricism',    to: 'kant'           },
  { from: 'kant',          to: 'idealism'       },
  { from: 'idealism',      to: 'existentialism' },
  { from: 'idealism',      to: 'analytic'       },
];
