import request from './request'

// 问卷提交数据类型
export interface SurveySubmissionData {
  basic_info?: {
    name?: string
    contact?: string
    career?: string
  }
  overall_satisfaction: {
    satisfaction: string
    recommendation: string
  }
  aspect_evaluation: {
    service_attitude: number
    response_speed: number
    quality: number
    user_experience: number
    cost_performance: number
  }
  open_ended?: {
    favorite_part?: string
    needs_improvement?: string
    dissatisfied_details?: string
    other_suggestions?: string
  }
  contact_for_updates: string
}

// 问卷列表项类型
export interface SurveyListItem {
  id: number
  created_at: string
  basic_info: {
    name: string
    contact: string
    career: string
  }
  overall_satisfaction: {
    satisfaction: string
    recommendation: string
  }
  aspect_evaluation: {
    service_attitude: number
    response_speed: number
    quality: number
    user_experience: number
    cost_performance: number
  }
  open_ended: {
    favorite_part: string
    needs_improvement: string
    dissatisfied_details: string
    other_suggestions: string
  }
  contact_for_updates: string
}

// 问卷API
export const surveyApi = {
  // 创建问卷
  createSurvey: (data: SurveySubmissionData) => {
    return request.post('/survey', data)
  },
  
  // 查询所有问卷
  getAllSurveys: () => {
    return request.get<SurveyListItem[]>('/surveys')
  },
  
  // 查询单个问卷
  getSurveyById: (id: number) => {
    return request.get<SurveyListItem>(`/survey/${id}`)
  },
  
  // 删除问卷
  deleteSurvey: (id: number) => {
    return request.delete(`/survey/${id}`)
  }
}
