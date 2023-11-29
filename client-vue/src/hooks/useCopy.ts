import { ElMessage } from 'element-plus'

const useCopy = (text: string) => {
  try {
    navigator.clipboard.writeText(text).then(() => ElMessage.success('复制成功'))
  } catch (error) {
    const input = document.createElement('input')
    input.value = text
    document.body.appendChild(input)
    input.select()
    document.execCommand('Copy')
    document.body.removeChild(input)
    ElMessage.success('复制成功')
  }
}

export default useCopy
