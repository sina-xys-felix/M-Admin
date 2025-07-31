import { AnyObject } from "@/common/types/global";

export interface TagProps {
  title: string;
  name: string;
  path: string;
  fullPath: string;
  query?: AnyObject;
  ignoreCache?: boolean;
  noAffix?:boolean
}

export interface TabBarState {
  tagList: TagProps[];
  cacheTabList: Set<string>;
}
