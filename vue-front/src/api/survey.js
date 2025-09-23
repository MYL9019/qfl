import request from './request'

// 定义接口
export const surveyApi = {
  // 提交问卷
  submitSurvey(formData) {
    const data = {
      Survey: {
        BasicInfo: {
          Name: formData.name || '',
          Contact: formData.contact || '',
          Career: formData.occupation || ''
        },
        OverallSatisfaction: {
          Satisfaction: formData.satisfaction || '满意',
          Recommendation: formData.recommendation || '愿意'
        },
        AspectEvaluation: {
          ServiceAttitude: parseInt(formData.ratings?.service_attitude || 5),
          ResponseSpeed: parseInt(formData.ratings?.response_speed || 5),
          Quality: parseInt(formData.ratings?.quality || 5),
          UserExperience: parseInt(formData.ratings?.user_experience || 5),
          CostPerformance: parseInt(formData.ratings?.cost_performance || 5)
        },
        OpenEnded: {
          FavoritePart: formData.likes || '',
          NeedsImprovement: formData.improvements || '',
          DissatisfiedDetails: formData.complaints || '',
          OtherSuggestions: formData.suggestions || ''
        },
        ContactForUpdates: formData.contact || ''
      }
    }

    return request({
      url: '/survey',  // 使用后端实际的路径
      method: 'post',
      data
    })
  }
}
