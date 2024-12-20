import { get, post, del } from '@/utils/http'

export const login = async (code) => await post("/login", { code });

// 获取所有学科列表
export const getAcademicFields = async () => await get("/subjects");


// 获取推送记录列表
export const getArticleDetailInfo = async () => await get(`/users/push-records`); 

// 获取推送记录详情
export const getArticleDetail = async (recordId) => await get(`/users/push-records/${recordId}`); 

// 点赞
export const likesToggle = async (subjectInterpretationId) => await post(`/user-likes/toggle`,{subjectInterpretationId}); 


// 获取收藏详情
export const getFavoritesDetail = async (id) => await get(`/subject-interpretation/${id}`); 

// 更新阅读状态
export const updateArticleDetailReadProgress = async (params) => await post(`/user/reading-history`, params); 

// 获取阅读历史列表
export const getArticleDetailReadHistoryList = async (params) => await post(`/user/reading-history/list`,params); 


// export const getPeriods = async () => await get("/mock-periods.json");

// export const getKeywordsGroup = async () => await get("/recommended-keywords.json"); 

// 获取学科下的标签列表
export const getResearchDirections = async (subjectId) => await get(`/subjects/${subjectId}/tags`); 

// 更新用户订阅
export const saveSubscriptions = async (data) => await post(`/users/subscriptions`, data); 

// 获取用户订阅列表
export const getUserSubscriptions = async () => await get(`/users/subscriptions`); 

// 添加收藏
export const addFavorites = async (data) => await post(`/users/favorites/add`, data); 

// 取消收藏
export const deleteFavorites = async (favoriteId) => await del(`/users/favorites/delete/${favoriteId}`); 

// 获取收藏列表
export const getFavorites = async (data) => await post(`/users/favorites/pageList`, data); 

// 获取用户设置
export const getUserSettings = async () => await get(`/users/settings`); 

// 更新推送设置
export const updateUserPushSettings = async (data) => await post(`/users/settings/push`, data); 








