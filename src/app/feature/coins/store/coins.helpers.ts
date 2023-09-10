
export function deleteFiled(key: string, obj: Record<string, boolean>): Record<string, boolean> {
  const tempObj = {...obj}
  delete tempObj[key]
  return tempObj

}
