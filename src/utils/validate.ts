export const validate = {
  tictocEmail: (text: string) => /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])+@tictoccroc.com$/.test(text),
  password: (text: string) => {
    const passwordRules = [/[a-zA-Z]/, /[0-9]/, /[^A-Za-z0-9]/]
    if (text.length < 8) return false
    const counter = passwordRules.reduce((acc, current) => {
      if (current.test(text)) {
        acc += 1
      }
      return acc
    }, 0)
    return counter > 1
  },
  koreanName: (text: string) => /^[ㄱ-ㅎ|가-힣]+$/.test(text),
  phoneNumber: (text: string) => /^[0-9]{11}$/.test(text),
  link: (text: string) => /^(http|https):\/\/[^ "]+$/.test(text),
}
