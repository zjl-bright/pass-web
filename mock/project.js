
const data = [
  { id: '1', name: '测试项目1', des: '项目描述1' },
  { id: '2', name: '测试项目2', des: '项目描述2' },
  { id: '3', name: '测试项目3', des: '项目描述3' }
]

export default [
  {
    url: '/project/list',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data
      }
    }
  }
]