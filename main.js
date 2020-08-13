import axios from 'axios';
import './index.css';

axios.get('/mock/data.json').then(res => {
  console.log('>>>', res);
})

document.getElementById('sendMsg').onclick = () => {
  axios.get('/mock/data2.json').then(res => {
    console.log('>>>', res);
  })
}

if ('serviceWorker' in navigator) {
  const name = 'test';
  window.addEventListener('load', function () {
    console.log('页面已经加载完了')
    navigator.serviceWorker.register('/service-worker.js', { scope: '/' })
      .then(function (registration) {
        // 注册成功
        console.log('ServiceWorker registration successful with scope: ', registration.scope)
      })
      .catch(function (err) {
        // 注册失败:(
        console.log('ServiceWorker registration failed: ', err)
      })
  })
}