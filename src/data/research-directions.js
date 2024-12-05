export const researchDirections = [
  // 计算机科学 - 人工智能
  {
    id: 'cs-ai',
    name: '人工智能',
    fieldId: 'cs',
    isHot: true,
    subDirections: [
      { id: 'cs-ai-llm', name: '大语言模型', isHot: true },
      { id: 'cs-ai-ml', name: '机器学习' },
      { id: 'cs-ai-dl', name: '深度学习' },
      { id: 'cs-ai-nlp', name: '自然语言处理' },
      { id: 'cs-ai-cv', name: '计算机视觉' },
      { id: 'cs-ai-rl', name: '强化学习' },
      { id: 'cs-ai-kg', name: '知识图谱' },
      { id: 'cs-ai-robotics', name: '机器人学习' },
    ],
  },
  // 计算机科学 - 系统与架构
  {
    id: 'cs-systems',
    name: '系统与架构',
    fieldId: 'cs',
    subDirections: [
      { id: 'cs-systems-distributed', name: '分布式系统', isHot: true },
      { id: 'cs-systems-cloud', name: '云计算' },
      { id: 'cs-systems-os', name: '操作系统' },
      { id: 'cs-systems-parallel', name: '并行计算' },
      { id: 'cs-systems-storage', name: '存储系统' },
      { id: 'cs-systems-network', name: '计算机网络' },
    ],
  },
  // 计算机科学 - 软件工程
  {
    id: 'cs-se',
    name: '软件工程',
    fieldId: 'cs',
    subDirections: [
      { id: 'cs-se-devops', name: 'DevOps', isHot: true },
      { id: 'cs-se-arch', name: '软件架构' },
      { id: 'cs-se-testing', name: '软件测试' },
      { id: 'cs-se-security', name: '软件安全' },
      { id: 'cs-se-quality', name: '质量保证' },
      { id: 'cs-se-maintenance', name: '软件维护' },
    ],
  },
  // 计算机科学 - 数据科学
  {
    id: 'cs-ds',
    name: '数据科学',
    fieldId: 'cs',
    isHot: true,
    subDirections: [
      { id: 'cs-ds-bigdata', name: '大数据处理', isHot: true },
      { id: 'cs-ds-mining', name: '数据挖掘' },
      { id: 'cs-ds-analytics', name: '数据分析' },
      { id: 'cs-ds-viz', name: '数据可视化' },
      { id: 'cs-ds-db', name: '数据库系统' },
      { id: 'cs-ds-warehousing', name: '数据仓库' },
    ],
  },
  // 计算机科学 - 信息安全
  {
    id: 'cs-security',
    name: '信息安全',
    fieldId: 'cs',
    subDirections: [
      { id: 'cs-security-crypto', name: '密码学', isHot: true },
      { id: 'cs-security-network', name: '网络安全' },
      { id: 'cs-security-system', name: '系统安全' },
      { id: 'cs-security-privacy', name: '隐私保护' },
      { id: 'cs-security-blockchain', name: '区块链' },
      { id: 'cs-security-forensics', name: '数字取证' },
    ],
  },
  // 计算机科学 - 计算机图形学
  {
    id: 'cs-graphics',
    name: '计算机图形学',
    fieldId: 'cs',
    subDirections: [
      { id: 'cs-graphics-3d', name: '3D建模与渲染' },
      { id: 'cs-graphics-animation', name: '动画技术' },
      { id: 'cs-graphics-vr', name: '虚拟现实', isHot: true },
      { id: 'cs-graphics-ar', name: '增强现实' },
      { id: 'cs-graphics-gaming', name: '游戏图形学' },
      { id: 'cs-graphics-visualization', name: '科学可视化' },
    ],
  },

  // 物理学 - 量子物理
  {
    id: 'physics-quantum',
    name: '量子物理',
    fieldId: 'physics',
    isHot: true,
    subDirections: [
      { id: 'physics-quantum-computing', name: '量子计算', isHot: true },
      { id: 'physics-quantum-communication', name: '量子通信', isHot: true },
      { id: 'physics-quantum-simulation', name: '量子模拟' },
      { id: 'physics-quantum-sensing', name: '量子传感' },
      { id: 'physics-quantum-cryptography', name: '量子密码' },
      { id: 'physics-quantum-foundations', name: '量子基础理论' },
    ],
  },
  // 物理学 - 凝聚态物理
  {
    id: 'physics-condensed',
    name: '凝聚态物理',
    fieldId: 'physics',
    subDirections: [
      { id: 'physics-condensed-superconductor', name: '超导体研究', isHot: true },
      { id: 'physics-condensed-semiconductor', name: '半导体物理' },
      { id: 'physics-condensed-magnetic', name: '磁性材料' },
      { id: 'physics-condensed-topological', name: '拓扑物态' },
      { id: 'physics-condensed-2d', name: '二维材料' },
      { id: 'physics-condensed-soft', name: '软物质物理' },
    ],
  },
  // 物理学 - 粒子物理
  {
    id: 'physics-particle',
    name: '粒子物理',
    fieldId: 'physics',
    subDirections: [
      { id: 'physics-particle-higgs', name: 'Higgs玻色子', isHot: true },
      { id: 'physics-particle-dark', name: '暗物质研究' },
      { id: 'physics-particle-neutrino', name: '中微子物理' },
      { id: 'physics-particle-accelerator', name: '加速器物理' },
      { id: 'physics-particle-detector', name: '探测器技术' },
    ],
  },
  // 物理学 - 天体物理
  {
    id: 'physics-astro',
    name: '天体物理',
    fieldId: 'physics',
    isHot: true,
    subDirections: [
      { id: 'physics-astro-blackhole', name: '黑洞研究', isHot: true },
      { id: 'physics-astro-gravitational', name: '引力波探测' },
      { id: 'physics-astro-cosmology', name: '宇宙学' },
      { id: 'physics-astro-exoplanet', name: '系外行星' },
      { id: 'physics-astro-galaxy', name: '星系演化' },
    ],
  },
  // 物理学 - 光学
  {
    id: 'physics-optics',
    name: '光学',
    fieldId: 'physics',
    subDirections: [
      { id: 'physics-optics-quantum', name: '量子光学' },
      { id: 'physics-optics-laser', name: '激光技术', isHot: true },
      { id: 'physics-optics-photonics', name: '光子学' },
      { id: 'physics-optics-nonlinear', name: '非线性光学' },
      { id: 'physics-optics-imaging', name: '光学成像' },
    ],
  },

  // 生物学 - 分子生物学
  {
    id: 'biology-molecular',
    name: '分子生物学',
    fieldId: 'biology',
    isHot: true,
    subDirections: [
      { id: 'biology-molecular-crispr', name: 'CRISPR基因编辑', isHot: true },
      { id: 'biology-molecular-rna', name: 'RNA生物学' },
      { id: 'biology-molecular-protein', name: '蛋白质组学' },
      { id: 'biology-molecular-epigenetics', name: '表观遗传学' },
      { id: 'biology-molecular-synthetic', name: '合成生物学' },
    ],
  },
  // 生物学 - 遗传学
  {
    id: 'biology-genetics',
    name: '遗传学',
    fieldId: 'biology',
    subDirections: [
      { id: 'biology-genetics-population', name: '群体遗传学' },
      { id: 'biology-genetics-medical', name: '医学遗传学', isHot: true },
      { id: 'biology-genetics-evolution', name: '进化遗传学' },
      { id: 'biology-genetics-genomics', name: '基因组学' },
      { id: 'biology-genetics-regulation', name: '基因调控' },
    ],
  },
  // 生物学 - 细胞生物学
  {
    id: 'biology-cell',
    name: '细胞生物学',
    fieldId: 'biology',
    subDirections: [
      { id: 'biology-cell-stem', name: '干细胞研究', isHot: true },
      { id: 'biology-cell-cancer', name: '肿瘤细胞学' },
      { id: 'biology-cell-aging', name: '细胞衰老' },
      { id: 'biology-cell-signaling', name: '信号转导' },
      { id: 'biology-cell-organelle', name: '细胞器研究' },
    ],
  },
  // 生物学 - 生态学
  {
    id: 'biology-ecology',
    name: '生态学',
    fieldId: 'biology',
    subDirections: [
      { id: 'biology-ecology-climate', name: '气候变化生态', isHot: true },
      { id: 'biology-ecology-conservation', name: '保护生态学' },
      { id: 'biology-ecology-marine', name: '海洋生态学' },
      { id: 'biology-ecology-microbial', name: '微生物生态' },
      { id: 'biology-ecology-biodiversity', name: '生物多样性' },
    ],
  },
  // 生物学 - 神经生物学
  {
    id: 'biology-neuro',
    name: '神经生物学',
    fieldId: 'biology',
    isHot: true,
    subDirections: [
      { id: 'biology-neuro-brain', name: '脑科学研究', isHot: true },
      { id: 'biology-neuro-cognitive', name: '认知神经科学' },
      { id: 'biology-neuro-development', name: '神经发育' },
      { id: 'biology-neuro-disease', name: '神经疾病' },
      { id: 'biology-neuro-computation', name: '计算神经科学' },
    ],
  },

  // 化学 - 有机化学
  {
    id: 'chemistry-organic',
    name: '有机化学',
    fieldId: 'chemistry',
    subDirections: [
      { id: 'chemistry-organic-synthesis', name: '有机合成', isHot: true },
      { id: 'chemistry-organic-medicinal', name: '药物化学' },
      { id: 'chemistry-organic-polymer', name: '高分子化学' },
      { id: 'chemistry-organic-natural', name: '天然产物化学' },
      { id: 'chemistry-organic-catalysis', name: '有机催化' },
    ],
  },
  // 化学 - 无机化学
  {
    id: 'chemistry-inorganic',
    name: '无机化学',
    fieldId: 'chemistry',
    subDirections: [
      { id: 'chemistry-inorganic-materials', name: '无机材料' },
      { id: 'chemistry-inorganic-coordination', name: '配位化学' },
      { id: 'chemistry-inorganic-crystal', name: '晶体化学' },
      { id: 'chemistry-inorganic-nanomaterials', name: '纳米材料', isHot: true },
      { id: 'chemistry-inorganic-bioinorganic', name: '生物无机化学' },
    ],
  },
  // 化学 - 物理化学
  {
    id: 'chemistry-physical',
    name: '物理化学',
    fieldId: 'chemistry',
    isHot: true,
    subDirections: [
      { id: 'chemistry-physical-surface', name: '表面化学' },
      { id: 'chemistry-physical-electrochemistry', name: '电化学', isHot: true },
      { id: 'chemistry-physical-spectroscopy', name: '光谱学' },
      { id: 'chemistry-physical-kinetics', name: '化学动力学' },
      { id: 'chemistry-physical-theoretical', name: '理论化学' },
    ],
  },
  // 化学 - 分析化学
  {
    id: 'chemistry-analytical',
    name: '分析化学',
    fieldId: 'chemistry',
    subDirections: [
      { id: 'chemistry-analytical-chromatography', name: '色谱分析' },
      { id: 'chemistry-analytical-spectral', name: '光谱分析' },
      { id: 'chemistry-analytical-mass', name: '质谱分析', isHot: true },
      { id: 'chemistry-analytical-sensors', name: '化学传感器' },
      { id: 'chemistry-analytical-separation', name: '分离技术' },
    ],
  },
  // 化学 - 材料化学
  {
    id: 'chemistry-materials',
    name: '材料化学',
    fieldId: 'chemistry',
    isHot: true,
    subDirections: [
      { id: 'chemistry-materials-energy', name: '能源材料', isHot: true },
      { id: 'chemistry-materials-smart', name: '智能材料' },
      { id: 'chemistry-materials-composite', name: '复合材料' },
      { id: 'chemistry-materials-biomaterials', name: '生物材料' },
      { id: 'chemistry-materials-functional', name: '功能材料' },
    ],
  },

  // 医学 - 临床医学
  {
    id: 'medicine-clinical',
    name: '临床医学',
    fieldId: 'medicine',
    isHot: true,
    subDirections: [
      { id: 'medicine-clinical-oncology', name: '肿瘤医学', isHot: true },
      { id: 'medicine-clinical-cardiology', name: '心血管医学' },
      { id: 'medicine-clinical-neurology', name: '神经医学' },
      { id: 'medicine-clinical-endocrinology', name: '内分泌学' },
      { id: 'medicine-clinical-pediatrics', name: '儿科学' },
    ],
  },
  // 医学 - 基础医学
  {
    id: 'medicine-basic',
    name: '基础医学',
    fieldId: 'medicine',
    subDirections: [
      { id: 'medicine-basic-immunology', name: '免疫学', isHot: true },
      { id: 'medicine-basic-pathology', name: '病理学' },
      { id: 'medicine-basic-physiology', name: '生理学' },
      { id: 'medicine-basic-anatomy', name: '解剖学' },
      { id: 'medicine-basic-biochemistry', name: '生物化学' },
    ],
  },
  // 医学 - 药学
  {
    id: 'medicine-pharma',
    name: '药学',
    fieldId: 'medicine',
    subDirections: [
      { id: 'medicine-pharma-discovery', name: '药物发现', isHot: true },
      { id: 'medicine-pharma-development', name: '药物开发' },
      { id: 'medicine-pharma-clinical', name: '临床药学' },
      { id: 'medicine-pharma-analysis', name: '药物分析' },
      { id: 'medicine-pharma-delivery', name: '药物递送' },
    ],
  },
  // 医学 - 公共卫生
  {
    id: 'medicine-public',
    name: '公共卫生',
    fieldId: 'medicine',
    isHot: true,
    subDirections: [
      { id: 'medicine-public-epidemiology', name: '流行病学', isHot: true },
      { id: 'medicine-public-prevention', name: '预防医学' },
      { id: 'medicine-public-environmental', name: '环境卫生' },
      { id: 'medicine-public-nutrition', name: '营养与健康' },
      { id: 'medicine-public-occupational', name: '职业卫生' },
    ],
  },
  // 医学 - 神经医学
  {
    id: 'medicine-neuro',
    name: '神经医学',
    fieldId: 'medicine',
    subDirections: [
      { id: 'medicine-neuro-disorders', name: '神经疾病', isHot: true },
      { id: 'medicine-neuro-imaging', name: '神经影像' },
      { id: 'medicine-neuro-rehabilitation', name: '神经康复' },
      { id: 'medicine-neuro-surgery', name: '神经外科' },
      { id: 'medicine-neuro-psychiatric', name: '精神医学' },
    ],
  },

  // 工程学 - 机械工程
  {
    id: 'engineering-mechanical',
    name: '机械工程',
    fieldId: 'engineering',
    subDirections: [
      { id: 'engineering-mechanical-robotics', name: '机器人工程', isHot: true },
      { id: 'engineering-mechanical-manufacturing', name: '智能制造' },
      { id: 'engineering-mechanical-design', name: '机械设计' },
      { id: 'engineering-mechanical-control', name: '控制工程' },
      { id: 'engineering-mechanical-dynamics', name: '动力工程' },
    ],
  },
  // 工程学 - 电气工程
  {
    id: 'engineering-electrical',
    name: '电气工程',
    fieldId: 'engineering',
    isHot: true,
    subDirections: [
      { id: 'engineering-electrical-power', name: '电力系统', isHot: true },
      { id: 'engineering-electrical-electronics', name: '电子工程' },
      { id: 'engineering-electrical-control', name: '自动化控制' },
      { id: 'engineering-electrical-communication', name: '通信工程' },
      { id: 'engineering-electrical-microelectronics', name: '微电子技术' },
    ],
  },
  // 工程学 - 土木工程
  {
    id: 'engineering-civil',
    name: '土木工程',
    fieldId: 'engineering',
    subDirections: [
      { id: 'engineering-civil-structure', name: '结构工程' },
      { id: 'engineering-civil-construction', name: '建筑工程', isHot: true },
      { id: 'engineering-civil-transportation', name: '交通工程' },
      { id: 'engineering-civil-geotechnical', name: '岩土工程' },
      { id: 'engineering-civil-environmental', name: '环境工程' },
    ],
  },
  // 工程学 - 化学工程
  {
    id: 'engineering-chemical',
    name: '化学工程',
    fieldId: 'engineering',
    subDirections: [
      { id: 'engineering-chemical-process', name: '过程工程' },
      { id: 'engineering-chemical-separation', name: '分离工程' },
      { id: 'engineering-chemical-reaction', name: '反应工程' },
      { id: 'engineering-chemical-biochemical', name: '生化工程', isHot: true },
      { id: 'engineering-chemical-energy', name: '能源工程' },
    ],
  },
  // 工程学 - 材料工程
  {
    id: 'engineering-materials',
    name: '材料工程',
    fieldId: 'engineering',
    isHot: true,
    subDirections: [
      { id: 'engineering-materials-advanced', name: '先进材料', isHot: true },
      { id: 'engineering-materials-nano', name: '纳米材料' },
      { id: 'engineering-materials-biomaterials', name: '生物材料' },
      { id: 'engineering-materials-electronic', name: '电子材料' },
      { id: 'engineering-materials-composite', name: '复合材料' },
    ],
  },
];

export function getDirectionsByField(fieldId) {
  return researchDirections.filter(category => category.fieldId === fieldId);
}