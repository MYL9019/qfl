<template>
  <div class="survey-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <h2>问卷列表</h2>
          <el-button type="primary" @click="loadSurveys" :loading="loading">
            <el-icon><Refresh /></el-icon>
            刷新
          </el-button>
        </div>
      </template>
      
      <div v-if="loading" class="loading-container">
        <el-skeleton :rows="5" animated />
      </div>
      
      <div v-else-if="surveys.length === 0" class="empty-container">
        <el-empty description="暂无问卷数据" />
      </div>
      
      <div v-else class="survey-grid">
        <el-card
          v-for="survey in surveys"
          :key="survey.id"
          class="survey-item"
          shadow="hover"
        >
          <template #header>
            <div class="survey-header">
              <div class="survey-info">
                <h3>{{ survey.basic_info.name }}</h3>
                <el-tag type="info">{{ survey.basic_info.career }}</el-tag>
              </div>
              <div class="survey-actions">
                <el-button 
                  type="primary" 
                  size="small" 
                  @click="viewDetail(survey.id)"
                >
                  <el-icon><View /></el-icon>
                  查看详情
                </el-button>
                <el-button 
                  type="danger" 
                  size="small" 
                  @click="deleteSurvey(survey.id, survey.basic_info.name)"
                >
                  <el-icon><Delete /></el-icon>
                  删除
                </el-button>
              </div>
            </div>
          </template>
          
          <div class="survey-content">
            <el-row :gutter="16">
              <el-col :span="12">
                <div class="info-item">
                  <label>联系方式：</label>
                  <span>{{ survey.basic_info.contact }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="info-item">
                  <label>提交时间：</label>
                  <span>{{ formatDate(survey.created_at) }}</span>
                </div>
              </el-col>
            </el-row>
            
            <el-divider />
            
            <div class="satisfaction-section">
              <h4>整体满意度</h4>
              <el-row :gutter="16">
                <el-col :span="12">
                  <div class="info-item">
                    <label>满意度：</label>
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
            </div>
            
            <el-divider />
            
            <div class="evaluation-section">
              <h4>各方面评价</h4>
              <div class="rating-grid">
                <div class="rating-item">
                  <label>服务态度：</label>
                  <div class="rating-content">
                    <el-rate :model-value="survey.aspect_evaluation.service_attitude" disabled />
                    <span class="rating-score">{{ survey.aspect_evaluation.service_attitude }}分</span>
                  </div>
                </div>
                <div class="rating-item">
                  <label>响应速度：</label>
                  <div class="rating-content">
                    <el-rate :model-value="survey.aspect_evaluation.response_speed" disabled />
                    <span class="rating-score">{{ survey.aspect_evaluation.response_speed }}分</span>
                  </div>
                </div>
                <div class="rating-item">
                  <label>服务质量：</label>
                  <div class="rating-content">
                    <el-rate :model-value="survey.aspect_evaluation.quality" disabled />
                    <span class="rating-score">{{ survey.aspect_evaluation.quality }}分</span>
                  </div>
                </div>
                <div class="rating-item">
                  <label>使用体验：</label>
                  <div class="rating-content">
                    <el-rate :model-value="survey.aspect_evaluation.user_experience" disabled />
                    <span class="rating-score">{{ survey.aspect_evaluation.user_experience }}分</span>
                  </div>
                </div>
                <div class="rating-item">
                  <label>性价比：</label>
                  <div class="rating-content">
                    <el-rate :model-value="survey.aspect_evaluation.cost_performance" disabled />
                    <span class="rating-score">{{ survey.aspect_evaluation.cost_performance }}分</span>
                  </div>
                </div>
              </div>
            </div>
            
            <el-divider />
            
            <div class="open-ended-section">
              <h4>开放式反馈</h4>
              <div class="feedback-item" v-if="survey.open_ended.favorite_part">
                <label>喜欢的地方：</label>
                <p>{{ survey.open_ended.favorite_part }}</p>
              </div>
              <div class="feedback-item" v-if="survey.open_ended.needs_improvement">
                <label>需要改进：</label>
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
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Refresh, View, Delete } from '@element-plus/icons-vue'
import { surveyApi, type SurveyListItem } from '@/api/survey'
import dayjs from 'dayjs'

const surveys = ref<SurveyListItem[]>([])
const loading = ref(false)

// 加载问卷列表
const loadSurveys = async () => {
  try {
    loading.value = true
    const response = await surveyApi.getAllSurveys()
    surveys.value = response
  } catch (error) {
    ElMessage.error('加载问卷列表失败')
    console.error('加载问卷列表失败:', error)
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

// 查看详情
const viewDetail = (id: number) => {
  // 跳转到详情页面，并传递ID参数
  window.location.hash = `/detail?id=${id}`
}

// 删除问卷
const deleteSurvey = async (id: number, name: string) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除 ${name} 的问卷吗？此操作不可恢复！`,
      '删除确认',
      {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'warning',
        confirmButtonClass: 'el-button--danger'
      }
    )
    
    await surveyApi.deleteSurvey(id)
    ElMessage.success('问卷删除成功')
    
    // 重新加载列表
    loadSurveys()
    
  } catch (error: any) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败')
    }
  }
}

// 组件挂载时加载数据
onMounted(() => {
  loadSurveys()
})
</script>

<style scoped>
.survey-list {
  max-width: 1200px;
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

.loading-container {
  padding: 20px 0;
}

.empty-container {
  text-align: center;
  padding: 40px 0;
}

.survey-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
}

@media (max-width: 768px) {
  .survey-grid {
    grid-template-columns: 1fr;
  }
  
  .rating-grid {
    grid-template-columns: 1fr;
  }
}

.survey-item {
  margin-bottom: 20px;
}

.survey-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.survey-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.survey-info h3 {
  margin: 0;
  color: #303133;
}

.survey-actions {
  display: flex;
  gap: 8px;
}

.survey-content {
  padding: 0;
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.info-item label {
  font-weight: 500;
  color: #606266;
  margin-right: 8px;
  min-width: 80px;
}

.satisfaction-section h4,
.evaluation-section h4,
.open-ended-section h4 {
  margin: 0 0 16px 0;
  color: #303133;
  font-size: 16px;
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

.rating-score {
  color: #409eff;
  font-weight: 500;
  font-size: 14px;
}

.feedback-item {
  margin-bottom: 12px;
}

.feedback-item label {
  font-weight: 500;
  color: #606266;
  display: block;
  margin-bottom: 4px;
}

.feedback-item p {
  margin: 0;
  color: #303133;
  line-height: 1.5;
  background-color: #f8f9fa;
  padding: 8px 12px;
  border-radius: 4px;
  border-left: 3px solid #409eff;
}
</style>
