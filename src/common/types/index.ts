/** 尺寸  */
type SizeProps = 'mini' | 'small' | 'medium' | 'large'
/** 状态  */
type StatusProps = 'normal' | 'success' | 'warning' | 'danger'
/** 位置  */
type PlacementProps = 'top' | 'right' | 'left' | 'bottom'
/** 尺寸  */
type StatusNumProps = 0 | 1
/** flex 配置选项  */
type AlignProps = 'start' | 'center' | 'end' | 'space-between' | 'space-around'
/** space size  */
type SpaceSize = number | 'mini' | 'small' | 'medium' | 'large'
type SpaceSizeProps = number | 'mini' | 'small' | 'medium' | 'large' | [SpaceSize, SpaceSize]

export type { SizeProps, StatusProps, PlacementProps, StatusNumProps, SpaceSizeProps, AlignProps }
