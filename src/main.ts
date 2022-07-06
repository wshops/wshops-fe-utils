import './message.less'
import Message from './Message'

const msg = new Message({
  closable: true
})
document.getElementById('msg-test')!.addEventListener('click', () => {
  msg.success('成功！！！').then(async () => {
    await new Promise(r => setTimeout(r, 500))
    msg.info('hi').then(async () => {
      await new Promise(r => setTimeout(r, 500))
      msg.warn('fuck').then(async () => {
        await new Promise(r => setTimeout(r, 500))
        msg.error('omg!').then(async () => {
          await new Promise(r => setTimeout(r, 500))
          const loading = msg.loading()
          setTimeout(loading, 3000)
        })
      })
    })
  })
})

