// ─────────────────────────────────────────────────────────────────────────────
//  哲学谱系数据 — 树形结构
//  importance: 1 = 仅显示名字  2 = 中等节点  3 = 大节点 + 悬停详情
// ─────────────────────────────────────────────────────────────────────────────

export type NodeType = 'root' | 'region' | 'era' | 'school' | 'philosopher';
export type Importance = 1 | 2 | 3;

export interface PhiloNode {
  id: string;
  label: string;       // 显示名
  type: NodeType;
  importance?: Importance;
  nameEn?: string;
  years?: string;
  quote?: string;      // 悬停卡片：名言
  bio?: string;        // 悬停卡片：主义 / 简介
  color?: string;      // 节点/边颜色（子节点继承）
  children?: PhiloNode[];
}

export const philosophyTree: PhiloNode = {
  id: 'root',
  label: '哲学',
  type: 'root',
  color: '#88c0d0',
  children: [

    // ── 西方哲学 ──────────────────────────────────────────────────────────────
    {
      id: 'western',
      label: '西方哲学',
      type: 'region',
      color: '#81a1c1',
      children: [

        // ── 古代 ────────────────────────────────────────────────────────────
        {
          id: 'ancient',
          label: '古代',
          type: 'era',
          color: '#8fbcbb',
          children: [
            {
              id: 'presocratic',
              label: '前苏格拉底',
              type: 'school',
              color: '#8fbcbb',
              children: [
                { id: 'thales',      label: '泰勒斯',    type: 'philosopher', importance: 2,
                  nameEn: 'Thales', years: 'c. 624–546 BC',
                  bio: '西方哲学第一人；主张万物本原是水；开创自然哲学传统' },
                { id: 'heraclitus',  label: '赫拉克利特', type: 'philosopher', importance: 3,
                  nameEn: 'Heraclitus', years: 'c. 535–475 BC',
                  quote: '人不能两次踏入同一条河流',
                  bio: '万物流变论；对立统一；逻各斯（Logos）学说' },
                { id: 'parmenides',  label: '巴门尼德',   type: 'philosopher', importance: 3,
                  nameEn: 'Parmenides', years: 'c. 515–450 BC',
                  quote: '存在者存在，不存在者不存在',
                  bio: '存在论奠基；理性高于感官；不变的"一"' },
                { id: 'empedocles',  label: '恩培多克勒', type: 'philosopher', importance: 1,
                  nameEn: 'Empedocles', years: 'c. 494–434 BC' },
              ],
            },
            {
              id: 'atomism',
              label: '原子论',
              type: 'school',
              color: '#88c0d0',
              children: [
                { id: 'leucippus',   label: '留基伯',     type: 'philosopher', importance: 1,
                  nameEn: 'Leucippus', years: 'c. 480 BC' },
                { id: 'democritus',  label: '德谟克利特', type: 'philosopher', importance: 2,
                  nameEn: 'Democritus', years: 'c. 460–370 BC',
                  bio: '原子与虚空论；唯物主义奠基；"快乐"为最高善' },
              ],
            },
            {
              id: 'socratic',
              label: '苏格拉底传统',
              type: 'school',
              color: '#81a1c1',
              children: [
                { id: 'socrates',    label: '苏格拉底',   type: 'philosopher', importance: 3,
                  nameEn: 'Socrates', years: '469–399 BC',
                  quote: '我只知道我一无所知',
                  bio: '辩证法；道德哲学；助产术；为真理饮鸩而死' },
                { id: 'plato',       label: '柏拉图',     type: 'philosopher', importance: 3,
                  nameEn: 'Plato', years: '428–348 BC',
                  quote: '未经反思的人生不值得过',
                  bio: '理念论；洞穴隐喻；《理想国》；哲学王' },
                { id: 'aristotle',   label: '亚里士多德', type: 'philosopher', importance: 3,
                  nameEn: 'Aristotle', years: '384–322 BC',
                  quote: '人是政治的动物',
                  bio: '逻辑学奠基；形而上学；伦理学；百科全书式哲学家' },
              ],
            },
            {
              id: 'stoic',
              label: '斯多葛主义',
              type: 'school',
              color: '#5e81ac',
              children: [
                { id: 'zeno',        label: '芝诺',       type: 'philosopher', importance: 2,
                  nameEn: 'Zeno of Citium', years: 'c. 334–262 BC',
                  bio: '斯多葛学派创始人；美德即幸福；顺应自然' },
                { id: 'seneca',      label: '塞内卡',     type: 'philosopher', importance: 2,
                  nameEn: 'Seneca', years: 'c. 4 BC–65 AD',
                  bio: '斯多葛实践者；悲剧作家；尼禄之师' },
                { id: 'epictetus',   label: '爱比克泰德', type: 'philosopher', importance: 2,
                  nameEn: 'Epictetus', years: 'c. 50–135 AD',
                  bio: '奴隶出身；"只有意志在你掌控之中"；《手册》' },
                { id: 'aurelius',    label: '马可·奥勒留', type: 'philosopher', importance: 3,
                  nameEn: 'Marcus Aurelius', years: '121–180 AD',
                  quote: '你有权拥有意见，无权拥有错误的事实',
                  bio: '哲学家皇帝；《沉思录》；斯多葛主义践行者' },
              ],
            },
            {
              id: 'epicurean',
              label: '伊壁鸠鲁主义',
              type: 'school',
              color: '#a3be8c',
              children: [
                { id: 'epicurus',    label: '伊壁鸠鲁',   type: 'philosopher', importance: 3,
                  nameEn: 'Epicurus', years: '341–270 BC',
                  quote: '死亡与我们无关',
                  bio: '快乐主义（宁静淡泊）；原子论唯物主义；友谊为最高善' },
                { id: 'lucretius',   label: '卢克莱修',   type: 'philosopher', importance: 1,
                  nameEn: 'Lucretius', years: 'c. 99–55 BC' },
              ],
            },
          ],
        },

        // ── 中世纪 ──────────────────────────────────────────────────────────
        {
          id: 'medieval',
          label: '中世纪',
          type: 'era',
          color: '#b48ead',
          children: [
            {
              id: 'neoplatonism',
              label: '新柏拉图主义',
              type: 'school',
              color: '#b48ead',
              children: [
                { id: 'plotinus',    label: '普罗提诺',   type: 'philosopher', importance: 2,
                  nameEn: 'Plotinus', years: '204–270 AD',
                  bio: '太一流溢论；灵魂向上回归神圣；《九章集》' },
                { id: 'augustine',   label: '奥古斯丁',   type: 'philosopher', importance: 3,
                  nameEn: 'Augustine', years: '354–430 AD',
                  quote: '我们的心为你而造，除非安息在你怀中，否则难以平静',
                  bio: '上帝之城；原罪与恩典神学；意志自由论' },
              ],
            },
            {
              id: 'scholastic',
              label: '经院哲学',
              type: 'school',
              color: '#8fbcbb',
              children: [
                { id: 'anselm',      label: '安瑟伦',     type: 'philosopher', importance: 2,
                  nameEn: 'Anselm', years: '1033–1109',
                  bio: '本体论证明上帝存在；"信仰寻求理解"' },
                { id: 'avicenna',    label: '伊本·西拿',  type: 'philosopher', importance: 2,
                  nameEn: 'Avicenna (Ibn Sina)', years: '980–1037',
                  bio: '伊斯兰黄金时代；医学与亚里士多德注疏；灵魂飞人论' },
                { id: 'aquinas',     label: '托马斯·阿奎那', type: 'philosopher', importance: 3,
                  nameEn: 'Thomas Aquinas', years: '1225–1274',
                  quote: '信仰与理性并不矛盾',
                  bio: '信仰与理性融合；五路证明上帝存在；自然法理论' },
                { id: 'ockham',      label: '奥卡姆',     type: 'philosopher', importance: 2,
                  nameEn: 'William of Ockham', years: 'c. 1287–1347',
                  bio: '奥卡姆剃刀原则；唯名论；反教权主义' },
              ],
            },
          ],
        },

        // ── 近代 ────────────────────────────────────────────────────────────
        {
          id: 'modern',
          label: '近代',
          type: 'era',
          color: '#ebcb8b',
          children: [
            {
              id: 'rationalism',
              label: '理性主义',
              type: 'school',
              color: '#ebcb8b',
              children: [
                { id: 'descartes',   label: '笛卡尔',     type: 'philosopher', importance: 3,
                  nameEn: 'Descartes', years: '1596–1650',
                  quote: '我思，故我在',
                  bio: '方法论怀疑；心身二元论；近代哲学之父' },
                { id: 'spinoza',     label: '斯宾诺莎',   type: 'philosopher', importance: 3,
                  nameEn: 'Spinoza', years: '1632–1677',
                  quote: '上帝即自然',
                  bio: '泛神论；理智之爱；几何学方法做哲学' },
                { id: 'leibniz',     label: '莱布尼茨',   type: 'philosopher', importance: 3,
                  nameEn: 'Leibniz', years: '1646–1716',
                  quote: '我们生活在一切可能世界中最好的那个',
                  bio: '单子论；预定和谐；微积分；充足理由律' },
              ],
            },
            {
              id: 'empiricism',
              label: '经验主义',
              type: 'school',
              color: '#d08770',
              children: [
                { id: 'bacon',       label: '培根',       type: 'philosopher', importance: 2,
                  nameEn: 'Francis Bacon', years: '1561–1626',
                  quote: '知识就是力量',
                  bio: '科学归纳法；实验主义；"四假象"批判' },
                { id: 'locke',       label: '洛克',       type: 'philosopher', importance: 3,
                  nameEn: 'John Locke', years: '1632–1704',
                  quote: '人心初生如一块白板',
                  bio: '白板说；天赋人权；社会契约论；自由主义奠基' },
                { id: 'hume',        label: '休谟',       type: 'philosopher', importance: 3,
                  nameEn: 'David Hume', years: '1711–1776',
                  quote: '理性是激情的奴隶',
                  bio: '因果律的怀疑；"是"与"应该"的鸿沟；温和怀疑论' },
              ],
            },
            {
              id: 'kant_school',
              label: '批判哲学',
              type: 'school',
              color: '#5e81ac',
              children: [
                { id: 'kant',        label: '康德',       type: 'philosopher', importance: 3,
                  nameEn: 'Immanuel Kant', years: '1724–1804',
                  quote: '星空在我头顶，道德律在我心中',
                  bio: '哥白尼式革命；先验感性论；定言命令；自由意志' },
              ],
            },
          ],
        },

        // ── 现代 ────────────────────────────────────────────────────────────
        {
          id: 'contemporary',
          label: '现代',
          type: 'era',
          color: '#81a1c1',
          children: [
            {
              id: 'idealism',
              label: '德国观念论',
              type: 'school',
              color: '#bf616a',
              children: [
                { id: 'hegel',       label: '黑格尔',     type: 'philosopher', importance: 3,
                  nameEn: 'Hegel', years: '1770–1831',
                  quote: '存在的都是合理的，合理的都是存在的',
                  bio: '辩证法（正反合）；绝对精神；历史哲学' },
                { id: 'schopenhauer', label: '叔本华',    type: 'philosopher', importance: 3,
                  nameEn: 'Schopenhauer', years: '1788–1860',
                  quote: '生命是一种痛苦，历史是一个错误',
                  bio: '意志与表象；悲观主义；东西方哲学融合' },
                { id: 'nietzsche',   label: '尼采',       type: 'philosopher', importance: 3,
                  nameEn: 'Nietzsche', years: '1844–1900',
                  quote: '上帝已死',
                  bio: '超人理想；权力意志；永恒轮回；虚无主义批判' },
              ],
            },
            {
              id: 'marxism',
              label: '社会批判',
              type: 'school',
              color: '#d08770',
              children: [
                { id: 'marx',        label: '马克思',     type: 'philosopher', importance: 3,
                  nameEn: 'Karl Marx', years: '1818–1883',
                  quote: '哲学家们只是以不同方式解释世界，问题在于改变世界',
                  bio: '历史唯物主义；阶级斗争论；异化理论' },
              ],
            },
            {
              id: 'existentialism',
              label: '存在主义',
              type: 'school',
              color: '#a3be8c',
              children: [
                { id: 'kierkegaard', label: '克尔凯郭尔', type: 'philosopher', importance: 3,
                  nameEn: 'Kierkegaard', years: '1813–1855',
                  quote: '生命只能向后理解，却只能向前生活',
                  bio: '存在主义先驱；三个生存阶段；信仰的飞跃' },
                { id: 'husserl',     label: '胡塞尔',     type: 'philosopher', importance: 2,
                  nameEn: 'Husserl', years: '1859–1938',
                  bio: '现象学创始人；意向性；"回到事物本身"' },
                { id: 'heidegger',   label: '海德格尔',   type: 'philosopher', importance: 3,
                  nameEn: 'Heidegger', years: '1889–1976',
                  quote: '语言是存在的家园',
                  bio: '此在（Dasein）与存在；向死而生；技术的追问' },
                { id: 'sartre',      label: '萨特',       type: 'philosopher', importance: 3,
                  nameEn: 'Sartre', years: '1905–1980',
                  quote: '存在先于本质',
                  bio: '他者即地狱；人被判定为自由；参与式知识分子' },
                { id: 'camus',       label: '加缪',       type: 'philosopher', importance: 3,
                  nameEn: 'Camus', years: '1913–1960',
                  quote: '只有一个真正严肃的哲学问题，那就是自杀',
                  bio: '荒诞哲学；西西弗斯的幸福；反抗的哲学' },
                { id: 'beauvoir',    label: '波伏娃',     type: 'philosopher', importance: 2,
                  nameEn: 'Simone de Beauvoir', years: '1908–1986',
                  bio: '"女人不是天生的，而是后天造就的"；存在主义女性主义' },
              ],
            },
            {
              id: 'analytic',
              label: '分析哲学',
              type: 'school',
              color: '#88c0d0',
              children: [
                { id: 'frege',       label: '弗雷格',     type: 'philosopher', importance: 2,
                  nameEn: 'Frege', years: '1848–1925',
                  bio: '现代逻辑学之父；概念文字；逻辑主义' },
                { id: 'russell',     label: '罗素',       type: 'philosopher', importance: 3,
                  nameEn: 'Bertrand Russell', years: '1872–1970',
                  quote: '恐惧是迷信的根源，也是残忍的根源',
                  bio: '逻辑原子主义；《数学原理》；和平主义活动家' },
                { id: 'wittgenstein', label: '维特根斯坦', type: 'philosopher', importance: 3,
                  nameEn: 'Wittgenstein', years: '1889–1951',
                  quote: '凡是不可言说之物，对之必须沉默',
                  bio: '前期：语言图像论；后期：语言游戏与生活形式' },
                { id: 'popper',      label: '波普尔',     type: 'philosopher', importance: 2,
                  nameEn: 'Karl Popper', years: '1902–1994',
                  bio: '可证伪性原则；批判理性主义；开放社会' },
                { id: 'foucault',    label: '福柯',       type: 'philosopher', importance: 3,
                  nameEn: 'Foucault', years: '1926–1984',
                  quote: '知识即权力',
                  bio: '权力/知识；规训与惩罚；话语分析；知识考古学' },
                { id: 'rawls',       label: '罗尔斯',     type: 'philosopher', importance: 2,
                  nameEn: 'John Rawls', years: '1921–2002',
                  bio: '无知之幕；正义论；差别原则；政治自由主义' },
              ],
            },
          ],
        },
      ],
    },

    // ── 东方哲学 ──────────────────────────────────────────────────────────────
    {
      id: 'eastern',
      label: '东方哲学',
      type: 'region',
      color: '#d08770',
      children: [
        {
          id: 'ancient_east',
          label: '先秦至古印度',
          type: 'era',
          color: '#ebcb8b',
          children: [
            {
              id: 'confucianism',
              label: '儒家',
              type: 'school',
              color: '#ebcb8b',
              children: [
                { id: 'confucius',   label: '孔子',       type: 'philosopher', importance: 3,
                  nameEn: 'Confucius', years: '551–479 BC',
                  quote: '己所不欲，勿施于人',
                  bio: '仁义礼智信；礼乐文化；《论语》；儒学创始人' },
                { id: 'mencius',     label: '孟子',       type: 'philosopher', importance: 3,
                  nameEn: 'Mencius', years: '372–289 BC',
                  quote: '人之性善也，犹水之就下也',
                  bio: '性善论；仁政；民为贵，社稷次之，君为轻' },
                { id: 'xunzi',       label: '荀子',       type: 'philosopher', importance: 2,
                  nameEn: 'Xunzi', years: 'c. 310–235 BC',
                  bio: '性恶论；礼义规范；儒法融合' },
              ],
            },
            {
              id: 'taoism',
              label: '道家',
              type: 'school',
              color: '#a3be8c',
              children: [
                { id: 'laozi',       label: '老子',       type: 'philosopher', importance: 3,
                  nameEn: 'Laozi', years: 'c. 6th century BC',
                  quote: '道可道，非常道',
                  bio: '道家创始人；无为而治；《道德经》；柔弱胜刚强' },
                { id: 'zhuangzi',    label: '庄子',       type: 'philosopher', importance: 3,
                  nameEn: 'Zhuangzi', years: 'c. 369–286 BC',
                  quote: '昔者庄周梦为胡蝶，栩栩然胡蝶也',
                  bio: '相对主义；逍遥游；万物齐一；蝴蝶梦' },
              ],
            },
            {
              id: 'buddhism',
              label: '佛教哲学',
              type: 'school',
              color: '#b48ead',
              children: [
                { id: 'buddha',      label: '释迦牟尼',   type: 'philosopher', importance: 3,
                  nameEn: 'Siddhartha Gautama', years: 'c. 563–483 BC',
                  quote: '万物皆苦，苦源于欲',
                  bio: '四圣谛；八正道；涅槃；中道思想' },
                { id: 'nagarjuna',   label: '龙树',       type: 'philosopher', importance: 2,
                  nameEn: 'Nagarjuna', years: 'c. 150–250 AD',
                  bio: '中观学派；空性（Sunyata）理论；《中论》' },
              ],
            },
          ],
        },
      ],
    },

  ],
};
