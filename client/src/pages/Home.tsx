/**
 * 康宁身心灵疗愈项目运营计划 - 主页面
 * 设计：自然疗愈渐变光感 × 有机自然主义 × 现代专业报告
 * 包含：调研报告、团队分工、线上运营、线下成交、风险规避、内容选题库
 */

import { useState, useEffect, useRef } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  Legend,
} from "recharts";

// ─── 数据 ────────────────────────────────────────────────────────────────────

const userGroupData = [
  { group: "职场中高层", size: 38, pain: 92, willingness: 85 },
  { group: "银发族/退休", size: 28, pain: 78, willingness: 90 },
  { group: "家庭主妇", size: 22, pain: 88, willingness: 72 },
  { group: "创业者", size: 12, pain: 95, willingness: 88 },
];

const platformData = [
  { platform: "视频号", traffic: 65, conversion: 82, trust: 90, competition: 45 },
  { platform: "抖音", traffic: 95, conversion: 55, trust: 60, competition: 90 },
  { platform: "小红书", traffic: 75, conversion: 70, trust: 75, competition: 70 },
];

const productFunnelData = [
  { stage: "线上视频课", price: "几十~几百元", users: 1000, color: "#7FB069" },
  { stage: "线下一日游", price: "几百~千元", users: 200, color: "#5A9A4A" },
  { stage: "康宁体系课", price: "几千~万元", users: 50, color: "#3D7A2E" },
  { stage: "高端定制", price: "几万~几十万", users: 10, color: "#2D5016" },
];

const riskData = [
  { risk: "政策合规", level: 85, mitigation: 78 },
  { risk: "IP祛魅", level: 72, mitigation: 85 },
  { risk: "交付体验", level: 65, mitigation: 90 },
  { risk: "团队协作", level: 55, mitigation: 88 },
  { risk: "竞品压力", level: 70, mitigation: 70 },
];

const weeklyPlanData = [
  { week: "第1-2周", focus: "账号搭建", online: "完成4个账号注册、资料填写、前3条内容发布", offline: "确定合作场地，拍摄罗卜老师基础素材" },
  { week: "第3-4周", focus: "内容起量", online: "日更短视频，测试不同痛点选题，监控数据", offline: "周末拍摄高质量素材，Vivin/周周个人IP内容" },
  { week: "第5-8周", focus: "流量积累", online: "优化高互动内容，开始直播预热，建立私域群", offline: "举办首场线下体验沙龙（一日游）" },
  { week: "第9-12周", focus: "转化提升", online: "直播带货低客单课程，私域精细化运营", offline: "推出康宁核心课程，完成首批高客单成交" },
];

const competitorData = [
  { name: "某灵修大师X", strength: "粉丝量大(200万+)", weakness: "内容同质化，形象已祛魅", threat: "中" },
  { name: "赵月（线上课）", strength: "线上变现能力强", weakness: "高客单转化困难，陷入瓶颈", threat: "中" },
  { name: "传统国学机构", strength: "线下资源丰富", weakness: "线上运营能力弱，获客成本高", threat: "低" },
  { name: "冥想/正念APP", strength: "用户基数大", weakness: "缺乏深度陪跑，留存率低", threat: "低" },
];

// ─── 30条内容选题库数据 ────────────────────────────────────────────────────────

type TopicItem = {
  id: number;
  ip: "罗卜老师" | "Vivin" | "周周";
  type: "痛点解答" | "亲历故事" | "功法演示" | "对比反差" | "神秘悬念" | "知识科普" | "生活方式";
  platform: string[];
  title: string;
  hook: string;
  framework: string[];
  cta: string;
  difficulty: "低" | "中" | "高";
};

const topicsData: TopicItem[] = [
  // ── 罗卜老师（10条）──
  {
    id: 1,
    ip: "罗卜老师",
    type: "痛点解答",
    platform: ["抖音", "视频号"],
    title: "为什么你越努力越焦虑？道家给了我一个答案",
    hook: "开场直接问：「你有没有发现，越是拼命的人，反而越睡不着？」",
    framework: [
      "① 提问引共鸣：描述职场高压人群的典型焦虑状态（30秒）",
      "② 道家视角：「强行者有志，知足者富」——用老子的话切入（30秒）",
      "③ 方法论：三个立刻能用的「放下执念」的呼吸调息法（60秒）",
      "④ 结尾升华：「心安，才是真正的成功」",
    ],
    cta: "评论区说出你最近最焦虑的一件事，我来帮你解答",
    difficulty: "低",
  },
  {
    id: 2,
    ip: "罗卜老师",
    type: "功法演示",
    platform: ["抖音", "视频号"],
    title: "40年道士每天早起必做的5分钟站桩，治好了我的失眠",
    hook: "画面：清晨山间薄雾，罗卜老师静静站桩，配文「这个动作我坚持了40年」",
    framework: [
      "① 无声开场：展示站桩画面15秒，制造视觉冲击",
      "② 功效说明：站桩如何调节神经系统、改善睡眠（20秒）",
      "③ 分步教学：手把手演示正确站桩姿势与呼吸配合（90秒）",
      "④ 结尾：「坚持21天，你的身体会告诉你答案」",
    ],
    cta: "收藏备用，明早跟着做一次",
    difficulty: "低",
  },
  {
    id: 3,
    ip: "罗卜老师",
    type: "痛点解答",
    platform: ["视频号", "抖音"],
    title: "人到中年，为什么总觉得「活着没意思」？",
    hook: "「如果你也有这种感觉，请先不要关掉这个视频」",
    framework: [
      "① 共情：描述中年危机的典型症状——空洞、疲惫、找不到意义",
      "② 道家生命观：「死生，命也，其有夜旦之常，天也」——生命的自然节律",
      "③ 实践方法：每日「观心」练习，找回内在的宁静感（具体步骤）",
      "④ 故事收尾：分享一个学员从「想消失」到「感恩活着」的真实转变",
    ],
    cta: "私信我「意义」两个字，我发你一份完整的「寻回自我」练习表",
    difficulty: "中",
  },
  {
    id: 4,
    ip: "罗卜老师",
    type: "知识科普",
    platform: ["抖音", "小红书"],
    title: "三魂七魄是迷信吗？中医经典里的真实解释",
    hook: "「很多人以为三魂七魄是封建迷信，但它其实是中国最早的心理学」",
    framework: [
      "① 破除误解：三魂七魄不是鬼神，而是古人对人体精神系统的描述",
      "② 现代对应：三魂≈意识/潜意识/超意识，七魄≈七种情绪能量",
      "③ 实际应用：当你情绪失控时，是哪个「魄」在主导？",
      "④ 引发好奇：「下期讲如何通过禅舞激活七魄，关注不迷路」",
    ],
    cta: "关注，下期继续讲",
    difficulty: "中",
  },
  {
    id: 5,
    ip: "罗卜老师",
    type: "痛点解答",
    platform: ["视频号"],
    title: "家里总是吵架、财运不顺？可能是「气场」出了问题",
    hook: "「我见过太多家庭，装修很好，但就是住着不舒服、矛盾不断」",
    framework: [
      "① 引入概念：中国传统文化中「气」对家庭环境的影响",
      "② 三个信号：家里气场不好的具体表现（争吵频繁/睡眠差/财运差）",
      "③ 调整方法：五个简单的家居气场调整方法（方位、植物、光线等）",
      "④ 升华：「外在的调整，是为了内心的安定」",
    ],
    cta: "评论区告诉我你家里最近的困扰",
    difficulty: "低",
  },
  {
    id: 6,
    ip: "罗卜老师",
    type: "功法演示",
    platform: ["抖音", "视频号"],
    title: "禅舞是什么？看完这条视频你就明白了",
    hook: "开场：一段流畅优美的禅舞画面，无配音，只有轻音乐",
    framework: [
      "① 视觉震撼：30秒完整禅舞片段，展示美感与力量",
      "② 解释禅舞：结合道家「以身入道」的理念，身体即修行",
      "③ 功效说明：改善体态、疏通经络、情绪释放的科学依据",
      "④ 邀请体验：「下周六我们在深圳有一场体验课，名额有限」",
    ],
    cta: "想体验的扣1，我来联系你",
    difficulty: "低",
  },
  {
    id: 7,
    ip: "罗卜老师",
    type: "知识科普",
    platform: ["视频号", "抖音"],
    title: "道家说的「无为」，不是躺平，而是这个意思",
    hook: "「很多人误解了老子，以为无为就是什么都不做，其实恰恰相反」",
    framework: [
      "① 纠正误解：无为≠不作为，而是「顺势而为、不强求」",
      "② 现代案例：用职场晋升、亲子关系举例说明「无为」的智慧",
      "③ 实践练习：今天就能用的「放下执念」三步法",
      "④ 金句收尾：「水善利万物而不争，处众人之所恶，故几于道」",
    ],
    cta: "关注，每天一条道家智慧",
    difficulty: "低",
  },
  {
    id: 8,
    ip: "罗卜老师",
    type: "痛点解答",
    platform: ["抖音"],
    title: "孩子叛逆、不听话？道家教你一招，比打骂管用100倍",
    hook: "「我见过太多父母，越管越叛逆，因为他们用错了方向」",
    framework: [
      "① 痛点共鸣：描述亲子冲突的典型场景",
      "② 道家视角：「曲则全，枉则直」——柔软才是真正的力量",
      "③ 具体方法：三个改善亲子关系的沟通技巧（来自道家智慧）",
      "④ 案例：一位妈妈用这个方法3个月让孩子主动回家吃饭",
    ],
    cta: "转发给需要的父母",
    difficulty: "中",
  },
  {
    id: 9,
    ip: "罗卜老师",
    type: "神秘悬念",
    platform: ["视频号"],
    title: "修行40年，我只悟透了一件事",
    hook: "「很多人问我，修行这么多年，最大的收获是什么？」",
    framework: [
      "① 铺垫：简短回顾修行历程，制造期待感（20秒）",
      "② 核心揭晓：「心安，就是最高的修行」——展开解释",
      "③ 反问观众：「你现在心安吗？」引发自我审视",
      "④ 引导行动：「如果你想找到这种心安，我们可以聊聊」",
    ],
    cta: "私信我「心安」，我们聊聊",
    difficulty: "低",
  },
  {
    id: 10,
    ip: "罗卜老师",
    type: "功法演示",
    platform: ["抖音", "视频号"],
    title: "禅茶一味：一杯茶，喝出内心的宁静",
    hook: "画面：安静的茶室，罗卜老师缓缓注水，茶香弥漫",
    framework: [
      "① 场景营造：展示禅茶仪式的完整过程（30秒）",
      "② 文化解读：茶道与道家「静」的哲学",
      "③ 实操教学：在家也能做的简易禅茶冥想（5步骤）",
      "④ 升华：「每天给自己10分钟，只是喝茶，不想任何事」",
    ],
    cta: "收藏，今晚就试试",
    difficulty: "低",
  },

  // ── Vivin（10条）──
  {
    id: 11,
    ip: "Vivin",
    type: "亲历故事",
    platform: ["小红书", "抖音"],
    title: "我是一个设计师，却在40岁时彻底崩溃了",
    hook: "「2年前，我坐在自己设计的漂亮办公室里，突然开始哭，不知道为什么」",
    framework: [
      "① 真实故事：设计师光鲜外表下的精神崩溃（情绪化叙述）",
      "② 转折点：一个偶然的机会接触到道家疗愈",
      "③ 改变过程：3个月内身心发生的具体变化",
      "④ 现在的状态：「我还是做设计，但我不再被设计定义」",
    ],
    cta: "有没有人和我一样？评论区聊聊",
    difficulty: "低",
  },
  {
    id: 12,
    ip: "Vivin",
    type: "生活方式",
    platform: ["小红书"],
    title: "设计师的家，为什么住着不舒服？我用道家美学改造了它",
    hook: "「作为室内设计师，我发现很多美丽的家，其实住着很压抑」",
    framework: [
      "① 专业视角：室内设计中常见的「反人体工学」误区",
      "② 道家美学：「少即是多」「留白」「自然材质」的空间哲学",
      "③ 改造案例：展示改造前后的对比（图文并茂）",
      "④ 金句：「真正的好设计，是让你住进去就想深呼吸」",
    ],
    cta: "关注，下期分享5个让家「呼吸」的方法",
    difficulty: "中",
  },
  {
    id: 13,
    ip: "Vivin",
    type: "对比反差",
    platform: ["抖音", "小红书"],
    title: "以前的我 vs 现在的我：一个设计师的身心蜕变",
    hook: "「左边是2年前的我，右边是现在的我，同一个人，完全不同的状态」",
    framework: [
      "① 视觉对比：照片/视频展示外貌、气质、状态的变化",
      "② 内在变化：从焦虑失眠到睡眠深沉、从情绪化到平和",
      "③ 方法揭秘：「我做了什么？」——简短提及跟随老师修行",
      "④ 悬念设置：「具体怎么做到的，下期详细说」",
    ],
    cta: "关注，下期揭秘",
    difficulty: "低",
  },
  {
    id: 14,
    ip: "Vivin",
    type: "生活方式",
    platform: ["小红书"],
    title: "我的早晨仪式：一个修行者的6:00-8:00",
    hook: "「很多人问我为什么皮肤越来越好、气质越来越稳，其实秘密在早晨」",
    framework: [
      "① 时间轴展示：6:00起床→站桩→禅茶→冥想→早餐的完整流程",
      "② 每个环节的意义：不是打卡，而是真正的身心滋养",
      "③ 实操建议：不需要全部做，从一个5分钟习惯开始",
      "④ 美学呈现：高质量图文，展示仪式感的视觉美感",
    ],
    cta: "收藏，明天试试其中一个",
    difficulty: "低",
  },
  {
    id: 15,
    ip: "Vivin",
    type: "神秘悬念",
    platform: ["小红书", "抖音"],
    title: "我的老师说了一句话，让我当场哭了",
    hook: "「那天我去找老师，说我很累，想放弃。他只说了一句话……」",
    framework: [
      "① 场景描述：疲惫状态下去见老师的情境",
      "② 老师的话：一句道家智慧（不直接说，先停顿制造悬念）",
      "③ 揭晓与解读：这句话为什么让我当场落泪",
      "④ 引发共鸣：「你有没有一句话，改变了你的人生？」",
    ],
    cta: "评论区分享你的那句话",
    difficulty: "低",
  },
  {
    id: 16,
    ip: "Vivin",
    type: "知识科普",
    platform: ["小红书"],
    title: "什么是「身心灵」？一个设计师的理性解读",
    hook: "「我知道很多人一听「身心灵」就觉得是玄学，我以前也这样」",
    framework: [
      "① 理性切入：从设计师的逻辑思维角度解读身心灵",
      "② 科学依据：神经科学、心理学对冥想/正念的研究数据",
      "③ 中国传统文化版本：道家、中医对「身心合一」的理解",
      "④ 结论：「它不是玄学，是被现代人遗忘的生命科学」",
    ],
    cta: "关注，下期讲具体怎么入门",
    difficulty: "中",
  },
  {
    id: 17,
    ip: "Vivin",
    type: "亲历故事",
    platform: ["抖音"],
    title: "我把10年的设计经验，全部用在了「设计自己的人生」上",
    hook: "「设计了无数个家，却发现自己的内心是一片废墟」",
    framework: [
      "① 职业反思：10年设计生涯的成就与空洞",
      "② 转变契机：开始把「设计思维」用于自我重塑",
      "③ 方法论：用设计流程（调研→方案→执行→迭代）规划人生",
      "④ 现状：「现在我在设计一个全新的自己」",
    ],
    cta: "你有没有想过「重新设计」自己的人生？",
    difficulty: "中",
  },
  {
    id: 18,
    ip: "Vivin",
    type: "生活方式",
    platform: ["小红书"],
    title: "修行不是出家，是把日子过得更美",
    hook: "「很多人以为修行就是吃素、念经、不近人情，其实恰恰相反」",
    framework: [
      "① 打破误解：修行者的真实生活状态（美食/旅行/朋友）",
      "② 核心理念：修行是「活得更清醒、更有感知力」",
      "③ 具体体现：修行后对美的感知力、对关系的处理方式",
      "④ 邀请：「想体验这种生活状态，来我们的一日游」",
    ],
    cta: "下周六一日游，还有3个名额",
    difficulty: "低",
  },
  {
    id: 19,
    ip: "Vivin",
    type: "对比反差",
    platform: ["小红书", "抖音"],
    title: "月薪5万的设计师，为什么比月薪5千的人更焦虑？",
    hook: "「我见过太多高收入的人，焦虑程度远超普通人，包括曾经的我」",
    framework: [
      "① 数据/现象：高收入群体的焦虑悖论",
      "② 根本原因：「向外求」的生命模式",
      "③ 道家解法：「知足者富」——重新定义「富有」",
      "④ 个人转变：我是如何从「向外求」转向「向内看」的",
    ],
    cta: "你觉得自己是「向外求」还是「向内看」的人？",
    difficulty: "中",
  },
  {
    id: 20,
    ip: "Vivin",
    type: "亲历故事",
    platform: ["小红书"],
    title: "第一次参加禅茶仪式，我哭了整整20分钟",
    hook: "「我不是一个爱哭的人，但那天，眼泪根本停不下来」",
    framework: [
      "① 场景描述：第一次参加禅茶仪式的完整体验",
      "② 情绪释放：为什么一杯茶会让人落泪",
      "③ 老师的解读：眼泪是身体在「排毒」",
      "④ 事后感受：「那是我近年来睡得最好的一晚」",
    ],
    cta: "想体验的私信我「禅茶」",
    difficulty: "低",
  },

  // ── 周周（10条）──
  {
    id: 21,
    ip: "周周",
    type: "亲历故事",
    platform: ["抖音", "视频号"],
    title: "我是一个豪爽的东北女孩，却在南方学会了「慢下来」",
    hook: "「我以前做事风风火火，从不觉得自己需要什么疗愈，直到那次……」",
    framework: [
      "① 性格介绍：豪爽、直接、不信玄学的真实性格",
      "② 转折：一次意外的情绪崩溃，让她开始寻找答案",
      "③ 接触疗愈：第一次跟着老师打坐，从「坐不住」到「舍不得起来」",
      "④ 现在：「我还是豪爽，但多了一份沉稳」",
    ],
    cta: "和我一样不信玄学的，来评论区报个到",
    difficulty: "低",
  },
  {
    id: 22,
    ip: "周周",
    type: "对比反差",
    platform: ["抖音"],
    title: "镜头后面的我，和镜头前面的我，完全不一样",
    hook: "「做了几年拍摄，我发现最难拍的，是真实的自己」",
    framework: [
      "① 职业反思：拍摄者视角——记录别人的美好，忽略自己的感受",
      "② 内在空洞：长期「在场」却「不在场」的疏离感",
      "③ 转变：开始修行后，第一次真正「看见」自己",
      "④ 金句：「最好的镜头，是向内看的那一个」",
    ],
    cta: "你有没有觉得自己「活在镜头后面」？",
    difficulty: "中",
  },
  {
    id: 23,
    ip: "周周",
    type: "生活方式",
    platform: ["抖音", "视频号"],
    title: "一个女生独自去深山，寻找内心的答案",
    hook: "「我一个人背着包，去了一个没有信号的地方待了3天」",
    framework: [
      "① 出发背景：为什么选择独自去深山（不是逃避，是寻找）",
      "② 过程记录：vlog风格，展示山中的真实生活",
      "③ 内心变化：离开手机和喧嚣后，第一次听到自己内心的声音",
      "④ 回来后：「我带走了焦虑，带回来了平静」",
    ],
    cta: "你有没有想过给自己一次「断联」的旅行？",
    difficulty: "中",
  },
  {
    id: 24,
    ip: "周周",
    type: "神秘悬念",
    platform: ["抖音"],
    title: "我见过很多老师，但只有她，让我第一次感到「被看见」",
    hook: "「我不是一个容易被感动的人，但那天，我愣了很久」",
    framework: [
      "① 铺垫：描述见过各种「老师」的经历，都没有触动",
      "② 第一次见罗卜老师：她说了什么（不直接说，制造悬念）",
      "③ 揭晓：那句话为什么让周周感到「被看见」",
      "④ 结尾：「有些人，见一面就够了」",
    ],
    cta: "关注，下期带你们见见这位老师",
    difficulty: "低",
  },
  {
    id: 25,
    ip: "周周",
    type: "亲历故事",
    platform: ["小红书", "抖音"],
    title: "我用镜头记录了老师的一次疗愈课，看完我沉默了",
    hook: "「我以为我只是来拍素材的，没想到自己成了第一个被疗愈的人」",
    framework: [
      "① 拍摄者视角：本来只是来工作，不是来「被治」的",
      "② 课程过程：用镜头语言描述疗愈课的氛围和细节",
      "③ 意外触动：拍着拍着，自己开始哭了",
      "④ 反思：「有些东西，不是用眼睛看的，是用身体感受的」",
    ],
    cta: "想感受这种疗愈的，私信我",
    difficulty: "低",
  },
  {
    id: 26,
    ip: "周周",
    type: "生活方式",
    platform: ["抖音"],
    title: "义气这件事，道家怎么说？",
    hook: "「我是一个很讲义气的人，但我发现，真正的义气不是「两肋插刀」」",
    framework: [
      "① 个人性格：讲义气、重情义的真实性格特点",
      "② 道家解读：「信言不美，美言不信」——真正的情义是什么",
      "③ 生活案例：一个关于友情的真实故事",
      "④ 升华：「帮人帮到心里，才是真义气」",
    ],
    cta: "你觉得什么是真正的义气？",
    difficulty: "中",
  },
  {
    id: 27,
    ip: "周周",
    type: "对比反差",
    platform: ["抖音", "视频号"],
    title: "修行前后，我拍的视频有什么不同？",
    hook: "「同一个地方，同一台相机，修行前后拍出来的感觉完全不一样」",
    framework: [
      "① 视觉对比：展示修行前后拍摄的同类素材对比",
      "② 技术分析：不是技术变了，是「眼睛」变了",
      "③ 内在解读：修行让人的感知力更细腻，捕捉到更多美",
      "④ 金句：「好的镜头，来自好的内心」",
    ],
    cta: "关注，下期分享我的拍摄心法",
    difficulty: "中",
  },
  {
    id: 28,
    ip: "周周",
    type: "亲历故事",
    platform: ["小红书"],
    title: "第一次参加线下一日游，我以为会很无聊",
    hook: "「说实话，我去之前觉得这种活动肯定很「装」，结果……」",
    framework: [
      "① 出发前的心态：半信半疑，觉得可能是走过场",
      "② 过程记录：一日游的真实体验（不美化，真实描述）",
      "③ 意外收获：某个环节让她完全改变了看法",
      "④ 结尾：「我不想剧透，你自己来感受」",
    ],
    cta: "下次一日游还有名额，私信我「一日游」",
    difficulty: "低",
  },
  {
    id: 29,
    ip: "周周",
    type: "神秘悬念",
    platform: ["抖音"],
    title: "我拍了100多个老师，只有一个让我心甘情愿「打工」",
    hook: "「做拍摄这几年，我见过太多「老师」，大部分都是表演」",
    framework: [
      "① 职业经历：拍摄过各种课程/讲师的真实感受",
      "② 对比：大多数「老师」的表演感 vs 罗卜老师的真实感",
      "③ 具体细节：一个让周周印象深刻的真实细节",
      "④ 结尾：「真正的高人，不需要表演」",
    ],
    cta: "想认识这位老师，关注我",
    difficulty: "低",
  },
  {
    id: 30,
    ip: "周周",
    type: "生活方式",
    platform: ["视频号", "抖音"],
    title: "一个沉稳的女生，如何在快节奏的世界里「不被带跑」",
    hook: "「我不是天生沉稳，是被生活磨出来的，后来又被修行「稳住」了」",
    framework: [
      "① 性格成长：从冲动到沉稳的真实经历",
      "② 修行加持：道家「守静」的功夫如何帮助保持内心稳定",
      "③ 实用方法：3个在快节奏生活中「不被带跑」的具体做法",
      "④ 结尾：「稳，不是冷漠，是有根」",
    ],
    cta: "你是一个容易被情绪带跑的人吗？",
    difficulty: "低",
  },
];

// ─── 工具组件 ─────────────────────────────────────────────────────────────────

function SectionTitle({ icon, title, subtitle }: { icon: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{icon}</span>
        <h2 className="text-2xl font-bold text-[#2D5016]" style={{ fontFamily: "'Noto Serif SC', serif" }}>
          {title}
        </h2>
      </div>
      {subtitle && <p className="text-sm text-[#6B7A5E] ml-10 leading-relaxed">{subtitle}</p>}
      <div className="ml-10 mt-3 h-0.5 bg-gradient-to-r from-[#2D5016]/40 via-[#7FB069]/40 to-transparent" />
    </div>
  );
}

function StatCard({ value, label, sub, color = "#2D5016" }: { value: string; label: string; sub?: string; color?: string }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E8EDE2] card-hover">
      <div className="text-3xl font-bold font-mono-data" style={{ color, fontFamily: "'DM Mono', monospace" }}>{value}</div>
      <div className="text-sm font-semibold text-[#3D5A2E] mt-1">{label}</div>
      {sub && <div className="text-xs text-[#8A9A7E] mt-1">{sub}</div>}
    </div>
  );
}

function TagBadge({ text, color = "green" }: { text: string; color?: "green" | "amber" | "red" | "blue" | "teal" }) {
  const styles = {
    green: "bg-[#E8F5E0] text-[#2D5016] border-[#B8D9A0]",
    amber: "bg-[#FFF3D6] text-[#7A5200] border-[#E8C87A]",
    red: "bg-[#FDE8E8] text-[#8B1A1A] border-[#F0B0B0]",
    blue: "bg-[#E8F0FA] text-[#1A3A6B] border-[#A0B8E0]",
    teal: "bg-[#E0F5F5] text-[#0D5050] border-[#90D0D0]",
  };
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[color]}`}>
      {text}
    </span>
  );
}

// ─── 选题卡片组件 ──────────────────────────────────────────────────────────────

function TopicCard({ topic }: { topic: TopicItem }) {
  const [expanded, setExpanded] = useState(false);

  const ipColors: Record<string, { bg: string; text: string; badge: string }> = {
    "罗卜老师": { bg: "from-[#2D5016] to-[#3D7A2E]", text: "text-[#2D5016]", badge: "bg-[#E8F5E0] text-[#2D5016] border-[#B8D9A0]" },
    "Vivin": { bg: "from-[#8B6914] to-[#C0A060]", text: "text-[#8B6914]", badge: "bg-[#FFF3D6] text-[#7A5200] border-[#E8C87A]" },
    "周周": { bg: "from-[#1A5A6B] to-[#2A7A8B]", text: "text-[#1A5A6B]", badge: "bg-[#E0F5F5] text-[#0D5050] border-[#90D0D0]" },
  };

  const typeColors: Record<string, string> = {
    "痛点解答": "bg-[#FDE8E8] text-[#8B1A1A]",
    "亲历故事": "bg-[#FFF3D6] text-[#7A5200]",
    "功法演示": "bg-[#E8F5E0] text-[#2D5016]",
    "对比反差": "bg-[#E8F0FA] text-[#1A3A6B]",
    "神秘悬念": "bg-[#F0E8FA] text-[#4A1A6B]",
    "知识科普": "bg-[#E0F5F5] text-[#0D5050]",
    "生活方式": "bg-[#F5F0E8] text-[#5A4A1A]",
  };

  const difficultyColor = { "低": "text-[#2D5016]", "中": "text-[#8B6914]", "高": "text-[#8B1A1A]" };
  const c = ipColors[topic.ip];

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E8EDE2] card-hover">
      {/* 顶部色条 */}
      <div className={`h-1 bg-gradient-to-r ${c.bg}`} />
      <div className="p-4">
        {/* 标签行 */}
        <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${c.badge}`}>{topic.ip}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[topic.type]}`}>{topic.type}</span>
          {topic.platform.map(p => (
            <span key={p} className="text-xs px-2 py-0.5 rounded-full bg-[#F7F4EE] text-[#6B7A5E] border border-[#E8EDE2]">{p}</span>
          ))}
          <span className="ml-auto text-xs text-[#8A9A7E]">难度：<span className={`font-semibold ${difficultyColor[topic.difficulty]}`}>{topic.difficulty}</span></span>
        </div>

        {/* 标题 */}
        <div className="text-sm font-bold text-[#2D5016] mb-2 leading-snug" style={{ fontFamily: "'Noto Serif SC', serif" }}>
          #{topic.id} {topic.title}
        </div>

        {/* 钩子 */}
        <div className="text-xs text-[#6B7A5E] italic mb-3 p-2 bg-[#F7F4EE] rounded-lg border-l-2 border-[#C0A060]">
          🎣 {topic.hook}
        </div>

        {/* 展开/收起 */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between text-xs font-semibold text-[#2D5016] hover:text-[#5A9A4A] transition-colors"
        >
          <span>{expanded ? "收起内容框架" : "查看完整内容框架"}</span>
          <span className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}>▼</span>
        </button>

        {expanded && (
          <div className="mt-3 space-y-2">
            {/* 框架步骤 */}
            <div className="space-y-1.5">
              {topic.framework.map((step, i) => (
                <div key={i} className="flex gap-2 text-xs text-[#6B7A5E]">
                  <span className="text-[#7FB069] flex-shrink-0 mt-0.5">▸</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
            {/* CTA */}
            <div className="mt-2 p-2 bg-[#FFF3D6] rounded-lg border border-[#E8C87A]">
              <span className="text-xs font-semibold text-[#7A5200]">📢 引导行动：</span>
              <span className="text-xs text-[#7A5200] ml-1">{topic.cta}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── 导航 ─────────────────────────────────────────────────────────────────────

const navItems = [
  { id: "overview", label: "概览", icon: "☯" },
  { id: "research", label: "调研报告", icon: "🔍" },
  { id: "team", label: "团队分工", icon: "👥" },
  { id: "online", label: "线上运营", icon: "📱" },
  { id: "offline", label: "线下成交", icon: "🍵" },
  { id: "risk", label: "风险规避", icon: "🛡" },
  { id: "topics", label: "选题库", icon: "✍" },
];

// ─── 主组件 ───────────────────────────────────────────────────────────────────

export default function Home() {
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // 选题库筛选状态
  const [filterIP, setFilterIP] = useState<string>("全部");
  const [filterType, setFilterType] = useState<string>("全部");
  const [filterPlatform, setFilterPlatform] = useState<string>("全部");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // 筛选逻辑
  const filteredTopics = topicsData.filter((t) => {
    const matchIP = filterIP === "全部" || t.ip === filterIP;
    const matchType = filterType === "全部" || t.type === filterType;
    const matchPlatform = filterPlatform === "全部" || t.platform.includes(filterPlatform);
    const matchSearch = searchText === "" || t.title.includes(searchText) || t.hook.includes(searchText);
    return matchIP && matchType && matchPlatform && matchSearch;
  });

  const ipStats = {
    "罗卜老师": topicsData.filter(t => t.ip === "罗卜老师").length,
    "Vivin": topicsData.filter(t => t.ip === "Vivin").length,
    "周周": topicsData.filter(t => t.ip === "周周").length,
  };

  return (
    <div className="min-h-screen bg-[#F7F4EE] flex">
      {/* ── 侧边导航 ── */}
      <aside
        className={`fixed left-0 top-0 h-full z-40 transition-all duration-300 ${sidebarOpen ? "w-56" : "w-16"}`}
        style={{ background: "linear-gradient(180deg, #1E3A12 0%, #2D5016 60%, #3D6B20 100%)" }}
      >
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#7FB069]/30 flex items-center justify-center text-lg flex-shrink-0">☯</div>
            {sidebarOpen && (
              <div>
                <div className="text-white font-bold text-sm leading-tight" style={{ fontFamily: "'Noto Serif SC', serif" }}>康宁</div>
                <div className="text-[#A8C898] text-xs">运营计划书</div>
              </div>
            )}
          </div>
        </div>
        <nav className="p-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 ${
                activeSection === item.id ? "bg-[#7FB069]/30 text-white" : "text-[#A8C898] hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="text-base flex-shrink-0">{item.icon}</span>
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute bottom-6 left-0 right-0 mx-auto w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 transition-colors"
        >
          {sidebarOpen ? "◀" : "▶"}
        </button>
      </aside>

      {/* ── 主内容区 ── */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-56" : "ml-16"}`}>

        {/* ── 英雄区 ── */}
        <section id="overview" ref={(el) => { sectionRefs.current["overview"] = el; }} className="relative min-h-[420px] flex items-end overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663597658587/HZvWvQi64RGk5hPWYMweaD/hero-bg-XmvV4vnQmfJhSbtMyHmnVk.webp)` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A12]/80 via-[#2D5016]/30 to-transparent" />
          <div className="relative z-10 p-10 pb-12 max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <TagBadge text="2025年度内部战略文件" color="amber" />
              <TagBadge text="保密级别：核心团队" color="red" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-3 leading-tight" style={{ fontFamily: "'Noto Serif SC', serif" }}>
              康宁身心灵疗愈<br />运营流程计划书
            </h1>
            <p className="text-[#C8E0B8] text-base leading-relaxed max-w-xl">
              基于04-25内部会议录音，结合身心灵疗愈、中国传统文化知识付费+陪跑赛道，为4人团队制定的全链路运营策略。
            </p>
            <div className="flex gap-6 mt-6">
              {[
                { v: "4", l: "核心成员" }, { v: "6", l: "运营模块" },
                { v: "4", l: "产品阶梯" }, { v: "30", l: "精选选题" },
              ].map(({ v, l }) => (
                <div key={l} className="text-center">
                  <div className="text-2xl font-bold text-[#A8D888]" style={{ fontFamily: "'DM Mono', monospace" }}>{v}</div>
                  <div className="text-xs text-[#C8E0B8]">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="p-8 space-y-16 max-w-5xl">

          {/* ══ 一、调研报告 ══ */}
          <section id="research" ref={(el) => { sectionRefs.current["research"] = el; }}>
            <SectionTitle icon="🔍" title="市场调研报告" subtitle="基于会议讨论与市场研究，对目标人群、痛点需求、竞品格局及平台规则进行系统梳理" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard value="$104.7M" label="中国灵性健康APP市场" sub="2024年收入（GrandView）" color="#2D5016" />
              <StatCard value="9.9%" label="健康旅游年复合增长率" sub="预计至2031年" color="#5A9A4A" />
              <StatCard value="40岁↑" label="核心目标人群年龄段" sub="中年焦虑高发群体" color="#8B6914" />
              <StatCard value="3大" label="主要平台运营阵地" sub="视频号 / 抖音 / 小红书" color="#2D5016" />
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8EDE2] mb-6">
              <h3 className="text-lg font-bold text-[#2D5016] mb-4" style={{ fontFamily: "'Noto Serif SC', serif" }}>目标人群画像与痛点分析</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={userGroupData} layout="vertical" margin={{ left: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E8EDE2" />
                      <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "#6B7A5E" }} />
                      <YAxis dataKey="group" type="category" tick={{ fontSize: 11, fill: "#3D5A2E" }} width={80} />
                      <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E8EDE2", fontSize: 12 }} formatter={(value, name) => [`${value}`, name === "pain" ? "痛点强度" : "付费意愿"]} />
                      <Bar dataKey="pain" name="痛点强度" fill="#5A9A4A" radius={[0, 4, 4, 0]} />
                      <Bar dataKey="willingness" name="付费意愿" fill="#8B6914" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                  <p className="text-xs text-[#8A9A7E] text-center mt-1">各人群痛点强度与付费意愿对比（满分100）</p>
                </div>
                <div className="space-y-3">
                  {[
                    { group: "职场中高层 / 高净值人群", age: "30-50岁", pain: "精神内耗、深度焦虑、身体亚健康", need: "高维精神指引、能量补给、决策智慧", badge: "amber" as const },
                    { group: "银发族 / 退休人群", age: "50岁以上", pain: "退休后空虚、身体衰退、对生命意义的探索", need: "精神寄托、延年益寿、生命终极意义", badge: "green" as const },
                    { group: "家庭主妇 / 全职妈妈", age: "28-45岁", pain: "自我价值缺失、情绪积压、家庭关系困境", need: "情感疗愈、自我重塑、关系处理智慧", badge: "blue" as const },
                  ].map((item) => (
                    <div key={item.group} className="p-3 rounded-xl bg-[#F7F4EE] border border-[#E8EDE2]">
                      <div className="flex items-center gap-2 mb-1.5">
                        <TagBadge text={item.age} color={item.badge} />
                        <span className="text-sm font-semibold text-[#2D5016]">{item.group}</span>
                      </div>
                      <div className="text-xs text-[#6B7A5E] mb-1"><span className="font-medium text-[#8B1A1A]">核心痛点：</span>{item.pain}</div>
                      <div className="text-xs text-[#6B7A5E]"><span className="font-medium text-[#2D5016]">核心需求：</span>{item.need}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8EDE2] mb-6">
              <h3 className="text-lg font-bold text-[#2D5016] mb-4" style={{ fontFamily: "'Noto Serif SC', serif" }}>竞品格局分析</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#E8EDE2]">
                      {["竞品类型", "核心优势", "明显短板", "威胁等级"].map(h => (
                        <th key={h} className="text-left py-2 px-3 text-[#2D5016] font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {competitorData.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-[#F7F4EE]" : "bg-white"}>
                        <td className="py-2.5 px-3 font-medium text-[#3D5A2E]">{row.name}</td>
                        <td className="py-2.5 px-3 text-[#6B7A5E]">{row.strength}</td>
                        <td className="py-2.5 px-3 text-[#6B7A5E]">{row.weakness}</td>
                        <td className="py-2.5 px-3"><TagBadge text={row.threat} color={row.threat === "高" ? "red" : row.threat === "中" ? "amber" : "green"} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-3 bg-[#E8F5E0] rounded-xl border border-[#B8D9A0]">
                <p className="text-xs text-[#2D5016] leading-relaxed"><span className="font-bold">康宁的差异化优势：</span>罗卜老师40年道教真实传承 + 系统功理功法（九灵神、三魂七魄、禅舞、禅茶）+ 线上线下长周期陪跑服务，构建了竞品难以复制的护城河。</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8EDE2]">
              <h3 className="text-lg font-bold text-[#2D5016] mb-4" style={{ fontFamily: "'Noto Serif SC', serif" }}>三大平台运营规则与流量逻辑</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={240}>
                  <RadarChart data={platformData}>
                    <PolarGrid stroke="#E8EDE2" />
                    <PolarAngleAxis dataKey="platform" tick={{ fontSize: 12, fill: "#3D5A2E" }} />
                    <Radar name="流量规模" dataKey="traffic" stroke="#5A9A4A" fill="#5A9A4A" fillOpacity={0.2} />
                    <Radar name="转化潜力" dataKey="conversion" stroke="#8B6914" fill="#8B6914" fillOpacity={0.2} />
                    <Radar name="信任度" dataKey="trust" stroke="#2D5016" fill="#2D5016" fillOpacity={0.2} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ borderRadius: "12px", fontSize: 12 }} />
                  </RadarChart>
                </ResponsiveContainer>
                <div className="space-y-3">
                  {[
                    { platform: "微信视频号", icon: "💬", strategy: "依托熟人社交生态，适合私域沉淀。与公众号+微信群形成闭环，高客单价转化首选阵地。", tip: "重点：公域引流→私域沉淀→线下转化" },
                    { platform: "抖音", icon: "🎵", strategy: "公域流量池大，算法精准。罗卜老师现有6万粉丝（偏老），需内容转型：从禅舞展示→痛点解决方案。", tip: "重点：泛流量获取→精准筛选→私域导流" },
                    { platform: "小红书", icon: "📕", strategy: "年轻女性用户为主，注重审美与情绪价值。Vivin（前室内设计师）打造个人IP的最佳平台。", tip: "重点：种草内容→情感共鸣→精准引流" },
                  ].map((item) => (
                    <div key={item.platform} className="p-3 rounded-xl bg-[#F7F4EE] border border-[#E8EDE2]">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span>{item.icon}</span>
                        <span className="font-semibold text-[#2D5016] text-sm">{item.platform}</span>
                      </div>
                      <p className="text-xs text-[#6B7A5E] mb-1">{item.strategy}</p>
                      <p className="text-xs font-medium text-[#8B6914]">{item.tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ══ 二、团队分工 ══ */}
          <section id="team" ref={(el) => { sectionRefs.current["team"] = el; }}>
            <SectionTitle icon="👥" title="4人团队分工与时间规划" subtitle="结合海云和周周仅周末能线下参与的实际情况，制定精细化的线上线下协同方案" />
            <div className="grid md:grid-cols-2 gap-5 mb-8">
              {[
                {
                  name: "罗卜老师", role: "课程主研发者 · 主讲者 · 核心IP", avatar: "🧘",
                  bg: "from-[#2D5016] to-[#3D7A2E]", type: "全职", typeColor: "green" as const,
                  duties: ["核心课程（康宁、五福、禅茶等）研发与主讲", "每日早6:00或晚10:00线上直播", "线下高客单价服务深度交付（开光、疗愈）", "短视频口播内容录制（痛点解答类）"],
                  highlight: "背后的「大佬」，保持神秘感，专注高价值交付",
                },
                {
                  name: "Vivin", role: "商业策划人 · 经纪人 · 引流IP", avatar: "✨",
                  bg: "from-[#8B6914] to-[#C0A060]", type: "全职", typeColor: "amber" as const,
                  duties: ["课程PPT视觉设计与制作", "对外合作洽谈、线下场地对接", "打造个人IP（设计师→修行者的转变故事）", "小红书/抖音账号日常内容运营"],
                  highlight: "从侧面烘托罗卜老师，吸引都市职场女性群体",
                },
                {
                  name: "周周", role: "拍摄/剪辑执行者 · 矩阵IP", avatar: "🎬",
                  bg: "from-[#1A5A6B] to-[#2A7A8B]", type: "兼职", typeColor: "blue" as const,
                  duties: ["线上短视频专业拍摄与后期剪辑", "协助线下沙龙、体验营现场执行", "打造女性独立视角的个人矩阵账号", "与Vivin形成闺蜜CP效应，增强内容真实性"],
                  highlight: "周末线下拍摄执行，工作日线上剪辑后期",
                },
                {
                  name: "海云", role: "操盘手 · 数据监控 · 内容策划", avatar: "📊",
                  bg: "from-[#4A2D6B] to-[#6A4D8B]", type: "兼职", typeColor: "blue" as const,
                  duties: ["线上短视频选题策划与用户痛点挖掘", "全平台运营数据监控与优化", "投流策略制定与转化路径优化", "统筹线上线下整体成交闭环设计"],
                  highlight: "周末线下复盘，工作日线上数据监控与策划指导",
                },
              ].map((member) => (
                <div key={member.name} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E8EDE2] card-hover">
                  <div className={`bg-gradient-to-r ${member.bg} p-4 flex items-center gap-3`}>
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">{member.avatar}</div>
                    <div>
                      <div className="text-white font-bold text-lg" style={{ fontFamily: "'Noto Serif SC', serif" }}>{member.name}</div>
                      <div className="text-white/80 text-xs">{member.role}</div>
                    </div>
                    <div className="ml-auto"><TagBadge text={member.type} color={member.typeColor} /></div>
                  </div>
                  <div className="p-4">
                    <ul className="space-y-1.5 mb-3">
                      {member.duties.map((duty, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-[#6B7A5E]">
                          <span className="text-[#7FB069] mt-0.5 flex-shrink-0">▸</span>{duty}
                        </li>
                      ))}
                    </ul>
                    <div className="p-2.5 bg-[#F7F4EE] rounded-lg border-l-2 border-[#7FB069]">
                      <p className="text-xs text-[#3D5A2E] font-medium">{member.highlight}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8EDE2]">
              <h3 className="text-lg font-bold text-[#2D5016] mb-4" style={{ fontFamily: "'Noto Serif SC', serif" }}>12周启动时间规划</h3>
              <div className="space-y-3">
                {weeklyPlanData.map((item, i) => (
                  <div key={i} className="flex gap-4 p-3 rounded-xl bg-[#F7F4EE] border border-[#E8EDE2]">
                    <div className="flex-shrink-0 w-20">
                      <div className="text-sm font-bold text-[#2D5016]" style={{ fontFamily: "'Noto Serif SC', serif" }}>{item.week}</div>
                      <TagBadge text={item.focus} color="green" />
                    </div>
                    <div className="flex-1 grid md:grid-cols-2 gap-3">
                      <div><div className="text-xs font-semibold text-[#5A9A4A] mb-1">📱 线上任务</div><p className="text-xs text-[#6B7A5E]">{item.online}</p></div>
                      <div><div className="text-xs font-semibold text-[#8B6914] mb-1">🏡 线下任务（周末）</div><p className="text-xs text-[#6B7A5E]">{item.offline}</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ══ 三、线上运营 ══ */}
          <section id="online" ref={(el) => { sectionRefs.current["online"] = el; }}>
            <SectionTitle icon="📱" title="线上运营计划" subtitle="采用「众星捧月」IP矩阵策略，通过Vivin与周周从侧面烘托罗卜老师，实现流量积累与高价值转化" />
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8EDE2] mb-6">
              <h3 className="text-lg font-bold text-[#2D5016] mb-5" style={{ fontFamily: "'Noto Serif SC', serif" }}>「众星捧月」IP矩阵架构</h3>
              <div className="relative">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#2D5016] to-[#5A9A4A] flex flex-col items-center justify-center shadow-lg">
                      <span className="text-3xl">🧘</span>
                      <span className="text-white text-xs font-bold mt-1" style={{ fontFamily: "'Noto Serif SC', serif" }}>罗卜老师</span>
                      <span className="text-white/70 text-xs">核心IP</span>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-[#7FB069]/20 scale-125 -z-10" />
                    <div className="absolute inset-0 rounded-full bg-[#7FB069]/10 scale-150 -z-20" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-5">
                  {[
                    { name: "Vivin", icon: "✨", angle: "设计师→修行者", content: "职场焦虑、审美生活、传统文化初探", platform: "小红书 + 抖音", color: "from-[#8B6914] to-[#C0A060]" },
                    { name: "周周", icon: "🎬", angle: "豪爽女生的修行之旅", content: "独立女性、情感疗愈、真实蜕变记录", platform: "抖音 + 视频号", color: "from-[#1A5A6B] to-[#2A7A8B]" },
                  ].map((ip) => (
                    <div key={ip.name} className={`bg-gradient-to-br ${ip.color} rounded-2xl p-4 text-white`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">{ip.icon}</span>
                        <span className="font-bold" style={{ fontFamily: "'Noto Serif SC', serif" }}>{ip.name}</span>
                        <span className="ml-auto text-xs bg-white/20 px-2 py-0.5 rounded-full">引流IP</span>
                      </div>
                      <div className="text-xs opacity-90 mb-1"><span className="font-semibold">内容角度：</span>{ip.angle}</div>
                      <div className="text-xs opacity-80 mb-1"><span className="font-semibold">内容方向：</span>{ip.content}</div>
                      <div className="text-xs opacity-80"><span className="font-semibold">主攻平台：</span>{ip.platform}</div>
                    </div>
                  ))}
                </div>
                <div className="grid md:grid-cols-3 gap-3">
                  {[
                    { phase: "第一阶段（1-8周）", desc: "Vivin与周周独立运营各自账号，积累垂直粉丝。内容中巧妙提及「背后高人」，制造神秘感。", icon: "🌱" },
                    { phase: "第二阶段（8-12周）", desc: "两人合体互动，用户发现「原来她们是一起的」，真实感爆发，信任度大幅提升。", icon: "🌿" },
                    { phase: "长期策略", desc: "罗卜老师逐步退居幕后，专注高客单价线下交付，保持神秘感与稀缺性。", icon: "🌳" },
                  ].map((item) => (
                    <div key={item.phase} className="p-3 bg-[#F7F4EE] rounded-xl border border-[#E8EDE2]">
                      <div className="flex items-center gap-2 mb-1.5"><span>{item.icon}</span><span className="text-xs font-bold text-[#2D5016]">{item.phase}</span></div>
                      <p className="text-xs text-[#6B7A5E]">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8EDE2]">
              <h3 className="text-lg font-bold text-[#2D5016] mb-4" style={{ fontFamily: "'Noto Serif SC', serif" }}>内容策略：从正、侧面反衬罗卜老师</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-semibold text-[#2D5016] mb-3">✅ 正面展示（罗卜老师直接出镜）</div>
                  <div className="space-y-2">
                    {[
                      { type: "痛点解答类", desc: "Vivin/海云提问，罗卜老师用道学解答现代人的焦虑" },
                      { type: "功法演示类", desc: "展示禅舞、站桩、禅茶等，体现真实功力" },
                      { type: "直播互动类", desc: "每日固定时段直播，引导粉丝说出痛点" },
                    ].map((item) => (
                      <div key={item.type} className="flex gap-2 p-2.5 bg-[#E8F5E0] rounded-lg">
                        <TagBadge text={item.type} color="green" />
                        <p className="text-xs text-[#6B7A5E]">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#8B6914] mb-3">🌟 侧面烘托（团队成员讲述）</div>
                  <div className="space-y-2">
                    {[
                      { type: "亲历故事类", desc: "Vivin/周周分享跟随罗卜老师后的真实改变" },
                      { type: "对比反差类", desc: "「以前我是这样，现在我是这样」的身心蜕变" },
                      { type: "神秘悬念类", desc: "「我的老师有一种方法，我不能说，但我可以告诉你结果」" },
                    ].map((item) => (
                      <div key={item.type} className="flex gap-2 p-2.5 bg-[#FFF3D6] rounded-lg">
                        <TagBadge text={item.type} color="amber" />
                        <p className="text-xs text-[#6B7A5E]">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ══ 四、线下成交 ══ */}
          <section id="offline" ref={(el) => { sectionRefs.current["offline"] = el; }}>
            <SectionTitle icon="🍵" title="线下成交流程" subtitle="从一日游体验到康宁核心课程，再到禅茶高端定制，构建阶梯式产品矩阵与信任闭环" />
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8EDE2] mb-6">
              <h3 className="text-lg font-bold text-[#2D5016] mb-5" style={{ fontFamily: "'Noto Serif SC', serif" }}>四阶产品矩阵漏斗</h3>
              <div className="flex flex-col items-center gap-1 mb-6">
                {productFunnelData.map((item, i) => {
                  const widths = ["100%", "72%", "50%", "30%"];
                  return (
                    <div key={i} className="flex items-center gap-4 w-full">
                      <div className="h-12 rounded-lg flex items-center justify-between px-4 transition-all" style={{ width: widths[i], background: item.color, marginLeft: `${i * 8}%` }}>
                        <span className="text-white font-semibold text-sm" style={{ fontFamily: "'Noto Serif SC', serif" }}>{item.stage}</span>
                        <span className="text-white/90 text-xs">{item.price}</span>
                      </div>
                      <span className="text-xs text-[#8A9A7E] flex-shrink-0">~{item.users}人</span>
                    </div>
                  );
                })}
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { stage: "第一阶段", title: "线上低客单引流", price: "几十~几百元", icon: "📱", color: "#7FB069", product: "禅舞视频课、基础理论录播课", scene: "线上平台（抖音/视频号/小红书）", goal: "筛选精准用户，实现初期现金流", action: "挂载小黄车或私信引导购买" },
                  { stage: "第二阶段", title: "线下体验沙龙（一日游）", price: "几百~千元", icon: "🌿", color: "#5A9A4A", product: "「五福人生」体验营、一日游", scene: "素食馆、自然环境好的茶室（如福田）", goal: "通过真实体感加深信任，为核心课铺垫", action: "上午理论讲解 + 下午户外体验" },
                  { stage: "第三阶段", title: "康宁核心体系课", price: "几千~万元", icon: "☯", color: "#3D7A2E", product: "康宁系统课程（含线上线下陪跑）", scene: "线上直播+线下集训，半年期陪跑", goal: "深度疗愈，产生真实改变与获得感", action: "每周布置练习任务，定期复盘" },
                  { stage: "第四阶段", title: "顶级高客单定制服务", price: "几万~几十万元", icon: "🍵", color: "#2D5016", product: "禅茶一味、非遗开光、风水堪舆、一对一疗愈", scene: "顶级私人会所（如凤凰茶馆）", goal: "建立深度师徒/合作关系，实现最大商业价值", action: "高度定制化，终身服务" },
                ].map((item) => (
                  <div key={item.stage} className="p-4 rounded-xl border border-[#E8EDE2] bg-[#F7F4EE]">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm" style={{ background: item.color }}>{item.icon}</div>
                      <div><div className="text-xs text-[#8A9A7E]">{item.stage}</div><div className="text-sm font-bold text-[#2D5016]" style={{ fontFamily: "'Noto Serif SC', serif" }}>{item.title}</div></div>
                      <TagBadge text={item.price} color="amber" />
                    </div>
                    <div className="space-y-1.5 text-xs">
                      {[["产品", item.product], ["场景", item.scene], ["目标", item.goal]].map(([k, v]) => (
                        <div key={k} className="flex gap-1.5"><span className="font-semibold text-[#2D5016] flex-shrink-0">{k}：</span><span className="text-[#6B7A5E]">{v}</span></div>
                      ))}
                      <div className="flex gap-1.5"><span className="font-semibold text-[#8B6914] flex-shrink-0">行动：</span><span className="text-[#6B7A5E]">{item.action}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden h-48 bg-cover bg-center relative" style={{ backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663597658587/HZvWvQi64RGk5hPWYMweaD/tea-ceremony-fKgMuVUEhXyPmBDAmwbDGi.webp)` }}>
              <div className="absolute inset-0 bg-gradient-to-r from-[#2D5016]/70 to-transparent" />
              <div className="absolute inset-0 flex items-center p-8">
                <div>
                  <div className="text-white/80 text-sm mb-1">线下顶级体验场景</div>
                  <div className="text-white text-2xl font-bold" style={{ fontFamily: "'Noto Serif SC', serif" }}>禅茶一味 · 高端定制</div>
                  <div className="text-white/70 text-sm mt-1">凤凰茶馆 · 私人会所 · 终身服务</div>
                </div>
              </div>
            </div>
          </section>

          {/* ══ 五、风险规避 ══ */}
          <section id="risk" ref={(el) => { sectionRefs.current["risk"] = el; }}>
            <SectionTitle icon="🛡" title="风险识别与规避策略" subtitle="提前识别政策、IP、交付和团队协作四大核心风险，制定针对性的规避方案" />
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8EDE2] mb-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-base font-bold text-[#2D5016] mb-3" style={{ fontFamily: "'Noto Serif SC', serif" }}>风险等级与规避能力评估</h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <RadarChart data={riskData}>
                      <PolarGrid stroke="#E8EDE2" />
                      <PolarAngleAxis dataKey="risk" tick={{ fontSize: 11, fill: "#3D5A2E" }} />
                      <Radar name="风险等级" dataKey="level" stroke="#C0392B" fill="#C0392B" fillOpacity={0.2} />
                      <Radar name="规避能力" dataKey="mitigation" stroke="#2D5016" fill="#2D5016" fillOpacity={0.2} />
                      <Legend wrapperStyle={{ fontSize: 11 }} />
                      <Tooltip contentStyle={{ borderRadius: "12px", fontSize: 12 }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-[#6B7A5E] leading-relaxed">综合评估显示，<span className="font-semibold text-[#8B1A1A]">政策合规风险</span>是当前最高风险项，需要在内容策略上高度警惕。<span className="font-semibold text-[#8B6914]">IP祛魅风险</span>次之，需严格控制罗卜老师的曝光质量。整体来看，团队已具备较强的风险规避能力。</p>
                  <div className="p-3 bg-[#FDE8E8] rounded-xl border border-[#F0B0B0]">
                    <div className="text-xs font-bold text-[#8B1A1A] mb-1">⚠️ 最高优先级：政策合规</div>
                    <p className="text-xs text-[#8B1A1A]/80">坚决摒弃「灵修」「法术」「包治百病」等敏感词，统一使用「东方疗愈」「国学养生」等合规话术。</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: "政策与合规风险", level: "高", levelColor: "red" as const, icon: "⚖️", risk: "身心灵赛道易被定性为封建迷信或伪科学，面临封号乃至法律制裁。2023年市场监管总局全年取缔「伪灵修机构」132家。", mitigation: ["统一使用「东方疗愈」「中国传统文化」「国学养生」等合规话术", "强调「修心」与「养生」的科学性，避免「神通」「法力」等词汇", "内容发布前由海云进行合规审核"] },
                { title: "IP祛魅风险", level: "中高", levelColor: "amber" as const, icon: "👁", risk: "罗卜老师过度曝光或直播言辞不当，导致「高人」形象崩塌，直接摧毁高客单价转化的信任基础（参考赵月案例）。", mitigation: ["严格控制罗卜老师线上出镜频率，以精心策划的短视频为主", "核心泛流量引流由Vivin等团队成员承担", "罗卜老师保持适当神秘感，长期逐步退居幕后"] },
                { title: "交付体验风险", level: "中", levelColor: "amber" as const, icon: "🎯", risk: "课程内容过于玄奥，用户听不懂或缺乏体感，引发「割韭菜」的负面评价，影响口碑传播。", mitigation: ["课程内容进行「降维翻译」，结合现代心理学与中医经络学", "提供扎实的长周期陪跑服务，确保用户获得真实改变", "建立学员反馈机制，持续优化课程内容"] },
                { title: "团队协作风险", level: "中", levelColor: "blue" as const, icon: "🤝", risk: "海云和周周为兼职状态，沟通不畅或时间错配可能导致执行效率低下，影响整体运营节奏。", mitigation: ["建立严格的周报制度与周末集中复盘机制", "工作日充分利用线上协作工具（飞书/企业微信）进行任务拆解", "周末集中高效完成线下拍摄与沙龙执行工作"] },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-5 shadow-sm border border-[#E8EDE2] card-hover">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-bold text-[#2D5016] text-base" style={{ fontFamily: "'Noto Serif SC', serif" }}>{item.title}</span>
                    <TagBadge text={`风险：${item.level}`} color={item.levelColor} />
                  </div>
                  <div className="p-3 bg-[#FDE8E8]/50 rounded-lg mb-3 border border-[#F0B0B0]/50"><p className="text-xs text-[#6B2020]">{item.risk}</p></div>
                  <div>
                    <div className="text-xs font-semibold text-[#2D5016] mb-2">规避策略：</div>
                    <ul className="space-y-1.5">
                      {item.mitigation.map((m, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-[#6B7A5E]">
                          <span className="text-[#7FB069] mt-0.5 flex-shrink-0">✓</span>{m}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ══ 六、内容选题库 ══ */}
          <section id="topics" ref={(el) => { sectionRefs.current["topics"] = el; }}>
            <SectionTitle icon="✍" title="短视频内容选题库" subtitle="30条精选选题，覆盖罗卜老师、Vivin、周周三个IP视角，每条包含标题钩子、内容框架和引导行动" />

            {/* 统计概览 */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { name: "罗卜老师", count: ipStats["罗卜老师"], color: "#2D5016", bg: "from-[#2D5016] to-[#3D7A2E]", desc: "痛点解答 · 功法演示 · 知识科普" },
                { name: "Vivin", count: ipStats["Vivin"], color: "#8B6914", bg: "from-[#8B6914] to-[#C0A060]", desc: "亲历故事 · 生活方式 · 对比反差" },
                { name: "周周", count: ipStats["周周"], color: "#1A5A6B", bg: "from-[#1A5A6B] to-[#2A7A8B]", desc: "真实蜕变 · 独立女性 · 神秘悬念" },
              ].map((item) => (
                <div key={item.name} className={`bg-gradient-to-br ${item.bg} rounded-2xl p-4 text-white`}>
                  <div className="text-3xl font-bold mb-1" style={{ fontFamily: "'DM Mono', monospace" }}>{item.count}</div>
                  <div className="text-sm font-bold mb-1" style={{ fontFamily: "'Noto Serif SC', serif" }}>{item.name}</div>
                  <div className="text-xs opacity-80">{item.desc}</div>
                </div>
              ))}
            </div>

            {/* 筛选栏 */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8EDE2] mb-6">
              <div className="flex flex-wrap gap-3 items-center">
                {/* 搜索框 */}
                <div className="flex-1 min-w-48">
                  <input
                    type="text"
                    placeholder="搜索选题标题或钩子..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-[#E8EDE2] bg-[#F7F4EE] text-[#3D5A2E] placeholder-[#A8B89E] focus:outline-none focus:border-[#7FB069] focus:ring-1 focus:ring-[#7FB069]/30"
                  />
                </div>

                {/* IP筛选 */}
                <div className="flex gap-1.5 flex-wrap">
                  {["全部", "罗卜老师", "Vivin", "周周"].map((ip) => (
                    <button
                      key={ip}
                      onClick={() => setFilterIP(ip)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        filterIP === ip
                          ? "bg-[#2D5016] text-white shadow-sm"
                          : "bg-[#F7F4EE] text-[#6B7A5E] border border-[#E8EDE2] hover:border-[#7FB069]"
                      }`}
                    >
                      {ip}
                    </button>
                  ))}
                </div>

                {/* 类型筛选 */}
                <div className="flex gap-1.5 flex-wrap">
                  {["全部", "痛点解答", "亲历故事", "功法演示", "对比反差", "神秘悬念", "知识科普", "生活方式"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilterType(type)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        filterType === type
                          ? "bg-[#8B6914] text-white shadow-sm"
                          : "bg-[#F7F4EE] text-[#6B7A5E] border border-[#E8EDE2] hover:border-[#C0A060]"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                {/* 平台筛选 */}
                <div className="flex gap-1.5">
                  {["全部", "抖音", "视频号", "小红书"].map((p) => (
                    <button
                      key={p}
                      onClick={() => setFilterPlatform(p)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        filterPlatform === p
                          ? "bg-[#1A5A6B] text-white shadow-sm"
                          : "bg-[#F7F4EE] text-[#6B7A5E] border border-[#E8EDE2] hover:border-[#2A7A8B]"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                {/* 结果数 */}
                <div className="ml-auto text-xs text-[#8A9A7E] flex-shrink-0">
                  共 <span className="font-bold text-[#2D5016]">{filteredTopics.length}</span> 条
                  {(filterIP !== "全部" || filterType !== "全部" || filterPlatform !== "全部" || searchText) && (
                    <button
                      onClick={() => { setFilterIP("全部"); setFilterType("全部"); setFilterPlatform("全部"); setSearchText(""); }}
                      className="ml-2 text-[#8B1A1A] hover:underline"
                    >
                      清除筛选
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* 选题卡片网格 */}
            {filteredTopics.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {filteredTopics.map((topic) => (
                  <TopicCard key={topic.id} topic={topic} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-[#8A9A7E]">
                <div className="text-4xl mb-3">🔍</div>
                <div className="text-sm">没有找到匹配的选题，请调整筛选条件</div>
              </div>
            )}
          </section>

          {/* ── 页脚 ── */}
          <footer className="border-t border-[#E8EDE2] pt-8 pb-4">
            <div className="rounded-2xl p-6 text-center" style={{ backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663597658587/HZvWvQi64RGk5hPWYMweaD/meditation-nature-cNLH2zDTdFkXxksJCs6smr.webp)`, backgroundSize: "cover", backgroundPosition: "center" }}>
              <div className="bg-[#2D5016]/70 backdrop-blur-sm rounded-xl p-5">
                <div className="text-white text-xl font-bold mb-2" style={{ fontFamily: "'Noto Serif SC', serif" }}>道可道，非常道</div>
                <p className="text-white/80 text-sm mb-3">康宁身心灵疗愈项目 · 04-25内部会议运营计划书 · 核心团队内部文件</p>
                <div className="flex justify-center gap-4 text-xs text-white/60">
                  <span>罗卜老师 · Vivin · 周周 · 海云</span>
                  <span>·</span>
                  <span>2025年</span>
                </div>
              </div>
            </div>
          </footer>

        </div>
      </main>
    </div>
  );
}
