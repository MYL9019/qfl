// 问卷类型定义
export interface Survey {
  id: string
  title: string
  description: string
  status: 'draft' | 'published' | 'closed'
  createdAt: string
  updatedAt: string
  questions: Question[]
  settings: SurveySettings
}

export interface Question {
  id: string
  type: 'single' | 'multiple' | 'text' | 'rating' | 'date'
  title: string
  description?: string
  required: boolean
  options?: QuestionOption[]
  validation?: QuestionValidation
}

export interface QuestionOption {
  id: string
  label: string
  value: string
}

export interface QuestionValidation {
  minLength?: number
  maxLength?: number
  pattern?: string
  min?: number
  max?: number
}

export interface SurveySettings {
  allowAnonymous: boolean
  showProgress: boolean
  allowBack: boolean
  timeLimit?: number
  maxResponses?: number
}

export interface SurveyResponse {
  id: string
  surveyId: string
  answers: Answer[]
  submittedAt: string
  userId?: string
  sessionId: string
}

export interface Answer {
  questionId: string
  value: string | string[] | number
  text?: string
}

export interface SurveyStats {
  totalResponses: number
  completionRate: number
  averageTime: number
  questionStats: QuestionStats[]
}

export interface QuestionStats {
  questionId: string
  responseCount: number
  options?: OptionStats[]
}

export interface OptionStats {
  optionId: string
  count: number
  percentage: number
}
