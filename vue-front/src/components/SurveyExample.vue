import { surveyApi, submissionApi } from '@/api/survey'

// 在组件中使用
export default {
    data() {
        return {
            surveys: [],
            loading: false
        }
    },
    methods: {
        async fetchSurveys() {
            try {
                this.loading = true
                const data = await surveyApi.getList()
                this.surveys = data.items
            } catch (error) {
                console.error('Failed to fetch surveys:', error)
                // 可以添加错误提示
            } finally {
                this.loading = false
            }
        },

        async submitSurvey(surveyData) {
            try {
                this.loading = true
                await submissionApi.submit(surveyData)
                // 可以添加成功提示
            } catch (error) {
                console.error('Failed to submit survey:', error)
                // 可以添加错误提示
            } finally {
                this.loading = false
            }
        }
    }
}
