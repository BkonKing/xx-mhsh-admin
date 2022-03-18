const getters = {
  isMobile: state => state.app.isMobile,
  lang: state => state.app.lang,
  theme: state => state.app.theme,
  color: state => state.app.color,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.name,
  welcome: state => state.user.welcome,
  roles: state => state.user.roles,
  userInfo: state => state.user.info,
  multiTab: state => state.app.multiTab,
  projectId: state => state.user.projectId,
  isParentProject: state => !+state.user.projectId,
  userUrl: state => !+state.user.projectId ? '/zht/user/user/getUserList'
    : '/xmht/household/member/getMemberList'
}

export default getters
