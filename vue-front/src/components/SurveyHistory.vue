`<template>
  <div class="history-container">
    <div class="tab-buttons">
      <button 
        :class="['tab-btn', { active: activeTab === 'surveys' }]" 
        @click="activeTab = 'surveys'"
      >
        问卷记录
      </button>
      <button 
        :class="['tab-btn', { active: activeTab === 'feedback' }]" 
        @click="activeTab = 'feedback'"
      >
        反馈意见
      </button>
    </div>

    <!-- 搜索栏 -->
    <div class="search-bar">
      <input 
        type="text" 
        v-model="searchQuery" 
        :placeholder="activeTab === 'surveys' ? '搜索问卷记录...' : '搜索反馈意见...'" 
      />
      <div class="date-filters">
        <input 
          type="date" 
          v-model="startDate" 
          :max="endDate" 
        />
        <span>至</span>
        <input 
          type="date" 
          v-model="endDate" 
          :min="startDate" 
        />
      </div>
      <button class="search-btn" @click="search">搜索</button>
    </div>

    <!-- 问卷记录列表 -->
    <div v-if="activeTab === 'surveys'" class="records-list">
      <div v-if="loading" class="loading">加载中...</div>
      <template v-else>
        <div v-if="filteredSurveys.length === 0" class="no-data">
          暂无问卷记录
        </div>
        <div v-else class="survey-records">
          <div v-for="survey in filteredSurveys" :key="survey.id" class="record-card">
            <div class="record-header">
              <h3>问卷 #{{ survey.id }}</h3>
              <span class="date">{{ formatDate(survey.submitDate) }}</span>
            </div>
            <div class="record-content">
              <div class="info-row">
                <span class="label">姓名：</span>
                <span>{{ survey.name || '匿名' }}</span>
              </div>
              <div class="info-row">
                <span class="label">满意度：</span>
                <span>{{ survey.satisfaction }}</span>
              </div>
              <div class="info-row">
                <span class="label">推荐意愿：</span>
                <span>{{ survey.recommendation }}</span>
              </div>
            </div>
            <button class="detail-btn" @click="viewDetail(survey)">查看详情</button>
          </div>
        </div>
      </template>
    </div>

    <!-- 反馈意见列表 -->
    <div v-else class="feedback-list">
      <div v-if="loading" class="loading">加载中...</div>
      <template v-else>
        <div v-if="filteredFeedback.length === 0" class="no-data">
          暂无反馈意见
        </div>
        <div v-else class="feedback-records">
          <div v-for="feedback in filteredFeedback" :key="feedback.id" class="feedback-card">
            <div class="feedback-header">
              <span class="category">{{ feedback.category }}</span>
              <span class="date">{{ formatDate(feedback.submitDate) }}</span>
            </div>
            <div class="feedback-content">
              <p>{{ feedback.content }}</p>
            </div>
            <div class="feedback-footer">
              <span class="author">{{ feedback.name || '匿名用户' }}</span>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- 详情弹窗 -->
    <div v-if="showDetail" class="modal">
      <div class="modal-content">
        <button class="close-btn" @click="showDetail = false">&times;</button>
        <h2>问卷详情</h2>
        <div class="detail-content">
          <h3>基本信息</h3>
          <p><strong>提交时间：</strong>{{ formatDate(selectedSurvey.submitDate) }}</p>
          <p><strong>姓名：</strong>{{ selectedSurvey.name || '匿名' }}</p>
          <p><strong>职业：</strong>{{ selectedSurvey.occupation || '未填写' }}</p>

          <h3>满意度评价</h3>
          <p><strong>整体满意度：</strong>{{ selectedSurvey.satisfaction }}</p>
          <p><strong>推荐意愿：</strong>{{ selectedSurvey.recommendation }}</p>

          <h3>具体评分</h3>
          <div class="ratings-grid">
            <div v-for="(score, aspect) in selectedSurvey.ratings" :key="aspect" class="rating-item">
              <span class="aspect-label">{{ getAspectLabel(aspect) }}：</span>
              <span class="score">{{ score }}分</span>
            </div>
          </div>

          <h3>反馈意见</h3>
          <div class="feedback-section">
            <p><strong>喜欢的方面：</strong></p>
            <p>{{ selectedSurvey.likes || '未填写' }}</p>
            <p><strong>建议改进：</strong></p>
            <p>{{ selectedSurvey.improvements || '未填写' }}</p>
            <p><strong>不满意的地方：</strong></p>
            <p>{{ selectedSurvey.complaints || '未填写' }}</p>
            <p><strong>其他建议：</strong></p>
            <p>{{ selectedSurvey.suggestions || '未填写' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('surveys')
const searchQuery = ref('')
const startDate = ref('')
const endDate = ref('')
const loading = ref(false)
const showDetail = ref(false)
const selectedSurvey = ref(null)

const surveys = ref([])
const feedback = ref([])

// 从本地存储加载数据
const loadData = () => {
  loading.value = true
  setTimeout(() => {
    surveys.value = JSON.parse(localStorage.getItem('surveyData') || '[]')
    feedback.value = JSON.parse(localStorage.getItem('feedbackData') || '[]')
    loading.value = false
  }, 500)
}

// 页面加载时获取数据
loadData()

const aspectLabels = {
  serviceAttitude: '服务态度',
  responseSpeed: '响应速度',
  quality: '产品/服务质量',
  userExperience: '使用体验',
  priceValue: '性价比'
}

const filteredSurveys = computed(() => {
  return surveys.value.filter(survey => {
    const matchesSearch = !searchQuery.value || 
      survey.name?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      survey.occupation?.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesDate = (!startDate.value || survey.submitDate >= startDate.value) &&
      (!endDate.value || survey.submitDate <= endDate.value)
    
    return matchesSearch && matchesDate
  })
})

const filteredFeedback = computed(() => {
  return feedback.value.filter(item => {
    const matchesSearch = !searchQuery.value ||
      feedback.content.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      feedback.category.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesDate = (!startDate.value || feedback.submitDate >= startDate.value) &&
      (!endDate.value || feedback.submitDate <= endDate.value)
    
    return matchesSearch && matchesDate
  })
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('zh-CN')
}

const search = () => {
  loading.value = true
  // 模拟API调用延迟
  setTimeout(() => {
    loading.value = false
  }, 500)
}

const viewDetail = (survey) => {
  selectedSurvey.value = survey
  showDetail.value = true
}

const getAspectLabel = (aspect) => {
  return aspectLabels[aspect] || aspect
}
</script>

<style scoped>
.history-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.05);
}

.tab-buttons {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  background: #f8f9fa;
  padding: 10px;
  border-radius: 30px;
  box-shadow: inset 0 2px 6px rgba(0,0,0,0.05);
}

.tab-btn {
  flex: 1;
  padding: 15px 30px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: #5f6368;
  background: transparent;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.tab-btn.active {
  background-color: #4CAF50;
  color: white;
}

.search-bar {
  display: flex;
  gap: 20px;
  margin: 30px 0;
  align-items: center;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  box-shadow: inset 0 2px 6px rgba(0,0,0,0.05);
}

.search-bar input[type="text"] {
  flex: 1;
  padding: 12px 20px;
  border: 2px solid #e8eaed;
  border-radius: 25px;
  font-size: 16px;
  background: white;
  transition: all 0.3s ease;
}

.search-bar input[type="text"]:focus {
  outline: none;
  border-color: #1a73e8;
  box-shadow: 0 0 0 4px rgba(26, 115, 232, 0.1);
}

.date-filters {
  display: flex;
  align-items: center;
  gap: 15px;
}

.date-filters input[type="date"] {
  padding: 10px 15px;
  border: 2px solid #e8eaed;
  border-radius: 12px;
  font-size: 14px;
  color: #5f6368;
  background: white;
  transition: all 0.3s ease;
}

.date-filters input[type="date"]:focus {
  outline: none;
  border-color: #1a73e8;
}

.search-btn {
  padding: 12px 25px;
  background: linear-gradient(135deg, #1a73e8, #34a853);
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 500;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(26, 115, 232, 0.2);
}

.search-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(26, 115, 232, 0.3);
}

.records-list, .feedback-list {
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.record-card, .feedback-card {
  background: white;
  border-radius: 16px;
  padding: 25px;
  transition: all 0.3s ease;
  border: 1px solid #e8eaed;
  position: relative;
  overflow: hidden;
}

.record-card::before,
.feedback-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #1a73e8, #34a853);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.record-card:hover,
.feedback-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.1);
}

.record-card:hover::before,
.feedback-card:hover::before {
  opacity: 1;
}

.record-header, .feedback-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e8eaed;
}

.record-header h3 {
  color: #1a73e8;
  font-size: 1.2em;
  font-weight: 600;
  margin: 0;
}

.info-row {
  margin: 12px 0;
  display: flex;
  align-items: center;
}

.label {
  font-weight: 500;
  margin-right: 12px;
  color: #5f6368;
  min-width: 80px;
}

.detail-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #1a73e8, #34a853);
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  width: 100%;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(26, 115, 232, 0.2);
}

.detail-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(26, 115, 232, 0.3);
}

.feedback-content {
  font-size: 1.1em;
  line-height: 1.6;
  color: #202124;
  margin: 15px 0;
}

.feedback-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #e8eaed;
}

.category {
  padding: 6px 12px;
  background: #e8f5e9;
  color: #34a853;
  border-radius: 15px;
  font-size: 0.9em;
  font-weight: 500;
}

.date {
  color: #5f6368;
  font-size: 0.9em;
}

/* 模态框样式 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 20px;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideUp 0.3s ease;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.close-btn {
  position: absolute;
  right: 20px;
  top: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #5f6368;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #f1f3f4;
  color: #1a73e8;
}

.detail-content {
  margin-top: 20px;
}

.detail-content h3 {
  color: #1a73e8;
  margin: 25px 0 15px;
  font-size: 1.3em;
  font-weight: 600;
}

.ratings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin: 15px 0;
}

.rating-item {
  padding: 12px;
  background: #f8f9fa;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.aspect-label {
  color: #5f6368;
  font-weight: 500;
}

.score {
  color: #1a73e8;
  font-weight: 600;
}

.feedback-section {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  margin-top: 15px;
}

.feedback-section p {
  margin: 10px 0;
  line-height: 1.6;
}

.loading, .no-data {
  text-align: center;
  padding: 20px;
  color: #666;
}

/* 弹窗样式 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.close-btn {
  position: absolute;
  right: 20px;
  top: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.detail-content {
  margin-top: 20px;
}

.ratings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  margin: 10px 0;
}

.rating-item {
  padding: 5px;
  background: #f5f5f5;
  border-radius: 4px;
}

.feedback-section {
  margin-top: 10px;
}

.feedback-section p {
  margin: 5px 0;
}

.category {
  background: #e8f5e9;
  padding: 2px 8px;
  border-radius: 4px;
  color: #4CAF50;
}

.date {
  color: #666;
  font-size: 0.9em;
}
</style>`
