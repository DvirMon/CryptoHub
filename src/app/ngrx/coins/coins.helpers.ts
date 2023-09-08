
export function deleteFiled(key: string, obj: { [key: string]: boolean }): { [key: string]: boolean } {
  const tempObj = {...obj}
  delete tempObj[key]
  return tempObj

}
