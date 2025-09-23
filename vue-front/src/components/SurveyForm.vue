`<template>
  <div class="survey-container">
    <h1>📝 问卷调查表</h1>
    <p class="intro">非常感谢您抽出宝贵时间填写本次问卷。您的反馈将帮助我们不断改进，提升服务质量！</p>

    <!-- 进度条 -->
    <div class="progress-bar">
      <div class="progress-step" v-for="(step, index) in steps" :key="index">
        <div class="step-number" :class="{ active: currentStep >= index, completed: currentStep > index }">
          {{ index + 1 }}
        </div>
        <div class="step-label" :class="{ active: currentStep >= index }">{{ step.title }}</div>
      </div>
    </div>

    <form @submit.prevent="submitForm">
      <!-- 基本信息 -->
      <section v-show="currentStep === 0" class="form-section">
        <h2>基本信息（可选填写）</h2>
        <div class="form-group">
          <label>您的姓名（可选）：</label>
          <input type="text" v-model="formData.name" />
        </div>
        <div class="form-group">
          <label>联系方式（可选）：</label>
          <input type="text" v-model="formData.contact" />
        </div>
        <div class="form-group">
          <label>职业/身份：</label>
          <input type="text" v-model="formData.occupation" placeholder="例如：学生、公司职员、自由职业者等" />
        </div>
      </section>

      <!-- 总体满意度 -->
      <section v-show="currentStep === 1" class="form-section">
        <h2>一、总体满意度</h2>
        <div class="form-group">
          <p>您对我们的整体服务满意度如何？</p>
          <div class="radio-group">
            <label v-for="option in satisfactionOptions" :key="option">
              <input type="radio" v-model="formData.satisfaction" :value="option" />
              {{ option }}
            </label>
          </div>
        </div>

        <div class="form-group">
          <p>您是否愿意向他人推荐我们的服务/产品？</p>
          <div class="radio-group">
            <label v-for="option in recommendationOptions" :key="option">
              <input type="radio" v-model="formData.recommendation" :value="option" />
              {{ option }}
            </label>
          </div>
        </div>
      </section>

      <!-- 具体方面评价 -->
      <section v-show="currentStep === 2" class="form-section">
        <h2>二、具体方面评价</h2>
        <p>请您对以下方面进行评价（1分为非常不满意，5分为非常满意）：</p>
        <table class="rating-table">
          <thead>
            <tr>
              <th>方面</th>
              <th v-for="n in 5" :key="n">{{ n }}分</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="aspect in aspects" :key="aspect.key">
              <td>{{ aspect.label }}</td>
              <td v-for="n in 5" :key="n">
                <input 
                  type="radio" 
                  :name="aspect.key" 
                  :value="n" 
                  v-model="formData.ratings[aspect.key]"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- 开放性问题 -->
      <section v-show="currentStep === 3" class="form-section">
        <h2>三、开放性问题</h2>
        <div class="form-group">
          <label>您最喜欢我们的哪一点？</label>
          <textarea v-model="formData.likes" rows="3"></textarea>
        </div>
        <div class="form-group">
          <label>您认为我们最需要改进的是什么？</label>
          <textarea v-model="formData.improvements" rows="3"></textarea>
        </div>
        <div class="form-group">
          <label>您有没有遇到过任何不满意的地方？如果有，请详细描述：</label>
          <textarea v-model="formData.complaints" rows="3"></textarea>
        </div>
        <div class="form-group">
          <label>对我们的其他建议或意见：</label>
          <textarea v-model="formData.suggestions" rows="3"></textarea>
        </div>
      </section>

      <!-- 感谢与说明 -->
      <section v-show="currentStep === 4" class="form-section">
        <h2>四、感谢与说明</h2>
        <p>感谢您的耐心填写。您的每一条建议，我们都将认真对待。</p>
        <div class="form-group">
          <label>
            <input type="checkbox" v-model="formData.subscribeToUpdates" />
            我愿意接收后续的优化成果或活动通知
          </label>
        </div>
      </section>

      <!-- 导航按钮 -->
      <div class="navigation-buttons">
        <button 
          type="button" 
          class="nav-btn prev-btn" 
          v-show="currentStep > 0" 
          @click="prevStep"
        >
          上一步
        </button>
        <button 
          v-if="currentStep < steps.length - 1" 
          type="button" 
          class="nav-btn next-btn" 
          @click="nextStep"
          :disabled="!canProceed"
        >
          下一步
        </button>
        <button 
          v-else 
          type="submit" 
          class="nav-btn submit-btn"
          :disabled="!canProceed"
        >
          提交问卷
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'

const currentStep = ref(0)
const steps = [
  { title: '基本信息', isRequired: false },
  { title: '满意度', isRequired: true },
  { title: '评分', isRequired: true },
  { title: '建议', isRequired: false },
  { title: '完成', isRequired: false }
]

const satisfactionOptions = ['非常满意', '满意', '一般', '不满意', '非常不满意']
const recommendationOptions = ['非常愿意', '愿意', '说不清', '不愿意', '非常不愿意']
const aspects = [
  { key: 'serviceAttitude', label: '服务态度' },
  { key: 'responseSpeed', label: '响应速度' },
  { key: 'quality', label: '产品/服务质量' },
  { key: 'userExperience', label: '使用体验' },
  { key: 'priceValue', label: '性价比' }
]

const formData = reactive({
  name: '',
  contact: '',
  occupation: '',
  satisfaction: '',
  recommendation: '',
  ratings: {},
  likes: '',
  improvements: '',
  complaints: '',
  suggestions: '',
  subscribeToUpdates: false
})

const canProceed = computed(() => {
  switch (currentStep.value) {
    case 0: // 基本信息 - 选填
      return true
    case 1: // 满意度
      return formData.satisfaction && formData.recommendation
    case 2: // 评分
      return Object.keys(formData.ratings).length === aspects.length
    case 3: // 建议 - 选填
      return true
    case 4: // 完成
      return true
    default:
      return false
  }
})

const nextStep = () => {
  if (currentStep.value < steps.length - 1 && canProceed.value) {
    currentStep.value++
    window.scrollTo(0, 0)
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
    window.scrollTo(0, 0)
  }
}

// 模拟保存数据到本地存储
const saveSurveyData = (data) => {
  // 从本地存储获取现有数据
  const existingSurveys = JSON.parse(localStorage.getItem('surveyData') || '[]')
  
  // 创建新的问卷记录
  const newSurvey = {
    id: existingSurveys.length + 1,
    submitDate: new Date().toISOString().split('T')[0],
    ...data
  }
  
  // 添加新记录并保存
  existingSurveys.push(newSurvey)
  localStorage.setItem('surveyData', JSON.stringify(existingSurveys))

  // 如果有反馈意见，保存到反馈记录中
  if (data.likes || data.improvements || data.complaints || data.suggestions) {
    const existingFeedback = JSON.parse(localStorage.getItem('feedbackData') || '[]')
    const feedbackItems = []
    
    if (data.likes) {
      feedbackItems.push({
        id: existingFeedback.length + 1,
        category: '优点反馈',
        content: data.likes,
        submitDate: new Date().toISOString().split('T')[0],
        name: data.name || '匿名'
      })
    }
    
    if (data.improvements) {
      feedbackItems.push({
        id: existingFeedback.length + 2,
        category: '改进建议',
        content: data.improvements,
        submitDate: new Date().toISOString().split('T')[0],
        name: data.name || '匿名'
      })
    }

    if (data.complaints || data.suggestions) {
      feedbackItems.push({
        id: existingFeedback.length + 3,
        category: '其他反馈',
        content: [data.complaints, data.suggestions].filter(Boolean).join('\n'),
        submitDate: new Date().toISOString().split('T')[0],
        name: data.name || '匿名'
      })
    }

    localStorage.setItem('feedbackData', JSON.stringify([...existingFeedback, ...feedbackItems]))
  }
}

const submitForm = () => {
  if (canProceed.value) {
    const formDataToSave = JSON.parse(JSON.stringify(formData))
    saveSurveyData(formDataToSave)
    alert('感谢您的反馈！')
    // 重置表单
    Object.keys(formData).forEach(key => {
      if (typeof formData[key] === 'string') formData[key] = ''
      else if (typeof formData[key] === 'boolean') formData[key] = false
      else if (typeof formData[key] === 'object') formData[key] = {}
    })
    // 返回第一步
    currentStep.value = 0
  }
}
</script>

<style scoped>
.survey-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  font-family: 'Segoe UI', system-ui, sans-serif;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.05);
}

h1 {
  text-align: center;
  color: #1a73e8;
  margin-bottom: 20px;
  font-size: 2.5em;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  letter-spacing: -0.5px;
}

.intro {
  text-align: center;
  color: #5f6368;
  margin-bottom: 40px;
  font-size: 1.1em;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* 进度条样式 */
.progress-bar {
  display: flex;
  justify-content: space-between;
  margin: 40px 0;
  position: relative;
  padding: 0 20px;
}

.progress-bar::before {
  content: '';
  position: absolute;
  top: 15px;
  left: 40px;
  right: 40px;
  height: 3px;
  background: #e8eaed;
  border-radius: 3px;
  z-index: 1;
}

.progress-step {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.step-number {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid #e8eaed;
  color: #5f6368;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  font-weight: bold;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.step-number.active {
  background: #1a73e8;
  border-color: #1a73e8;
  color: white;
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(26, 115, 232, 0.3);
}

.step-number.completed {
  background: #34a853;
  border-color: #34a853;
  color: white;
  transform: scale(1);
}

.step-label {
  font-size: 14px;
  color: #5f6368;
  margin-top: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  text-align: center;
  max-width: 100px;
}

.step-label.active {
  color: #1a73e8;
  transform: scale(1.05);
}

.step-label {
  font-size: 14px;
  color: #666;
  text-align: center;
  transition: color 0.3s ease;
}

.step-label.active {
  color: #4CAF50;
  font-weight: bold;
}

.form-section {
  margin-bottom: 40px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  min-height: 300px;
}

h2 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.5em;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #333;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.radio-group {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 5px;
}

.rating-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.rating-table th,
.rating-table td {
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
}

.rating-table th {
  background-color: #f5f5f5;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

/* 导航按钮样式 */
.navigation-buttons {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 30px;
  padding: 0 20px;
}

.nav-btn {
  padding: 12px 30px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  min-width: 120px;
}

.prev-btn {
  background-color: #fff;
  border: 1px solid #ddd;
  color: #666;
}

.prev-btn:hover {
  background-color: #f5f5f5;
}

.next-btn {
  background-color: #4CAF50;
  color: white;
}

.next-btn:hover:not(:disabled) {
  background-color: #45a049;
}

.submit-btn {
  background-color: #4CAF50;
  color: white;
}

.submit-btn:hover:not(:disabled) {
  background-color: #45a049;
}

.nav-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
  opacity: 0.7;
}
</style>`
