
const data = {
  "id": "1",
  "projectId": "1",
  "branch": "master",
  "backendModule": [
      {
          "name": "hsh-user",
          "path": "/hsh-user",
          "available": true
      },
      {
          "name": "hsh-material",
          "path": "/hsh-material",
          "available": true
      },
      {
          "name": "hsh-cce",
          "path": "/hsh-cce",
          "available": true
      },
      {
          "name": "hsh-bids",
          "path": "/hsh-bids",
          "available": true
      },
      {
          "name": "hsh-web",
          "path": "/hsh-web",
          "available": false
      },
      {
          "name": "hsh-admin",
          "path": "/hsh-admin",
          "available": true
      }
  ],
  "frontendModule": [
      {
          "name": "herd-hsh-web",
          "path": "",
          "available": true
      },
      {
          "name": "herd-hsh-admin",
          "path": "",
          "available": true
      }
  ]
}

export default [
  {
    url: '/module/list',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data
      }
    }
  }
]