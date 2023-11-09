const objectRenameKey = (object: any, oldKey: string, newKey: string) => {
  if (oldKey !== newKey) {
    Object.defineProperty(object, newKey, Object.getOwnPropertyDescriptor(object, oldKey))
    delete object[oldKey]
  }
}

export default objectRenameKey
