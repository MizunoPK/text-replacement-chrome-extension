

export interface LocalStorage {
  replacements?: TextReplacement[]
  options?: LocalStorageOptions
}

export interface TextReplacement {
    from: string,
    to: string,
    active: boolean
}

export interface LocalStorageOptions {
  enabled: boolean
}

export type LocalStorageKeys = keyof LocalStorage

export function setStoredReplacements(replacements: TextReplacement[]): Promise<void> {
  const vals: LocalStorage = {
    replacements,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve()
    })
  })
}

export function getStoredReplacements(): Promise<TextReplacement[]> {
  const keys: LocalStorageKeys[] = ['replacements']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.replacements ?? [])
    })
  })
}

export function setStoredOptions(options: LocalStorageOptions): Promise<void> {
  const vals: LocalStorage = {
    options,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve()
    })
  })
}

export function getStoredOptions(): Promise<LocalStorageOptions> {
  const keys: LocalStorageKeys[] = ['options']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.options)
    })
  })
}
