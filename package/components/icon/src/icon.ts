// 用于声明组件类型

import { ExtractPropTypes, PropType } from "vue";

export const iconProps = {
	color: String,
	size: [Number, String] as PropType<string | number>,
} as const

export type IconProps = ExtractPropTypes<typeof iconProps>;
