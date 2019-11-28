
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

const result = {
  "code": 200,
  "message": "成功",
  "result": [
      {
          "_id": "5ddf774304e8e620b61fe77b",
          "name": "mqm-web",
          "gitPath": "ssh://git@git.hshbao.com:2222/SAAS/MaterialQuality/mqm-web.git",
          "cmd": "npm run start",
          "envs": [],
          "modules": [],
          "projectId": "5ddde95c4b51d50933822b47"
      },
      {
          "_id": "5ddf7905ba5eaa54975d97c8",
          "name": "mqm-admin",
          "gitPath": "ssh://git@git.hshbao.com:2222/SAAS/MaterialQuality/mqm-admin.git",
          "cmd": "npm run start",
          "envs": [],
          "modules": [],
          "projectId": "5ddde95c4b51d50933822b47"
      },
      {
          "_id": "5ddf7938c8320f388e7e7489",
          "name": "mqm-admin",
          "gitPath": "ssh://git@git.hshbao.com:2222/SAAS/MaterialQuality/mqm-admin.git",
          "cmd": "npm run start",
          "envs": [],
          "modules": [],
          "projectId": "5ddde95c4b51d50933822b47"
      }
  ],
  "success": true
}

export default [
  {
    url: '/module/list',
    type: 'get',
    response: config => {
      return data
    }
  }
]