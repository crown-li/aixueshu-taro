import { getKeywordsGroup } from "@/api/index"

export async function getRecommendedKeywords(categories) {
  const recommendedGroups = [];
  const addedGroupIds = new Set();

  const keywordGroups = await getKeywordsGroup()

  categories.forEach(category => {
    const groups = keywordGroups[category.id];
    if (groups) {
      groups.forEach(group => {
        if (!addedGroupIds.has(group.id)) {
          recommendedGroups.push(group);
          addedGroupIds.add(group.id);
        }
      });
    }
  });

  return recommendedGroups;
}