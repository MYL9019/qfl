<template>
  <div class="create-survey">
    <el-card class="survey-card">
      <template #header>
        <div class="card-header">
          <h2>创建问卷</h2>
          <p>请填写以下信息，帮助我们了解您的反馈</p>
        </div>
      </template>
      
      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-width="120px"
        class="survey-form"
      >
        <!-- 基本信息 -->
        <el-card class="section-card" shadow="never">
          <template #header>
            <h3>基本信息</h3>
          </template>
          
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="姓名" prop="basic_info.name">
                <el-input v-model="formData.basic_info.name" placeholder="请输入您的姓名" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系方式" prop="basic_info.contact">
                <el-input v-model="formData.basic_info.contact" placeholder="请输入联系方式" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="职业" prop="basic_info.career">
                <el-input v-model="formData.basic_info.career" placeholder="请输入您的职业" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>

        <!-- 整体满意度 -->
        <el-card class="section-card" shadow="never">
          <template #header>
            <h3>整体满意度</h3>
          </template>
          
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="服务满意度" prop="overall_satisfaction.satisfaction" required>
                <el-radio-group v-model="formData.overall_satisfaction.satisfaction">
                  <el-radio value="非常满意">非常满意</el-radio>
                  <el-radio value="满意">满意</el-radio>
                  <el-radio value="一般">一般</el-radio>
                  <el-radio value="不满意">不满意</el-radio>
                  <el-radio value="非常不满意">非常不满意</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否愿意推荐" prop="overall_satisfaction.recommendation" required>
                <el-radio-group v-model="formData.overall_satisfaction.recommendation">
                  <el-radio value="愿意">愿意</el-radio>
                  <el-radio value="不愿意">不愿意</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>

        <!-- 各方面评价 -->
        <el-card class="section-card" shadow="never">
          <template #header>
            <h3>各方面评价</h3>
          </template>
          
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="服务态度" prop="aspect_evaluation.service_attitude" required>
                <el-rate v-model="formData.aspect_evaluation.service_attitude" :max="5" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="响应速度" prop="aspect_evaluation.response_speed" required>
                <el-rate v-model="formData.aspect_evaluation.response_speed" :max="5" />
              </el-form-item>
            </el-col>
          </el-row>
          
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="服务质量" prop="aspect_evaluation.quality" required>
                <el-rate v-model="formData.aspect_evaluation.quality" :max="5" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="使用体验" prop="aspect_evaluation.user_experience" required>
                <el-rate v-model="formData.aspect_evaluation.user_experience" :max="5" />
              </el-form-item>
            </el-col>
          </el-row>
          
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="性价比" prop="aspect_evaluation.cost_performance" required>
                <el-rate v-model="formData.aspect_evaluation.cost_performance" :max="5" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>

        <!-- 开放式问题 -->
        <el-card class="section-card" shadow="never">
          <template #header>
            <h3>开放式问题</h3>
          </template>
          
          <el-form-item label="喜欢哪一点">
            <el-input
              v-model="formData.open_ended.favorite_part"
              type="textarea"
              :rows="3"
              placeholder="请告诉我们您最喜欢的地方"
            />
          </el-form-item>
          
          <el-form-item label="需要改进的地方">
            <el-input
              v-model="formData.open_ended.needs_improvement"
              type="textarea"
              :rows="3"
              placeholder="请告诉我们需要改进的地方"
            />
          </el-form-item>
          
          <el-form-item label="不满意的地方">
            <el-input
              v-model="formData.open_ended.dissatisfied_details"
              type="textarea"
              :rows="3"
              placeholder="请详细描述您不满意的地方"
            />
          </el-form-item>
          
          <el-form-item label="其他建议">
            <el-input
              v-model="formData.open_ended.other_suggestions"
              type="textarea"
              :rows="3"
              placeholder="请提供其他建议或意见"
            />
          </el-form-item>
        </el-card>

        <!-- 联系方式 -->
        <el-card class="section-card" shadow="never">
          <template #header>
            <h3>联系方式</h3>
          </template>
          
          <el-form-item label="接受通知联系方式" prop="contact_for_updates" required>
            <el-input
              v-model="formData.contact_for_updates"
              placeholder="请输入您希望接收通知的联系方式"
            />
          </el-form-item>
        </el-card>

        <!-- 提交按钮 -->
        <el-form-item class="submit-section">
          <el-button type="primary" size="large" @click="submitForm" :loading="submitting">
            提交问卷
          </el-button>
          <el-button size="large" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { surveyApi, type SurveySubmissionData } from '@/api/survey'

const formRef = ref<FormInstance>()
const submitting = ref(false)

// 表单数据
const formData = reactive<SurveySubmissionData>({
  basic_info: {
    name: '',
    contact: '',
    career: ''
  },
  overall_satisfaction: {
    satisfaction: '',
    recommendation: ''
  },
  aspect_evaluation: {
    service_attitude: 0,
    response_speed: 0,
    quality: 0,
    user_experience: 0,
    cost_performance: 0
  },
  open_ended: {
    favorite_part: '',
    needs_improvement: '',
    dissatisfied_details: '',
    other_suggestions: ''
  },
  contact_for_updates: ''
})

// 表单验证规则
const rules: FormRules = {
  'overall_satisfaction.satisfaction': [
    { required: true, message: '请选择服务满意度', trigger: 'change' }
  ],
  'overall_satisfaction.recommendation': [
    { required: true, message: '请选择是否愿意推荐', trigger: 'change' }
  ],
  'aspect_evaluation.service_attitude': [
    { required: true, message: '请评价服务态度', trigger: 'change' }
  ],
  'aspect_evaluation.response_speed': [
    { required: true, message: '请评价响应速度', trigger: 'change' }
  ],
  'aspect_evaluation.quality': [
    { required: true, message: '请评价服务质量', trigger: 'change' }
  ],
  'aspect_evaluation.user_experience': [
    { required: true, message: '请评价使用体验', trigger: 'change' }
  ],
  'aspect_evaluation.cost_performance': [
    { required: true, message: '请评价性价比', trigger: 'change' }
  ],
  contact_for_updates: [
    { required: true, message: '请输入联系方式', trigger: 'blur' }
  ]
}

// 提交表单
const submitForm = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    submitting.value = true
    
    const response = await surveyApi.createSurvey(formData)
    
    ElMessage.success(response.message || '问卷提交成功！感谢您的参与')
    
    // 重置表单
    resetForm()
  } catch (error) {
    console.error('提交失败:', error)
  } finally {
    submitting.value = false
  }
}

// 重置表单
const resetForm = () => {
  if (!formRef.value) return
  
  formRef.value.resetFields()
  Object.assign(formData, {
    basic_info: {
      name: '',
      contact: '',
      career: ''
    },
    overall_satisfaction: {
      satisfaction: '',
      recommendation: ''
    },
    aspect_evaluation: {
      service_attitude: 0,
      response_speed: 0,
      quality: 0,
      user_experience: 0,
      cost_performance: 0
    },
    open_ended: {
      favorite_part: '',
      needs_improvement: '',
      dissatisfied_details: '',
      other_suggestions: ''
    },
    contact_for_updates: ''
  })
}
</script>

<style scoped>
.create-survey {
  max-width: 1000px;
  margin: 0 auto;
}

.survey-card {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.card-header {
  text-align: center;
}

.card-header h2 {
  margin: 0 0 10px 0;
  color: #303133;
}

.card-header p {
  margin: 0;
  color: #909399;
  font-size: 14px;
}

.survey-form {
  padding: 20px 0;
}

.section-card {
  margin-bottom: 20px;
  border: 1px solid #e4e7ed;
}

.section-card :deep(.el-card__header) {
  background-color: #f8f9fa;
  border-bottom: 1px solid #e4e7ed;
}

.section-card h3 {
  margin: 0;
  color: #303133;
  font-size: 16px;
}

.submit-section {
  text-align: center;
  margin-top: 30px;
}

.submit-section .el-button {
  margin: 0 10px;
  min-width: 120px;
}
</style>
