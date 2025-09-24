<template>
  <div class="survey-detail">
    <el-card>
      <template #header>
        <div class="card-header">
          <h2>问卷详情</h2>
          <div class="header-actions">
            <el-input
              v-model="surveyId"
              placeholder="请输入问卷ID"
              style="width: 200px; margin-right: 10px;"
              @keyup.enter="loadSurvey"
            />
            <el-button type="primary" @click="loadSurvey" :loading="loading">
              <el-icon><Search /></el-icon>
              查询
            </el-button>
          </div>
        </div>
      </template>
      
      <div v-if="loading" class="loading-container">
        <el-skeleton :rows="8" animated />
      </div>
      
      <div v-else-if="!survey" class="empty-container">
        <el-empty description="请输入问卷ID进行查询" />
      </div>
      
      <div v-else-if="error" class="error-container">
        <el-alert
          :title="error"
          type="error"
          show-icon
          :closable="false"
        />
      </div>
      
      <div v-else class="survey-detail-content">
        <el-card class="detail-card" shadow="never">
          <template #header>
            <div class="detail-header">
              <h3>{{ survey.basic_info.name }}</h3>
              <el-tag type="info">{{ survey.basic_info.career }}</el-tag>
            </div>
          </template>
          
          <div class="detail-content">
            <!-- 基本信息 -->
            <el-card class="section-card" shadow="never">
              <template #header>
                <h4>基本信息</h4>
              </template>
              
              <el-row :gutter="20">
                <el-col :span="8">
                  <div class="info-item">
                    <label>姓名：</label>
                    <span>{{ survey.basic_info.name }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="info-item">
                    <label>联系方式：</label>
                    <span>{{ survey.basic_info.contact }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="info-item">
                    <label>职业：</label>
                    <span>{{ survey.basic_info.career }}</span>
                  </div>
                </el-col>
              </el-row>
              
              <el-row :gutter="20" style="margin-top: 16px;">
                <el-col :span="12">
                  <div class="info-item">
                    <label>提交时间：</label>
                    <span>{{ formatDate(survey.created_at) }}</span>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="info-item">
                    <label>问卷ID：</label>
                    <span>{{ survey.id }}</span>
                  </div>
                </el-col>
              </el-row>
            </el-card>

            <!-- 整体满意度 -->
            <el-card class="section-card" shadow="never">
              <template #header>
                <h4>整体满意度</h4>
              </template>
              
              <el-row :gutter="20">
                <el-col :span="12">
                  <div class="info-item">
                    <label>服务满意度：</label>
                    <el-tag :type="getSatisfactionType(survey.overall_satisfaction.satisfaction)">
                      {{ survey.overall_satisfaction.satisfaction }}
                    </el-tag>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="info-item">
                    <label>推荐意愿：</label>
                    <el-tag :type="survey.overall_satisfaction.recommendation === '愿意' ? 'success' : 'warning'">
                      {{ survey.overall_satisfaction.recommendation }}
                    </el-tag>
                  </div>
                </el-col>
              </el-row>
            </el-card>

            <!-- 各方面评价 -->
            <el-card class="section-card" shadow="never">
              <template #header>
                <h4>各方面评价</h4>
              </template>
              
              <div class="rating-grid">
                <div class="rating-item">
                  <label>服务态度：</label>
                  <div class="rating-content">
                    <el-rate :model-value="survey.aspect_evaluation.service_attitude" disabled />
                    <span class="rating-text">{{ survey.aspect_evaluation.service_attitude }}分</span>
                  </div>
                </div>
                <div class="rating-item">
                  <label>响应速度：</label>
                  <div class="rating-content">
                    <el-rate :model-value="survey.aspect_evaluation.response_speed" disabled />
                    <span class="rating-text">{{ survey.aspect_evaluation.response_speed }}分</span>
                  </div>
                </div>
                <div class="rating-item">
                  <label>服务质量：</label>
                  <div class="rating-content">
                    <el-rate :model-value="survey.aspect_evaluation.quality" disabled />
                    <span class="rating-text">{{ survey.aspect_evaluation.quality }}分</span>
                  </div>
                </div>
                <div class="rating-item">
                  <label>使用体验：</label>
                  <div class="rating-content">
                    <el-rate :model-value="survey.aspect_evaluation.user_experience" disabled />
                    <span class="rating-text">{{ survey.aspect_evaluation.user_experience }}分</span>
                  </div>
                </div>
                <div class="rating-item">
                  <label>性价比：</label>
                  <div class="rating-content">
                    <el-rate :model-value="survey.aspect_evaluation.cost_performance" disabled />
                    <span class="rating-text">{{ survey.aspect_evaluation.cost_performance }}分</span>
                  </div>
                </div>
              </div>
            </el-card>

            <!-- 开放式反馈 -->
            <el-card class="section-card" shadow="never">
              <template #header>
                <h4>开放式反馈</h4>
              </template>
              
              <div class="feedback-section">
                <div class="feedback-item" v-if="survey.open_ended.favorite_part">
                  <label>喜欢的地方：</label>
                  <p>{{ survey.open_ended.favorite_part }}</p>
                </div>
                
                <div class="feedback-item" v-if="survey.open_ended.needs_improvement">
                  <label>需要改进的地方：</label>
                  <p>{{ survey.open_ended.needs_improvement }}</p>
                </div>
                
                <div class="feedback-item" v-if="survey.open_ended.dissatisfied_details">
                  <label>不满意的地方：</label>
                  <p>{{ survey.open_ended.dissatisfied_details }}</p>
                </div>
                
                <div class="feedback-item" v-if="survey.open_ended.other_suggestions">
                  <label>其他建议：</label>
                  <p>{{ survey.open_ended.other_suggestions }}</p>
                </div>
              </div>
            </el-card>

            <!-- 联系方式 -->
            <el-card class="section-card" shadow="never">
              <template #header>
                <h4>联系方式</h4>
              </template>
              
              <div class="info-item">
                <label>接受通知联系方式：</label>
                <span>{{ survey.contact_for_updates }}</span>
              </div>
            </el-card>
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { surveyApi, type SurveyListItem } from '@/api/survey'
import dayjs from 'dayjs'

const surveyId = ref('')
const survey = ref<SurveyListItem | null>(null)
const loading = ref(false)
const error = ref('')

// 从URL参数获取ID
const getSurveyIdFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const id = urlParams.get('id')
  if (id) {
    surveyId.value = id
    loadSurvey()
  }
}

// 加载问卷详情
const loadSurvey = async () => {
  if (!surveyId.value.trim()) {
    ElMessage.warning('请输入问卷ID')
    return
  }
  
  try {
    loading.value = true
    error.value = ''
    const id = parseInt(surveyId.value)
    
    if (isNaN(id)) {
      error.value = '请输入有效的问卷ID'
      return
    }
    
    const response = await surveyApi.getSurveyById(id)
    survey.value = response
  } catch (err: any) {
    error.value = err.message || '查询问卷失败'
    survey.value = null
  } finally {
    loading.value = false
  }
}

// 格式化日期
const formatDate = (dateString: string) => {
  return dayjs(dateString).format('YYYY-MM-DD HH:mm:ss')
}

// 获取满意度标签类型
const getSatisfactionType = (satisfaction: string) => {
  const typeMap: Record<string, string> = {
    '非常满意': 'success',
    '满意': 'success',
    '一般': 'warning',
    '不满意': 'danger',
    '非常不满意': 'danger'
  }
  return typeMap[satisfaction] || 'info'
}

// 组件挂载时检查URL参数
onMounted(() => {
  getSurveyIdFromUrl()
})
</script>

<style scoped>
.survey-detail {
  max-width: 1000px;
  margin: 0 auto;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h2 {
  margin: 0;
  color: #303133;
}

.header-actions {
  display: flex;
  align-items: center;
}

.loading-container {
  padding: 20px 0;
}

.empty-container,
.error-container {
  text-align: center;
  padding: 40px 0;
}

.survey-detail-content {
  padding: 0;
}

.detail-card {
  border: 1px solid #e4e7ed;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-header h3 {
  margin: 0;
  color: #303133;
}

.detail-content {
  padding: 0;
}

.section-card {
  margin-bottom: 20px;
  border: 1px solid #e4e7ed;
}

.section-card :deep(.el-card__header) {
  background-color: #f8f9fa;
  border-bottom: 1px solid #e4e7ed;
}

.section-card h4 {
  margin: 0;
  color: #303133;
  font-size: 16px;
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.info-item label {
  font-weight: 500;
  color: #606266;
  margin-right: 8px;
  min-width: 120px;
}

.rating-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-top: 12px;
}

.rating-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e4e7ed;
}

.rating-item label {
  font-weight: 500;
  color: #606266;
  font-size: 14px;
  margin: 0;
}

.rating-content {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.rating-text {
  color: #409eff;
  font-weight: 500;
  font-size: 14px;
}

@media (max-width: 768px) {
  .rating-grid {
    grid-template-columns: 1fr;
  }
}

.feedback-section {
  padding: 0;
}

.feedback-item {
  margin-bottom: 16px;
}

.feedback-item label {
  font-weight: 500;
  color: #606266;
  display: block;
  margin-bottom: 8px;
}

.feedback-item p {
  margin: 0;
  color: #303133;
  line-height: 1.6;
  background-color: #f8f9fa;
  padding: 12px 16px;
  border-radius: 6px;
  border-left: 4px solid #409eff;
}
</style>
