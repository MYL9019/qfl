&lt;template>
  <div class="survey-management">
    <!-- 创建问卷表单 -->
    <div class="create-survey" v-if="showCreateForm">
      <h2>创建新问卷</h2>
      <form @submit.prevent="createSurvey">
        <div class="form-group">
          <label>标题：</label>
          <input v-model="newSurvey.title" required />
        </div>
        <div class="form-group">
          <label>描述：</label>
          <textarea v-model="newSurvey.description"></textarea>
        </div>
        <!-- 问题列表 -->
        <div class="questions">
          <div v-for="(q, index) in newSurvey.questions" :key="index" class="question">
            <input v-model="q.questionText" placeholder="问题内容" required />
            <select v-model="q.type">
              <option value="single">单选题</option>
              <option value="multiple">多选题</option>
              <option value="text">填空题</option>
            </select>
            <label>
              <input type="checkbox" v-model="q.required" /> 必答
            </label>
            <!-- 选项（针对单选和多选） -->
            <div v-if="q.type !== 'text'" class="options">
              <div v-for="(opt, optIndex) in q.options" :key="optIndex">
                <input v-model="q.options[optIndex]" placeholder="选项内容" />
                <button type="button" @click="removeOption(index, optIndex)">删除选项</button>
              </div>
              <button type="button" @click="addOption(index)">添加选项</button>
            </div>
            <button type="button" @click="removeQuestion(index)">删除问题</button>
          </div>
        </div>
        <button type="button" @click="addQuestion">添加问题</button>
        <button type="submit">保存问卷</button>
      </form>
    </div>

    <!-- 问卷列表 -->
    <div class="survey-list">
      <h2>问卷列表</h2>
      <button @click="toggleCreateForm">{{ showCreateForm ? '隐藏创建表单' : '创建新问卷' }}</button>
      <div v-if="loading">加载中...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else class="surveys">
        <div v-for="survey in surveys" :key="survey.id" class="survey-item">
          <h3>{{ survey.title }}</h3>
          <p>{{ survey.description }}</p>
          <div class="actions">
            <button @click="viewSurvey(survey.id)">查看</button>
            <button @click="deleteSurvey(survey.id)">删除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
&lt;/template>

&lt;script>
import { surveyApi } from '@/api/survey'

export default {
  name: 'SurveyManagement',
  data() {
    return {
      surveys: [],
      loading: false,
      error: null,
      showCreateForm: false,
      newSurvey: {
        title: '',
        description: '',
        questions: []
      }
    }
  },
  created() {
    this.fetchSurveys()
  },
  methods: {
    // 获取所有问卷
    async fetchSurveys() {
      try {
        this.loading = true
        this.surveys = await surveyApi.getAll()
      } catch (error) {
        this.error = '获取问卷列表失败：' + error.message
      } finally {
        this.loading = false
      }
    },

    // 创建问卷
    async createSurvey() {
      try {
        this.loading = true
        await surveyApi.create(this.newSurvey)
        this.showCreateForm = false
        this.resetNewSurvey()
        await this.fetchSurveys()
      } catch (error) {
        this.error = '创建问卷失败：' + error.message
      } finally {
        this.loading = false
      }
    },

    // 查看问卷详情
    async viewSurvey(id) {
      try {
        const survey = await surveyApi.getById(id)
        console.log('问卷详情：', survey)
        // 这里可以跳转到详情页或显示详情弹窗
      } catch (error) {
        this.error = '获取问卷详情失败：' + error.message
      }
    },

    // 删除问卷
    async deleteSurvey(id) {
      if (!confirm('确定要删除这份问卷吗？')) return
      
      try {
        await surveyApi.delete(id)
        await this.fetchSurveys()
      } catch (error) {
        this.error = '删除问卷失败：' + error.message
      }
    },

    // 表单操作方法
    toggleCreateForm() {
      this.showCreateForm = !this.showCreateForm
      if (!this.showCreateForm) {
        this.resetNewSurvey()
      }
    },

    resetNewSurvey() {
      this.newSurvey = {
        title: '',
        description: '',
        questions: []
      }
    },

    addQuestion() {
      this.newSurvey.questions.push({
        questionText: '',
        type: 'single',
        required: false,
        options: ['']
      })
    },

    removeQuestion(index) {
      this.newSurvey.questions.splice(index, 1)
    },

    addOption(questionIndex) {
      this.newSurvey.questions[questionIndex].options.push('')
    },

    removeOption(questionIndex, optionIndex) {
      this.newSurvey.questions[questionIndex].options.splice(optionIndex, 1)
    }
  }
}
&lt;/script>

&lt;style scoped>
.survey-management {
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

input, textarea, select {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
}

.question {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 15px;
}

.options {
  margin-left: 20px;
}

button {
  margin: 5px;
  padding: 8px 15px;
  cursor: pointer;
}

.survey-item {
  border: 1px solid #eee;
  padding: 15px;
  margin-bottom: 10px;
}

.actions {
  margin-top: 10px;
}

.error {
  color: red;
  margin: 10px 0;
}
&lt;/style>
