/**
 * @description：查询匹配类型
 */
export enum RqueryTypeEnum {
    EQ = "eq", // 完全匹配类型
    NE = "ne", // 不匹配类型
    LIKE = "like", // 模糊匹配类型
    GE = "ge", // 大于等于类型
    GT = "gt", // 大于类型
    LE = "le", // 小于等于类型
    LT = "lt", // 小于类型
    LEFT_LIKE = "leftLike", // 模糊最左匹配[%val] 类型
    RIGHT_LIKE = "rightLike", // 模糊最右匹配[val%] 类型
    IN = "in", // 包含
    NOTIN = "notIn" // 不包含
  }