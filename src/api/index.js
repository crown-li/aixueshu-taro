import { get } from '@/utils/http'


export const getAcademicFields = async () => await get("/academic-fields.json");

export const getMockArticles = async () => await get("/mock-articles.json"); 

export const getMockHistorys = async () => await get("/mock-history.json"); 

export const getMockPeriods = async () => await get("/mock-periods.json");

export const getKeywordsGroup = async () => await get("/recommended-keywords.json"); 

export const getResearchDirections = async () => await get("/research-directions.json"); 


