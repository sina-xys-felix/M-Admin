import { AnyObject } from "@/common/types/global";

export interface TagProps {
  title: string;
  name: string;
  fullPath: string;
  query?: AnyObject;
  ignoreCache?: boolean;
}

export interface TabBarState {
  tagList: TagProps[];
  cacheTabList: Set<string>;
}
