<template>
  <div class="delete-survey">
    <el-card>
      <template #header>
        <div class="card-header">
          <h2>删除问卷</h2>
          <div class="header-actions">
            <el-input
              v-model="surveyId"
              placeholder="请输入要删除的问卷ID"
              style="width: 200px; margin-right: 10px;"
              @keyup.enter="confirmDelete"
            />
            <el-button type="danger" @click="confirmDelete" :loading="deleting">
              <el-icon><Delete /></el-icon>
              删除
            </el-button>
          </div>
        </div>
      </template>
      
      <div class="delete-content">
        <el-alert
          title="删除警告"
          type="warning"
          description="删除操作不可恢复，请确认您要删除的问卷ID是否正确。"
          show-icon
          :closable="false"
          style="margin-bottom: 20px;"
        />
        
        <div class="delete-form">
          <el-form :model="deleteForm" label-width="120px">
            <el-form-item label="问卷ID">
              <el-input
                v-model="deleteForm.id"
                placeholder="请输入问卷ID"
                style="width: 300px;"
              />
            </el-form-item>
            
            <el-form-item label="确认删除">
              <el-checkbox v-model="deleteForm.confirmed">
                我确认要删除此问卷，此操作不可恢复
              </el-checkbox>
            </el-form-item>
            
            <el-form-item>
              <el-button 
                type="danger" 
                @click="handleDelete" 
                :disabled="!deleteForm.confirmed || !deleteForm.id"
                :loading="deleting"
              >
                <el-icon><Delete /></el-icon>
                确认删除
              </el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        
        <div v-if="deleteResult" class="delete-result">
          <el-alert
            :title="deleteResult.message"
            :type="deleteResult.success ? 'success' : 'error'"
            show-icon
            :closable="false"
          />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
import { surveyApi } from '@/api/survey'

const surveyId = ref('')
const deleting = ref(false)
const deleteResult = ref<{ success: boolean; message: string } | null>(null)

const deleteForm = reactive({
  id: '',
  confirmed: false
})

// 确认删除
const confirmDelete = () => {
  if (!surveyId.value.trim()) {
    ElMessage.warning('请输入问卷ID')
    return
  }
  
  deleteForm.id = surveyId.value
  deleteForm.confirmed = false
}

// 处理删除
const handleDelete = async () => {
  if (!deleteForm.id || !deleteForm.confirmed) {
    ElMessage.warning('请填写问卷ID并确认删除')
    return
  }
  
  try {
    await ElMessageBox.confirm(
      `确定要删除问卷ID为 ${deleteForm.id} 的问卷吗？此操作不可恢复！`,
      '删除确认',
      {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'warning',
        confirmButtonClass: 'el-button--danger'
      }
    )
    
    deleting.value = true
    deleteResult.value = null
    
    const response = await surveyApi.deleteSurvey(parseInt(deleteForm.id))
    
    deleteResult.value = {
      success: true,
      message: response.message || '删除成功'
    }
    
    ElMessage.success('问卷删除成功')
    resetForm()
    
  } catch (error: any) {
    if (error === 'cancel') {
      return
    }
    
    deleteResult.value = {
      success: false,
      message: error.message || '删除失败'
    }
    
    ElMessage.error('删除失败')
  } finally {
    deleting.value = false
  }
}

// 重置表单
const resetForm = () => {
  deleteForm.id = ''
  deleteForm.confirmed = false
  surveyId.value = ''
  deleteResult.value = null
}
</script>

<style scoped>
.delete-survey {
  max-width: 800px;
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

.delete-content {
  padding: 20px 0;
}

.delete-form {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 6px;
  border: 1px solid #e4e7ed;
}

.delete-result {
  margin-top: 20px;
}
</style>
