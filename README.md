# Vue 问卷调查系统

一个基于 Vue 3 + TypeScript + Element Plus 的现代化问卷调查系统，支持问卷的创建、查询、详情查看和删除功能。

## 🚀 项目特性

### 核心功能
- ✅ **创建问卷** - 完整的问卷表单，支持多种题型
- ✅ **问卷列表** - 展示所有问卷，支持查看详情和删除
- ✅ **问卷详情** - 通过ID查询单个问卷的详细信息
- ✅ **删除问卷** - 安全的问卷删除功能

### 技术特性
- 🎯 **Vue 3** - 使用最新的 Composition API
- 🔷 **TypeScript** - 完整的类型安全
- 🎨 **Element Plus** - 现代化的UI组件库
- ⚡ **Vite** - 快速的构建工具
- 📱 **响应式设计** - 适配各种屏幕尺寸
- 🔧 **工程化配置** - ESLint + Prettier + 自动导入

## 📋 项目结构

```
src/
├── api/                    # API 服务
│   ├── request.ts         # Axios 配置
│   └── survey.ts          # 问卷相关 API
├── components/            # 组件目录
├── views/                 # 页面组件
│   ├── CreateSurvey.vue   # 创建问卷页面
│   ├── SurveyList.vue     # 问卷列表页面
│   ├── SurveyDetail.vue   # 问卷详情页面
│   └── DeleteSurvey.vue   # 删除问卷页面
├── router/                # 路由配置
│   └── index.ts
├── types/                 # 类型定义
│   └── survey.ts
├── utils/                 # 工具函数
├── assets/                # 静态资源
├── App.vue               # 根组件
└── main.ts               # 入口文件
```

## 🛠️ 技术栈

### 前端框架
- **Vue 3.4+** - 渐进式JavaScript框架
- **TypeScript 5.2+** - JavaScript的超集，提供类型安全
- **Vite 5.0+** - 下一代前端构建工具

### UI 组件库
- **Element Plus 2.4+** - 基于Vue 3的组件库
- **@element-plus/icons-vue** - Element Plus图标库

### 开发工具
- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化
- **unplugin-auto-import** - 自动导入
- **unplugin-vue-components** - 组件自动导入

### 其他依赖
- **Vue Router 4.2+** - 官方路由管理器
- **Pinia 2.1+** - 状态管理
- **Axios 1.6+** - HTTP客户端
- **Day.js 1.11+** - 日期处理库

## 🚀 快速开始

### 环境要求
- Node.js 20.0+
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```
项目将在 http://localhost:9999 启动

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 📖 API 接口

### 后端接口规范

#### 1. 创建问卷
```http
POST /survey
Content-Type: application/json

{
  "basic_info": {
    "name": "用户姓名",
    "contact": "联系方式",
    "career": "职业"
  },
  "overall_satisfaction": {
    "satisfaction": "满意",
    "recommendation": "愿意"
  },
  "aspect_evaluation": {
    "service_attitude": 5,
    "response_speed": 4,
    "quality": 5,
    "user_experience": 3,
    "cost_performance": 4
  },
  "open_ended": {
    "favorite_part": "喜欢的地方",
    "needs_improvement": "需要改进",
    "dissatisfied_details": "不满意的地方",
    "other_suggestions": "其他建议"
  },
  "contact_for_updates": "通知联系方式"
}
```

#### 2. 查询所有问卷
```http
GET /surveys
```

#### 3. 查询单个问卷
```http
GET /survey/{id}
```

#### 4. 删除问卷
```http
DELETE /survey/{id}
```

## 🎨 页面功能

### 创建问卷页面 (`/create`)
- **基本信息**：姓名、联系方式、职业
- **整体满意度**：服务满意度、推荐意愿
- **各方面评价**：服务态度、响应速度、服务质量、使用体验、性价比（1-5分评分）
- **开放式问题**：喜欢的地方、需要改进、不满意的地方、其他建议
- **联系方式**：接受通知的联系方式

### 问卷列表页面 (`/list`)
- **卡片式布局**：每个问卷以卡片形式展示
- **自适应网格**：根据屏幕尺寸自动调整布局
- **评分可视化**：星级评分和分数显示
- **操作按钮**：查看详情、删除问卷
- **实时刷新**：支持手动刷新数据

### 问卷详情页面 (`/detail`)
- **ID查询**：通过问卷ID查询详细信息
- **完整展示**：显示问卷的所有信息
- **评分展示**：可视化评分显示
- **反馈内容**：开放式问题的详细回答

### 删除问卷页面 (`/delete`)
- **安全确认**：双重确认机制防止误删
- **ID输入**：支持通过ID删除问卷
- **结果反馈**：删除成功或失败的提示

## 🎯 设计特色

### 响应式设计
- **自适应布局**：根据屏幕宽度自动调整
- **移动端友好**：在小屏幕设备上优化显示
- **网格系统**：使用CSS Grid实现灵活布局

### 用户体验
- **加载状态**：骨架屏和加载动画
- **错误处理**：友好的错误提示
- **确认对话框**：重要操作的二次确认
- **实时反馈**：操作结果的即时提示

### 视觉设计
- **现代化UI**：使用Element Plus组件库
- **统一风格**：一致的颜色和间距
- **清晰层次**：合理的信息架构
- **交互反馈**：悬停、点击等交互效果

## 🔧 开发配置

### 代码规范
- **ESLint**：代码质量检查
- **Prettier**：代码格式化
- **TypeScript**：类型检查

### 自动导入
- **Vue API**：自动导入Vue相关API
- **Element Plus**：自动导入组件和图标
- **工具函数**：自动导入常用工具函数

### 构建优化
- **代码分割**：按需加载减少初始包大小
- **Tree Shaking**：移除未使用的代码
- **压缩优化**：生产环境代码压缩

## 📱 浏览器支持

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 项目Issues：[GitHub Issues](https://github.com/your-repo/issues)
- 邮箱：your-email@example.com

---

**感谢使用 Vue 问卷调查系统！** 🎉
