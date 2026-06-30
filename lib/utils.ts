/**
 * 合并可选的语义类名，并忽略空值。
 */
export function merge_class_names(...class_names: Array<string | false | null | undefined>): string {
  return class_names.filter(Boolean).join(" ");
}
