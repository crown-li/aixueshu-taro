import { get, post } from '@/utils/http'

export const login = async (code) => await post("/login", { code });

// export const getAcademicFields = async () => await get("/academic-fields.json");
export const getAcademicFields = async () => await get("/subjects");

export const getArticles = async () => await get("/mock-articles.json");

export const getArticleDetail = async (id) => await get("/mock-article-detail.json", { id });

export const getArticlesRecommend = async (id) => await get("/mock-articles-recommend.json"); 

export const getMockHistorys = async () => await get("/mock-history.json"); 

export const getMockPeriods = async () => await get("/mock-periods.json");

export const getKeywordsGroup = async () => await get("/recommended-keywords.json"); 

// export const getResearchDirections = async () => await get("/research-directions.json"); 
export const getResearchDirections = async (subjectId) => await get(`/subjects/${subjectId}/tags`); 



