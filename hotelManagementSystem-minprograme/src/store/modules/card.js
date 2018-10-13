
const state = {
  tab: 0,
  navList: [{
    text: '酒店'
  }, {
    text: '我的'
  }]
}

const mutations = {
  increame (state) {
    state.count += 1
  },
  decream (state) {
    state.count -= 1
  }
}
/* const actions = {
  async getBoards ({state, commit}) {
    const tasks = state.boards.map(board => {
      return getBoardData({ board: board.key, page: 1, count: 8 })
    })
    let boards = await Promise.all(tasks)
    commit(BOARD_MOVIE_LIST, { boards })
  }
} */
export default {
  state,
  mutations
}
