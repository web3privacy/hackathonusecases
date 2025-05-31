declare module '*.jpg' {
  const content: {
    src: string
    height: number
    width: number
    placeholder?: string
  }
  export default content
}

declare module '*.jpeg' {
  const content: {
    src: string
    height: number
    width: number
    placeholder?: string
  }
  export default content
}

declare module '*.png' {
  const content: {
    src: string
    height: number
    width: number
    placeholder?: string
  }
  export default content
}

declare module '*.svg' {
  const content: {
    src: string
    height: number
    width: number
  }
  export default content
}
