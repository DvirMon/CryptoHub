
export function deleteFile(key: string, obj: { [key: string]: any }): { [key: string]: any } {
  const tempObj = {...obj}
  delete tempObj[key]
  return tempObj

}
